import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import chef from '../../assets/img/chef.png'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import { timeStamp } from 'console'
import intl from 'react-intl-universal'

const Home: React.FC = () => {
  // 是否有KBAR-ETH池子
  const haveKBARETH = false
  const tip = () => {
    if (!!haveKBARETH) {
      return (<StyledInfo>
        🏆<b>Pro Tip</b>: KBAR-ETH UNI-V2 LP token pool yields TWICE more token rewards per block.
      </StyledInfo>)
    } else {
      return null
    }
  }
  return (
    <Page>
      <PageHeader
        icon={<img src={chef} height={120} />}
        title={intl.get("title")}
        subtitle={intl.get("subtitle")}
      />

      <Container>
        <Balances />
      </Container>
      <Spacer size="lg" />
      {tip()}
      <Spacer size="lg" />
      <ButtonWrap>
        <Button
          text="🪑 See the Menu" to="/farms" variant="secondary" />

      </ButtonWrap>
    </Page>
  )
}

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;

  > b {
    color: ${(props) => props.theme.color.grey[600]};
  }
`

const ButtonWrap = styled.div`
  margin: 0 auto;
  button{
    box-shadow: none;
  }
`

export default Home
