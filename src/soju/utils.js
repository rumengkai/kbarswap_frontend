import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const GAS_LIMIT = {
  STAKING: {
    DEFAULT: 200000,
    SNX: 850000,
  },
}

export const getSommelierAddress = (soju) => {
  return soju && soju.SommelierAddress
}
export const getSojuAddress = (soju) => {
  return soju && soju.sojuAddress
}
export const getWethContract = (soju) => {
  return soju && soju.contracts && soju.contracts.weth
}

export const getSommelierContract = (soju) => {
  return soju && soju.contracts && soju.contracts.Sommelier
}
export const getSojuContract = (soju) => {
  return soju && soju.contracts && soju.contracts.soju
}

export const getFarms = (soju) => {
  return soju
    ? soju.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'soju',
          earnTokenAddress: soju.contracts.soju.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (SommelierContract, pid) => {
  const { allocPoint } = await SommelierContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await SommelierContract.methods
    .totalAllocPoint()
    .call()
  console.log('totalAllocPoint', totalAllocPoint)
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (SommelierContract, pid, account) => {
  return SommelierContract.methods.pendingSoju(pid, account).call()
}

export const getTotalLPWethValue = async (
  SommelierContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()

  const tokenDecimals = await tokenContract.methods.decimals().call()

  // Get the share of lpContract that SommelierContract owns
  const balance = await lpContract.methods
    .balanceOf(SommelierContract.options.address)
    .call()
  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  // console.log('totalSupply',totalSupply);
  
  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()

  
  // console.log('SommelierContract',SommelierContract.options.address);
  // console.log('balance',balance);
  
  // console.log('lpContractWeth',lpContract.options.address);
  // console.log('lpContractWethV',lpContractWeth);
  
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))

  // console.log('lpContractWeth',lpContractWeth);
  // console.log('portionLp',portionLp);
  // console.log('wethAmount',wethAmount);
  // console.log('tokenAmount',tokenAmount);
  // console.log('tokenPriceInWeth',wethAmount.div(tokenAmount));
  
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(SommelierContract, pid),
  }
}

export const approve = async (lpContract, SommelierContract, account) => {
  return lpContract.methods
    .approve(SommelierContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSojuSupply = async (soju) => {
  return new BigNumber(await soju.contracts.soju.methods.totalSupply().call())
}

export const stake = async (SommelierContract, pid, amount, account) => {
  return SommelierContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (SommelierContract, pid, amount, account) => {
  return SommelierContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (SommelierContract, pid, account) => {
  return SommelierContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const getStaked = async (SommelierContract, pid, account) => {
  try {
    const { amount } = await SommelierContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (SommelierContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return SommelierContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}
