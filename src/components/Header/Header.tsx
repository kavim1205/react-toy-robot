import React from 'react'
import { H2Styled, HeaderStyled } from './HeaderStyles'

interface PropsType {
  heading: string
}

export const Header: React.FC<PropsType> = ({ heading }) => (
  <HeaderStyled>
    <H2Styled>{heading}</H2Styled>
  </HeaderStyled>
)
