import React, { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { UseWalletProvider } from 'use-wallet'
import DisclaimerModal from './components/DisclaimerModal'
import MobileMenu from './components/MobileMenu'
import TopBar from './components/TopBar'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import SojuProvider from './contexts/SojuProvider'
import useModal from './hooks/useModal'
import theme from './theme'
// import Farms from './views/Farms'
// import Home from './views/Home'
// import Stake from './views/Stake'

import http from "axios"
import intl from 'react-intl-universal';

require("intl/locale-data/jsonp/en.js")
require("intl/locale-data/jsonp/ko.js")

const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en-US"
  },
  {
    name: "한국어.",
    value: "ko-KR"
  }
]


const Farms = lazy(() => import('./views/Farms'/* webpackChunkName: "Farms" */));
const Home = lazy(() => import('./views/Home'/* webpackChunkName: "Home" */));
const Stake = lazy(() => import('./views/Stake'/* webpackChunkName: "Stake" */));

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [initDone, setInitDone] = useState(false)

  useEffect(() => {
    loadLocales()
  }, [])

  const loadLocales = () => {
    let currentLocale = intl.determineLocale({
      urlLocaleKey: "lang",
      cookieLocaleKey: "lang"
    })

    if (!SUPPOER_LOCALES.find(e => e.value === currentLocale)) {
      currentLocale = "en-US"
    }

    http.get(`locales/${currentLocale}.json`).then(res => {
      console.log("App locale data", res.data)
      // init method will load CLDR locale data according to currentLocale
      return intl.init({
        currentLocale,
        locales: {
          [currentLocale]: res.data
        }
      })
    }).then(() => {
      // After loading CLDR locale data, start to render
      setInitDone(true)
    })
  }
  

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  return (
    initDone&&<Providers>
      <Router>
        <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
        <MobileMenu onDismiss={handleDismissMobileMenu} visible={mobileMenu} />
        <Switch>
          <Route path="/" exact>
            <Suspense fallback={<div></div>}>
              <Home />
            </Suspense>
          </Route>
          <Route path="/farms">
            <Suspense fallback={<div></div>}>
              <Farms />
            </Suspense>
          </Route>
          <Route path="/staking">
            <Suspense fallback={<div></div>}>
              <Stake />
            </Suspense>
          </Route>
        </Switch>
      </Router>
      <Disclaimer />
    </Providers>
  )
}

const Providers: React.FC = ({ children }) => {

  let chainId = 3  // 1：正式公网，3：测试网

  const rpcUrl = () => {
    if (chainId === 1) {
      return 'https://mainnet.eth.aragon.network/'
    } else {
      return 'https://api.infura.io/v1/jsonrpc/ropsten'
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl: rpcUrl() },
        }}
      >
        <SojuProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ModalsProvider>{children}</ModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </SojuProvider>
      </UseWalletProvider>
    </ThemeProvider>
  )
}

const Disclaimer: React.FC = () => {
  const markSeen = useCallback(() => {
    localStorage.setItem('disclaimer', 'seen')
  }, [])

  const [onPresentDisclaimerModal] = useModal(
    <DisclaimerModal onConfirm={markSeen} />,
  )

  useEffect(() => {
    const seenDisclaimer = true // localStorage.getItem('disclaimer')
    if (!seenDisclaimer) {
      onPresentDisclaimerModal()
    }
  }, [])

  return <div />
}

export default App
