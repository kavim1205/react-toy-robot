import styled from 'styled-components'

const CommandLineStyled = styled.div`
  margin: 20px;
`

const CommandLineLabelStyled = styled.label`
  display: block;
  margin-bottom: 10px;
`

const CommandLineInputStyled = styled.input`
  border: 1px solid grey;
  font-size: 1rem;
  padding: 10px 10px;
  margin: 0 10px;
  width: 200px;
`

const CommandLineButtonStyled = styled.button`
  background: #0058a1;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 11px 25px;
`

const CommandLineErrorStyled = styled.p`
  color: red;
`

export {
  CommandLineButtonStyled,
  CommandLineErrorStyled,
  CommandLineInputStyled,
  CommandLineLabelStyled,
  CommandLineStyled,
}
