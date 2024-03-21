import styled from 'styled-components'

const HeaderStyled = styled.header`
  background: white;
  border-bottom: 1px solid grey;
  margin-bottom: 40px;
  width: 100%;
`

const H1Styled = styled.h1`
  display: inline-block;
  line-height: 2;
  margin: 1rem 20px 0 0;
`

const H2Styled = styled.h2`
  display: inline-block;
  line-height: 5;
  margin: 0;
  vertical-align: top;
`

const Logo = styled.img`
  width: 5rem;
`

export { HeaderStyled, H1Styled, H2Styled, Logo }
