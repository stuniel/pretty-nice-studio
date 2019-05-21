import styled from 'styled-components'

const SECONDARY_COLOR = '#bcbcbc'

const Button = styled.div`
  font-family: Amiko, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 12px;
  color: inherit;
  cursor: pointer;
  margin-top: 30px;
  transition: color 0.4s;

  @media (-moz-touch-enabled: 0), (pointer: fine) {
    :hover {
      color: ${ SECONDARY_COLOR };
    }
  }
`

export default Button
