import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber('4294967295'), // 2**32-1
  ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
  ONES_255: new BigNumber(
    '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
  uniswapFactory: '0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95',
  uniswapFactoryV2: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  //YFI: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  //YCRV: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
  //UNIAmpl: '0xc5be99a02c6857f9eac67bbce58df5572498f40c',
  WETH: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  UNIRouter: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  //LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  //MKR: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
  //SNX: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
  //COMP: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
  //LEND: '0x80fB784B7eD66730e8b1DBd9820aFD29931aab03',
  //SOJUYCRV: '0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726',
}

// weth:{
//     mainnet:'0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
//     ropsten:'0xc778417E063141139Fce010982780140Aa0cD5Ab',
//     rinkeby:'0xc778417E063141139Fce010982780140Aa0cD5Ab',
//     goerli:'0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
//     kovan:'0xd0A1E359811322d97991E03f863a0C30C2cF029C'
// }

/*
UNI-V2 LP Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SOJU 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const contractAddresses = {
  lpAddresses: {
    1: '0x66d6dcdf72125c2f6a4039567076376ec6e2f324',
    3: '0x6d4775cb9a038943bfcb9ac9e846c515c8839b0f',
  },
  kbar: {
    1: '0x451c2220a761dc5759e5c6d17bd28a568318a26b',
    3: '0x22073a445dde462fd6d2c88606f501aca8a50cb6',
  },
  Sommelier: {
    1: '0xa0fd402bacd5fa935f4acfede486ac32c87d3b9d',
    3: '0xec7555fcf7d6c1f3eab9aa02ae05e5038e4064f8',
  },
  weth: {
    1: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    3: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
  },
}

export const supportedPools = [
  {
    pid: 1,
    lpAddresses: {
      1: contractAddresses.lpAddresses[1],
      3: contractAddresses.lpAddresses[3],
    },
    tokenAddresses: {
      1: contractAddresses.kbar[1],
      3: contractAddresses.kbar[3],
    },
    name: 'SOJUParty',
    symbol: 'SOJU-ETH UNI-V2 LP',
    tokenSymbol: 'SOJU',
    icon: 'bottle',
  },
  {
    pid: 0,
    lpAddresses: {
      1: '0x0a24adf229e7b3271d314aa934749dd454029959',
      3: '0x15c3c4147a862bbb56b46806a94719d72da410dd',
    },
    tokenAddresses: {
      1: '0x8d18f76d1F87A7347A74f957052f414472945BE4',
      3: '0x2d19a1cdb141df4c800b4ffeb466042e6a25c524',
    },
    name: 'Kompass Soju ',
    symbol: 'KOMP-ETH UNI-V2 LP',
    tokenSymbol: 'KOMP',
    icon: 'soju',
  },
]
