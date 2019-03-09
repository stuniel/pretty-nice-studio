import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import csx from 'classnames'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'

import FullLogo from '../img/svg/logo.svg'

import { getConfig, isTablet } from '../config.js'

const SECONDARY_COLOR = '#bcbcbc'

const MaybeLink = ({ children, pathname, to, ...passedProps }) =>
  pathname === to ? (
    <div {...passedProps}>{children}</div>
  ) : (
    <Link to={to} {...passedProps}>
      {children}
    </Link>
  )

const Nav = styled.nav`
  position: relative;
  z-index: 10;
`

const BurgerWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Burger = styled.div`
  & > div {
    cursor: pointer;
    height: ${ props => `${ props.size * 0.66 }px` };
    width: ${ props => `${ props.size * 1.33 }px` };
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    & > span {
      height: 2px;
      width: 100%;
      background: #464646;
      transition: all 0.4s;
      
      &:nth-child(2) {
        width: 50%;
      }
    }
  }

  &.open {
    & > div {
      height: ${ props => `${ props.size }px` };
      width: ${ props => `${ props.size }px` };
      
      & > span {
        &:nth-child(1) {
          width: 133%;
          transform-origin: left top;
          transform: rotate(45deg);
        }
        
        &:nth-child(2) {
          width: 133%;
          transform-origin: left bottom;
          transform: rotate(-45deg);
        }
      }
    }
  }
  
  :hover {
    & > div {
      & > span {
        background: ${ SECONDARY_COLOR };
        
        &:nth-child(2) {
          width: 100%;
        }
      }
    }
    
    &.open {
      & > div {
        & > span {
          background: ${ SECONDARY_COLOR };
          
          &:nth-child(2) {
            width: 133%;
          }
        }
      }
    }
  }
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 120px;
`

const NavMenu = styled.nav`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: left 0.6s, opacity 0.4s, transform 0.4s;
  background-color: #fff;
`

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: width 0.6s, left 0.6s, top 0.6s, height 0.6s;
  ${ props => props.isTablet && 'background: #fff' };
`

const StyledLogoLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: left 0.6s, top 0.6s, transform 0.6s;
`

const StyledLogo = styled(FullLogo)`
  & > g {
    fill: #000;
    transition: all 0.4s;
  }
  
  :hover {
    & > g {
      fill: ${ SECONDARY_COLOR };
    }
  }
`

const StyledLink = styled(MaybeLink)`
  cursor: ${ props => (props.to === props.pathname ? 'default' : 'pointer') };
  color: ${ props => (props.to === props.pathname ? SECONDARY_COLOR : '#000') };
`

const Links = styled.div`
  position: relative;
  flex-direction: ${ props => props.isTablet ? 'column' : 'row' };
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: all 0.4s;

  & > * {
    font-family: Amiko, sans-serif;
    letter-spacing: 0.6em;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8em;
    text-decoration: none;
    transition: color 0.4s;

    &:last-child {
      margin: 0;
    }

    &:hover {
      color: ${ SECONDARY_COLOR };
    }
  }
`

const Navbar = class extends React.Component {
  formatLogoStyle = (state, config) => {
    const transitionStyles = {
      entered: {
        transform: 'translateX(0)',
        opacity: 1,
      },
      exited: {
        transform: 'translateX(-100%)',
        opacity: 0,
      },
    }

    return {
      position: 'absolute',
      width: '100%',
      transform: 'transitionX(0)',
      opacity: 1,
      transition: 'all 0.6s ease',
      ...(state === 'entering' && transitionStyles.entered),
      ...(state === 'entered' && transitionStyles.entered),
      ...(state === 'exited' && transitionStyles.exited),
      ...(state === 'exiting' && transitionStyles.exited),
    }
  }

  handleBurgerClick = () => {
    const { toggleMenu } = this.props

    toggleMenu()
  }

  render () {
    const {
      closeMenu,
      transitions: {
        logoVisible,
        menuOpen
      },
      media,
      pathname
    } = this.props
    const isHome = pathname === '/'
    const config = getConfig(media, pathname)

    const burgerClassName = csx({ 'open': menuOpen })

    const navStyle = {
      ...config.navbar.getPosition()
    }

    const burgerStyle = {
      ...config.navbar.burger.getPosition()
    }

    const navMenuStyle = {
      transform: menuOpen
        ? 'translateY(0)'
        : 'translateY(-100%)',
      ...config.navbar.navMenu.getPosition(isHome)
    }

    const logoWrapper = {
      ...config.navbar.logo.wrapper.getPosition(menuOpen)
    }

    const logoStyle = {
      ...config.navbar.logo.getPosition(menuOpen)
    }

    const linksStyle = {
      ...config.navbar.links.getPosition(isHome)
    }

    return (
      <Nav role="navigation" aria-label="main-navigation" style={navStyle}>
        <NavWrapper>
          <NavMenu media={media} style={navMenuStyle}>
            <Links
              isTablet={isTablet(media)}
              media={media}
              key={pathname}
              style={linksStyle}
            >
              <StyledLink
                pathname={pathname}
                to="/making_of"
                onClick={closeMenu}
              >
                Making of
              </StyledLink>
              <StyledLink
                pathname={pathname}
                to="/about"
                onClick={closeMenu}
              >
                About
              </StyledLink>
              <StyledLink
                pathname={pathname}
                to="/contact"
                onClick={closeMenu}
              >
                Contact
              </StyledLink>
            </Links>
          </NavMenu>
          <LogoWrapper isTablet={isTablet(media)} style={logoWrapper}>
            <StyledLogoLink
              to="/"
              style={logoStyle}
              title="Logo"
              onClick={closeMenu}
            >
              <Transition
                in={logoVisible}
                timeout={0}
              >
                {state => {
                  const style = isTablet(media)
                    ? {}
                    : this.formatLogoStyle(state, config)

                  return (
                    <div style={style}>
                      <StyledLogo
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  )
                }}
              </Transition>
            </StyledLogoLink>
          </LogoWrapper>
          <div className="navbar-brand">
            <BurgerWrapper style={burgerStyle}>
              <Burger
                media={media}
                onClick={this.handleBurgerClick}
                className={burgerClassName}
                size={20}
              >
                <div data-target="navMenu">
                  <span />
                  <span />
                </div>
              </Burger>
            </BurgerWrapper>
          </div>
        </NavWrapper>
      </Nav>
    )
  }
}

const mapStateToProps = ({ transitions, media }) => {
  return { transitions, media }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleMenu: () => dispatch({ type: 'TOGGLE_MENU' }),
    closeMenu: () => dispatch({ type: 'CLOSE_MENU' }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
