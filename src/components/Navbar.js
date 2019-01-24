import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from "react-redux"

import github from '../img/github-icon.svg'
import Logo from '../img/svg/logo.svg'

const SECONDARY_COLOR = '#bcbcbc';

const MaybeLink = ({ children, pathname, to, ...passedProps }) =>
  pathname === to ? (
    <div {...passedProps}>{children}</div>
  ) : (
    <Link to={to} {...passedProps}>{children}</Link>
  );

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

const NavWrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 120px;
`

const NavMenu = styled.nav`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  top: 0;
  overflow: hidden;
  transition: left 0.6s;
`

const StyledLogo = styled(Link)`
  position: absolute;
  width: 80%;
  left: 10%;
  transition: top 0.6s;
`

const StyledLink = styled(MaybeLink)`
  cursor: ${props => props.to === props.pathname ? 'default' : 'pointer'};
  color: ${props => props.to === props.pathname ? SECONDARY_COLOR : '#000'};
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

  & > * {
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
      open: true,
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
    navigate('/')
  }

  render() {
    const { pathname } = this.props
    const { height, open, width } = this.state
    const isHome = pathname === '/'
    
    const navMenuStyle = {
      left: isHome ? height * 0.8 : 0,
      height: 120,
    };

    const logoStyle = {
      position: 'absolute',
      left: height * 0.8 + (width - (height * 0.8 + 300)) / 10,
      width: (width - (height * 0.8 + 300)) * 0.8,
      top: isHome ? height * (45 / 100) : 20,
    }
    
    const linksStyle = {
      width: width - (height * 0.8 + 300),
      left: isHome ? '10%' : 0,
      transform: `translateX(${open ? 0 : -50}%)`,
      opacity: open ? 1 : 0
    }
    
    return (
      <Nav role="navigation" aria-label="main-navigation">
        <div className="container">
          <div className="navbar-brand">
            {/* Hamburger menu */}
            {pathname !== '/' && (
              <Burger className="open">
                <div onClick={this.handleBurgerClick} data-target="navMenu">
                  <span />
                  <span />
                  <span />
                </div>
              </Burger>
            )}
          </div>
          <NavWrapper>
            <StyledLogo to="/" className="navbar-item" style={logoStyle} title="Logo">
              <Logo style={{ position: 'relative', width: '100%' }} />
            </StyledLogo>
            <NavMenu style={navMenuStyle} className="navMenu">
              <Links key={pathname} style={linksStyle}>
                <StyledLink
                  className="navbar-item"
                  pathname={pathname}
                  to="/"
                >
                  Home
                </StyledLink>
                <StyledLink
                  className="navbar-item"
                  pathname={pathname}
                  to="/about"
                >
                  Making of
                </StyledLink>
                <StyledLink
                  className="navbar-item"
                  pathname={pathname}
                  to="/contact"
                >
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
          </NavWrapper>
        </div>
      </Nav>
    )
  }
}

export default Navbar
