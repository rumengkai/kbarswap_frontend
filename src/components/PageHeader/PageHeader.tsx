import React from 'react'
import styled from 'styled-components'

import Container from '../Container'

import beer from '../../assets/icon/beer.png'
import bottle from '../../assets/icon/bottle.png'
import cocktail from '../../assets/icon/cocktail.png'
import sake from '../../assets/icon/sake.png'
import soju from '../../assets/icon/soju.png'
import tropical from '../../assets/icon/tropical.png'
import tumbler from '../../assets/icon/tumbler.png'
import wine from '../../assets/icon/wine.png'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  const Title = () => {
    if (title.indexOf('Sommelier') > -1) {
      return (<StyledTitle>Your <StyledTitleSpan>Sommelier</StyledTitleSpan> is ready</StyledTitle>)
    } else {
      return (<StyledTitle>{title}</StyledTitle>)
    }
  }
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
        return soju
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
  const imgFun = (icon: any) => {
    if (iconFun(icon) !== 'icon') {
      return <img src={iconFun(icon)} style={{ width: '100px', height: '100px' }} />
    } else {
      return icon
    }
  }
  return (
    <Container size="sm">
      <StyledPageHeader>
        <StyledIcon>{imgFun(icon)}</StyledIcon>
        {Title()}
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-top: ${(props) => props.theme.spacing[6]}px;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  width: 120px;
`

const StyledTitleSpan = styled.h1`
  font-family: 'Kaushan Script', sans-serif;
  color: ${(props) => props.theme.color.white};
  font-size: 36px;
  font-weight: 700;
  margin-right:10px;
  line-height: 80px;
  display: inline-block;
`
const StyledTitle = styled.div`
  /* font-family: 'Kaushan Script', sans-serif; */
  color: ${(props) => props.theme.color.white};
  font-size: 36px;
  font-weight: 700;
  line-height: 80px;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: ${(props) => props.theme.color.white};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default PageHeader
