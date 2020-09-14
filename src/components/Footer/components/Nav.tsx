import React from 'react'
import styled from 'styled-components'
import { contractAddresses } from '../../../kbar/lib/constants'

const Nav: React.FC = () => {
  const ContractUrl = () => {
    return `https://etherscan.io/address/${contractAddresses.Sommelier[1]}#code`
  }
  return (
    <StyledNav>
      {/* KbarSwap Contract  Github  Twitter  Medium   Telegram  Discord */}
      <StyledLink
        target="_blank"
        href={ContractUrl()}
      >
        KbarSwap Contract
      </StyledLink>
      <StyledLink target="_blank" href="https://github.com/kbarswap">
        Github
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Twitter
      </StyledLink>
      <StyledLink target="_blank" href="https://twitter.com/kbarswap">
        Medium
      </StyledLink>
      <StyledLink target="_blank" href="#">
        Telegram
      </StyledLink>
      <StyledLink target="_blank" href="https://discord.gg/hJ2p555">
        Discord
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.white};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
`

export default Nav
