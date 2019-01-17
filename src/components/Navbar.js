import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import github from '../img/github-icon.svg'
import Logo from '../img/svg/logo.svg'

const SECONDARY_COLOR = '#bcbcbc';

const Nav = styled.nav`
  position: relative;
  max-height: 120px;
  height: 120px;
  z-index: 10;
`

const Burger = styled.div`
  position: absolute;
  max-height: 120px;
  height: 120px;
  width: 120px;
  top: 0;
  left: 0;
  padding: 50px;

  & > div {
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    
    &:hover {
      & > span {
        background: ${SECONDARY_COLOR};
      }
    }
    
    & > span {
      height: 2px;
      width: 100%;
      background: #000;
      transition: all 0.4s;
    }
  }
  
  &.open {
    & > div {
      & > span {
        &:nth-child(1) {
          transform: translateY(7px) rotate(-45deg);
        }
        
        &:nth-child(2) {
          transform: translateX(50%);
          opacity: 0;
        }
        
        &:nth-child(3) {
          transform: translateY(-7px) rotate(45deg);
        }
      }
    }
  }
  
`

const NavMenu = styled.nav`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  top: 0;
  left: 120px;
  overflow: hidden;
`

const StyledLogo = styled(Logo)`
  position: absolute;
  width: 80%;
  left: 10%;
  transition: top 0.4s;
`

const StyledLink = styled(Link)`
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  color: ${props => props.disabled ? SECONDARY_COLOR : '#000'};
`

const LogoImg = styled.img`
  position: absolute;
  width: 80%;
  left: 10%;
  transition: top 0.4s;
`

const Links = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.4s;
  padding: 50px 0;
  left: 10%;

  & > a {
    font-family: Amiko, serif;
    text-transform: uppercase;
    margin-right: 50px;
    text-decoration: none;
    transition: color 0.4s;

    &:last-child {
      margin: 0;
    }

    &:hover {
      color: ${SECONDARY_COLOR};
    }
  }
`

const Navbar = class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      height: 0,
      width: 0,
    }
  }

  componentDidMount() {
    this.handleWindowSizeChange();
    window.addEventListener('resize', this.handleWindowSizeChange);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }
  
  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  
  handleBurgerClick = () => {
    this.setState(state => ({ open: !state.open }))
  }

  render() {
    const { pathname } = this.props
    const { height, open, width } = this.state

    const navMenuStyle = {
      left: height * 0.8 + 120,
      height: height / 2,
    };
    
    const logoStyle = {
      top: open ? (height / 4) : 120 - height / 24,
    }
    
    const linksStyle = {
      width: width - (height * 0.8 + 300),
      transform: `translateX(${open ? 0 : -50}%)`,
      opacity: open ? 1 : 0
    }
    
    return (
      <Nav role="navigation" aria-label="main-navigation">
        <div className="container">
          <div className="navbar-brand">
            {/* Hamburger menu */}
            <Burger className={open && "open"}>
              <div onClick={this.handleBurgerClick} data-target="navMenu">
                <span />
                <span />
                <span />
              </div>
            </Burger>
          </div>
          <NavMenu style={navMenuStyle} className="navMenu">
            {
              pathname === '/' ? (
                <TransitionGroup component="div" className="logo">
                  <CSSTransition
                    classNames="logo"
                    key={pathname}
                    timeout={{ enter: 3000, exit: 1000 }}
                    >
                      {/* <LogoImg src={logo} alt="pretty nice studio" style={logoStyle} /> */}
                      <StyledLogo style={logoStyle} />
                    </CSSTransition>
                  </TransitionGroup>
                ) : (
                  <Link to="/" className="navbar-item" title="Logo">
                  {/* <img src={logo} alt="Kaldi" style={{ width: '88px' }} /> */}
                </Link>
              )
            }
            <Links style={linksStyle}>
              <StyledLink disabled={pathname === '/'} className="navbar-item" to="/">
                Home
              </StyledLink>
              <StyledLink className="navbar-item" to="/contact">
                Making of
              </StyledLink>
              <StyledLink className="navbar-item" to="/contact">
                Contact
              </StyledLink>
            </Links>
            <div className="navbar-end has-text-centered">
              {/* <a
              className="navbar-item"
              href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="icon">
                <img src={github} alt="Github" />
              </span>
            </a> */}
            </div>
          </NavMenu>
        </div>
      </Nav>
    )
  }
}

export default Navbar
