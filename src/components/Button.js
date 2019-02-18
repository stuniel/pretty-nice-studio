import styled from 'styled-components'

const SECONDARY_COLOR = '#bcbcbc'

const Button = styled.div`
  font-family: Amiko, serif;
  text-transform: uppercase;
  font-size: 12px;
  padding: 3px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #000;
  cursor: pointer;
  margin-top: 30px;
  height: 30px;
  width: 165px;
  transition: background 0.4s;
  
  &:hover {
    background: ${ SECONDARY_COLOR };
  }
`

export default Button
