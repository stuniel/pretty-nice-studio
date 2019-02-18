import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import csx from 'classnames'
import { Transition } from 'react-transition-group'
import { connect } from 'react-redux'

import FullLogo from '../img/svg/fulllogo.svg'

import { RATIO_SMALL, getConfig, getPadding } from '../config.js'

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

const Burger = styled.div`
  position: absolute;

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
        background: ${ SECONDARY_COLOR };
      }
    }

    & > span {
      height: ${ props => getPadding(props.media).paddingVertical / 15 }px;
      width: 100%;
      background: #000;
      transition: all 0.4s;
    }
  }

  &.open {
    & > div {
      & > span {
        &:nth-child(1) {
          transform: ${ props =>
    'translateY(' + (getPadding(props.media).paddingVertical * 0.17) +
    'px) rotate(-45deg)' };
        }

        &:nth-child(2) {
          transform: translateX(50%);
          opacity: 0;
        }

        &:nth-child(3) {
          transform: ${ props =>
    'translateY(' + (getPadding(props.media).paddingVertical * -0.17) +
    'px) rotate(45deg)' };
        }
      }
    }
  }
`

const NavWrapper = styled.nav`
  position: relative;
  top: 0;
  left: 0;
  height: 120px;
`

const NavMenu = styled.nav`
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  transition: left 0.6s, opacity 0.4s, transform 0.4s;
  background-color: ${ props => props.media.ratio < RATIO_SMALL && '#fff' };
`

const LogoWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: top 0.6s, height 0.6s;
  transition-delay: 0.15s;
`

const StyledLogoLink = styled(Link)`
  position: absolute;
  transition: top 0.6s, transform 0.6s;
  transition-delay: 0.15s;
`

const StyledLogo = styled(FullLogo)`
  & > g {
    fill: #000;
  }
`

const StyledLink = styled(MaybeLink)`
  cursor: ${ props => (props.to === props.pathname ? 'default' : 'pointer') };
  color: ${ props => (props.to === props.pathname ? SECONDARY_COLOR : '#000') };
`

const Links = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s;

  & > * {
    font-family: Amiko, serif;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1em;
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
  constructor (props) {
    super(props)
    this.state = {
      isMenuOpen: false,
    }
  }

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
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }))
  }

  closeMenu = () => {
    this.setState({ isMenuOpen: false })
  }

  render () {
    const { transitions: { logoVisible }, media, pathname } = this.props
    const { isMenuOpen } = this.state
    const { ratio } = media
    const isHome = pathname === '/'
    const config = getConfig(media, pathname)

    const burgerClassName = csx({ 'open': isMenuOpen })

    const navStyle = {
      ...config.navbar.getPosition()
    }

    const burgerStyle = {
      ...config.navbar.burger.getPosition()
    }

    const navMenuStyle = {
      opacity: ratio > 1 || isMenuOpen ? 1 : 0,
      transform: ratio > 1 || isMenuOpen
        ? 'translateY(0)'
        : 'translateY(-100%)',
      boxShadow: ratio < RATIO_SMALL && '0px 5px 50px rgba(0, 0, 0, 0.5)',
      ...config.navbar.navMenu.getPosition(isHome)
    }

    const logoWrapper = {
      ...config.navbar.logo.wrapper.getPosition(isHome)
    }

    const logoStyle = {
      ...config.navbar.logo.getPosition(isHome)
    }

    const linksStyle = {
      ...config.navbar.links.getPosition(isHome)
    }

    return (
      <Nav role="navigation" aria-label="main-navigation" style={navStyle}>
        <NavWrapper>
          <LogoWrapper style={logoWrapper}>
            <StyledLogoLink
              to="/"
              style={logoStyle}
              title="Logo"
            >
              <Transition
                in={logoVisible}
                timeout={0}
              >
                {state => {
                  const style = ratio > RATIO_SMALL
                    ? this.formatLogoStyle(state, config)
                    : {}

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
          <NavMenu media={media} style={navMenuStyle}>
            <Links media={media} key={pathname} style={linksStyle}>
              <StyledLink
                pathname={pathname}
                to="/"
                onClick={this.closeMenu}
              >
                Home
              </StyledLink>
              <StyledLink
                pathname={pathname}
                to="/making_of"
                onClick={this.closeMenu}
              >
                Making of
              </StyledLink>
              <StyledLink
                pathname={pathname}
                to="/contact"
                onClick={this.closeMenu}
              >
                Contact
              </StyledLink>
            </Links>
          </NavMenu>
          <div className="navbar-brand">
            {ratio < RATIO_SMALL && (
              <Burger
                media={media}
                onClick={this.handleBurgerClick}
                className={burgerClassName}
                style={burgerStyle}
              >
                <div data-target="navMenu">
                  <span />
                  <span />
                  <span />
                </div>
              </Burger>
            )}
          </div>
        </NavWrapper>
      </Nav>
    )
  }
}

const mapStateToProps = ({ transitions, media }) => {
  return { transitions, media }
}

const mapDispatchToProps = () => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
