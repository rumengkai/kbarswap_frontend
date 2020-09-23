import React from 'react'
import styled from 'styled-components'
import { contractAddresses } from '../../../soju/lib/constants'
import intl from 'react-intl-universal'

const Nav: React.FC = () => {
  const ContractUrl = () => {
    return `https://etherscan.io/address/${contractAddresses.Sommelier[1]}#code`
  }
  return (
    <StyledNav>
      <StyledLink
        target="_blank"
        href={ContractUrl()}
      >
        {intl.get('SojuSwapContract')}
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/SojuSwap">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/sojuswap_SOJU">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://medium.com/@sojuswap">
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/nZkwBCw">
        Discord
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  width:auto;
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  box-sizing:border-box;
  white-space:nowrap; 
  color: ${(props) => props.theme.color.white};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
