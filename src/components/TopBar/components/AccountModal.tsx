import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSoju from '../../../hooks/useSoju'
import { getSojuAddress } from '../../../soju/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import sojuicon from '../../../assets/icon/soju.png'
import intl from 'react-intl-universal'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { account, reset } = useWallet()

  const handleSignOutClick = useCallback(() => {
    onDismiss!()
    reset()
  }, [onDismiss, reset])

  const soju = useSoju()
  const sojuBalance = useTokenBalance(getSojuAddress(soju))

  return (
    <Modal>
      <ModalTitle text={intl.get('MyAccount')} />
      <ModalContent>
        <Spacer />

        <div style={{ display: 'flex' }}>
          <StyledBalanceWrapper>
            <CardIcon>
              <img src={sojuicon} style={{ width: '40px', height: '40px' }} />
            </CardIcon>
            <StyledBalance>
              <Value value={getBalanceNumber(sojuBalance)} />
              <Label text={intl.get('SOJUBalance')} />
            </StyledBalance>
          </StyledBalanceWrapper>
        </div>

        <Spacer />
        <Button
          href={`https://etherscan.io/address/${account}`}
          text={intl.get('ViewEtherscan')}
          variant="secondary"
        />
        <Spacer />
        <Button
          onClick={handleSignOutClick}
          text={intl.get('Signout')}
          variant="secondary"
        />
      </ModalContent>
      <ModalActions>
        <Button onClick={onDismiss} text={intl.get('Cancel')} />
      </ModalActions>
    </Modal>
  )
}

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
