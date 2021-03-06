import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm } from '../../../contexts/Farms'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useSoju from '../../../hooks/useSoju'
import { getEarned, getSommelierContract } from '../../../soju/utils'
import { bnToDec } from '../../../utils'
import beer from '../../../assets/icon/beer.png'
import bottle from '../../../assets/icon/bottle.png'
import cocktail from '../../../assets/icon/cocktail.png'
import sake from '../../../assets/icon/sake.png'
import sojuIcon from '../../../assets/icon/soju.png'
import tropical from '../../../assets/icon/tropical.png'
import tumbler from '../../../assets/icon/tumbler.png'
import wine from '../../../assets/icon/wine.png'
import intl from 'react-intl-universal'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

const FarmCards: React.FC = () => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const sojuIndex = farms.findIndex(({ tokenSymbol }) => tokenSymbol === 'SOJU')

  const sojuPrice =
    sojuIndex >= 0 && stakedValue[sojuIndex]
      ? stakedValue[sojuIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(2336000)
  const SOJU_PER_BLOCK = new BigNumber(0.25)

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      //console.log(1,sojuPrice)
      //console.log(2,SOJU_PER_BLOCK)
      //console.log(3,stakedValue[i].poolWeight)
      //console.log(4,stakedValue)

      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apy: stakedValue[i]
          ? sojuPrice
              .times(SOJU_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null,
      }

      // if (stakedValue[i]) {
      //   console.log('--------');
      //   console.log("sojuPrice",sojuPrice);
      //   console.log(SOJU_PER_BLOCK.times(SOJU_PER_BLOCK));
      //   console.log(BLOCKS_PER_YEAR);
      //   console.log(stakedValue[i].poolWeight);
      //   console.log(stakedValue[i].totalWethValue);
      //   console.log('--------');
      // } else {
      //   console.log(888888)
      // }

      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Cooking the rice ..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  const [startTime, setStartTime] = useState(0)
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const soju = useSoju()
  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (soju) return
      const earned = await getEarned(
        getSommelierContract(soju),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (soju && account) {
      fetchEarned()
    }
  }, [soju, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0

  const iconFun = (icon: any) => {
    switch (icon) {
      case 'beer':
        return beer
      case 'bottle':
        return bottle
      case 'cocktail':
        return cocktail
      case 'sake':
        return sake
      case 'soju':
        return sojuIcon
      case 'tropical':
        return tropical
      case 'tumbler':
        return tumbler
      case 'wine':
        return wine
      default:
        return 'icon'
    }
  }
  const button = (farm: any) => {
    if (farm.tokenSymbol === 'SOJU1111') {
      let link
      if (farm.tokenSymbol === 'SOJU') {
        link = 'https://app.uniswap.org/#/swap?outputCurrency=0x49c4be97529904093bf33895ac03bef587f02219'
      }
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button
            disabled={!poolActive}
            text={poolActive ? intl.get('Select') : undefined}
            to={`/farms/${farm.id}`}
          >
            {!poolActive && (
              <Countdown
                date={new Date(startTime * 1000)}
                renderer={renderer}
              />
            )}
          </Button>
          <span style={{ width: '20px' }}></span>
          <Button
            disabled={!poolActive}
            text={poolActive ? 'Buy' : undefined}
            href={link}
          >
            {!poolActive && (
              <Countdown
                date={new Date(startTime * 1000)}
                renderer={renderer}
              />
            )}
          </Button>
        </div>
      )
    } else {
      return (
        <Button
          disabled={!poolActive}
          text={poolActive ? intl.get('Select') : undefined}
          to={`/farms/${farm.id}`}
        >
          {!poolActive && (
            <Countdown date={new Date(startTime * 1000)} renderer={renderer} />
          )}
        </Button>
      )
    }
  }
  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'SOJU' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <img
                src={iconFun(farm.icon)}
                style={{ width: '40px', height: '40px' }}
              />
            </CardIcon>
            <StyledTitle>
              {intl.get(farm.name) ? intl.get(farm.name) : farm.name}
            </StyledTitle>
            <StyledDetails>
              <StyledDetail>
                {intl.get('Deposit_text', {
                  symbol: farm.lpToken.toUpperCase(),
                })}
              </StyledDetail>
              <StyledDetail>
                {intl.get('Earn', {
                  earnTokenName: farm.earnToken.toUpperCase(),
                })}{' '}
              </StyledDetail>
            </StyledDetails>
            <Spacer />
            {button(farm)}
            <StyledInsight>
              <span>APY</span>
              <span>
                {farm && farm.apy
                  ? `${farm.apy
                      .times(new BigNumber(100))
                      .toNumber()
                      .toLocaleString('en-US')
                      .slice(0, -1)}%`
                  : intl.get('Loading') + ' ...'}
              </span>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
  max-width: 250px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
