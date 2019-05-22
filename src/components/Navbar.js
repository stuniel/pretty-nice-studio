import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'

import FullLogo from '../img/svg/logo.svg'

import {
  getConfig,
  getPadding,
  isMobile,
  isTablet,
  isLaptop,
  sliderHeight
} from '../config.js'

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
  top: 0;
  left: 0;
  height: 10vh;
  max-height: 10vh
  
  ${ props => props.isTablet && `
    height: 10vh;
    max-height: calc(90vh - ${ sliderHeight(props.isMobile) });
  ` }
`

const BurgerWrapper = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 10vh;
  height: 10vh;
  
  ${ props => props.isLaptop && `
    width: 6.66vw;
  ` }
  
  ${ props => props.isTablet && `
    width: 10vw;
    top: 0;
    left: 6.66vw;
    width: auto;
  ` }
  
  ${ props => props.isMobile && `
    left: 6.66vw;
  ` }
`

const Burger = styled.div`
  & > div {
    cursor: pointer;
    height: ${ props =>
    `${ props.menuOpen ? props.size : props.size * 0.66 }px` };
    width: ${ props =>
    `${ props.menuOpen ? props.size : props.size * 1.33 }px` };
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    & > span {
      height: 2px;
      width: 100%;
      background: ${ props => (props.isTablet && !props.menuOpen && props.isHome) || (props.laptop && props.isAbout)
    ? '#fff'
    : props.isTablet && props.isSessions && !props.menuOpen && props.burgerColor === 'light'
      ? '#fff' : '#232323' };
      transition: all 0.4s;
      
      &:nth-child(2) {
        width: 50%;
      }
    }
  }

  ${ props => props.menuOpen && `
    & > div {
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
  ` }
  
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    :hover {
      & > div {
        & > span {
          background: ${ SECONDARY_COLOR };
          
          &:nth-child(2) {
            width: 100%;
          }
        }
      }
      
      ${ props => props.menuOpen && `
        & > div {
          & > span {
            background: ${ SECONDARY_COLOR };
            
            &:nth-child(2) {
              width: 133%;
            }
          }
        }
      ` }
    }
  }
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 10vh;
`

const NavMenu = styled.nav`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: left 0.6s, opacity 0.4s,
  transform ${ props => props.transitionMenu }ms;
  background-color: #fff;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transform: ${ props => props.menuOpen
    ? 'translateY(0)'
    : 'translateY(-100%)' };
`

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ${ props => props.isTablet && `
    padding: ${ props.paddingHorizontal }px;
    transform: translateY(10vh);
    ` }
  transition: opacity 0.6s, width 0.6s, left 0.6s, top 0.6s, height 0.6s;
`

const StyledLogoLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  transition: left 0.6s, top 0.6s, transform 0.6s, opacity 0.6s;
  opacity: ${ props => props.isTablet && !props.menuOpen ? '0' : '1' };
`

const StyledLogo = styled(FullLogo)`
  display: block;

  & > g {
    fill: inherit;
    transition: all 0.4s;
  }
  @media (-moz-touch-enabled: 0), (pointer: fine) {
    :hover {
      & > g {
        fill: ${ SECONDARY_COLOR };
      }
    }
  }
`

const StyledLink = styled(MaybeLink)`
  cursor: ${ props => (props.to === props.pathname ? 'default' : 'pointer') };
  color: ${ props => (props.to === props.pathname ? SECONDARY_COLOR : 'inherit') };
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

    @media (-moz-touch-enabled: 0), (pointer: fine) {
      &:hover {
        color: ${ SECONDARY_COLOR };
      }
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
      burgerColor,
      closeMenu,
      transitions: {
        logoVisible,
        menuOpen,
        transitionMenu
      },
      media,
      pathname,
    } = this.props
    const isHome = pathname === '/'
    const config = getConfig(media, pathname)
    const { paddingHorizontal } = getPadding(media)
    const isLogoVisible = !(isTablet(media) && (pathname === '/about' || pathname === '/contact'))
    const isAbout = pathname === '/about'
    const isSessions = pathname.includes('sessions')

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
      <Nav
        role="navigation"
        aria-label="main-navigation"
        isMobile={isMobile(media)}
        isTablet={isTablet(media)}
      >
        <NavWrapper>
          <NavMenu menuOpen={menuOpen} transitionMenu={transitionMenu}>
            <Links
              isTablet={isTablet(media)}
              media={media}
              key={pathname}
              style={linksStyle}
            >
              <StyledLink
                pathname={pathname}
                to="/"
                onClick={closeMenu}
              >
                Home
              </StyledLink>
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
          <LogoWrapper
            isTablet={isTablet(media)}
            isLogoVisible={isLogoVisible}
            paddingHorizontal={paddingHorizontal}
            style={logoWrapper}
          >
            <StyledLogoLink
              to="/"
              style={logoStyle}
              title="Logo"
              onClick={closeMenu}
              isMobile={isMobile(media)}
              isTablet={isTablet(media)}
              menuOpen={menuOpen}
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
            <BurgerWrapper
              isMobile={isMobile(media)}
              isTablet={isTablet(media)}
              isLaptop={isLaptop(media)}
            >
              <Burger
                burgerColor={burgerColor}
                media={media}
                onClick={this.handleBurgerClick}
                isHome={isHome}
                isAbout={isAbout}
                isMobile={isMobile(media)}
                isTablet={isTablet(media)}
                isSessions={isSessions}
                laptop={isLaptop(media) && !isTablet(media)}
                menuOpen={menuOpen}
                size={isMobile(media) ? 15 : 20}
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

const mapStateToProps = ({
  color: { burger: burgerColor },
  transitions,
  media
}) => {
  return { burgerColor, transitions, media }
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
