import React, { useState } from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import intl from 'react-intl-universal';

interface TopBarProps {
  onPresentMobileMenu: () => void
}
const SUPPOER_LOCALES = [
  {
    name: "English",
    value: "en-US"
  },
  {
    name: "简体中文",
    value: "zh-CN"
  }
]
const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {

  let currentLocale = intl.determineLocale({
    urlLocaleKey: "lang",
    cookieLocaleKey: "lang"
  })
  let t = SUPPOER_LOCALES.find(e => e.value === currentLocale)
  const [selectValue, setSelectValue] = useState(t ? t.name : 'Language')

  const selectStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    marigin: '10px'
  }
  const optionStyle = {
    background: 'none',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    height: '30px'
  }
  const renderLocaleSelector = () => {
    return (
      <select onChange={onSelectLocale} defaultValue="" style={selectStyle}>
        <option value="" disabled>
          {selectValue}
        </option>
        {SUPPOER_LOCALES.map(locale => (
          <option key={locale.value} value={locale.value} style={optionStyle}>
            {locale.name}
          </option>
        ))}
      </select>
    )
  }

  const onSelectLocale = (e: any) => {
    let lang = e.target.value
    window.location.search = `?lang=${lang}`
  }

  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <Nav />
          <StyledAccountButtonWrapper>
            {renderLocaleSelector()}
            <AccountButton />
          </StyledAccountButtonWrapper>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledLogoWrapper = styled.div`
  width: 260px;
  @media (max-width: 400px) {
    width: auto;
  }
`

const StyledTopBar = styled.div``

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${(props) => props.theme.siteWidth}px;
  width: 100%;
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  width:260px;
  display:flex;
  justify-content:flex-end;
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

export default TopBar
