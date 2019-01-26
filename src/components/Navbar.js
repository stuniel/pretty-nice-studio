import React from 'react'
import { Link, navigate } from 'gatsby'
import styled from 'styled-components'
import csx from 'classnames'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'

import Logo from '../img/svg/fulllogo.svg'

import { config, getPadding } from '../config.js'

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
      height: ${ props => getPadding(props.media) / 15 }px;
      width: 100%;
      background: #000;
      transition: all 0.4s;
    }
  }

  &.open {
    & > div {
      & > span {
        &:nth-child(1) {
          transform: ${ props => 'translateY(' + (getPadding(props.media) * 0.17) + 'px) rotate(-45deg)' };
        }

        &:nth-child(2) {
          transform: translateX(50%);
          opacity: 0;
        }

        &:nth-child(3) {
          transform: ${ props => 'translateY(' + (getPadding(props.media) * -0.17) + 'px) rotate(45deg)' };
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
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  transition: left 0.6s, opacity 0.4s, transform 0.4s;
  background-color: #fff;
`

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogoLink = styled(Link)`
  position: absolute;
  transition: left 0.6s;
  transition-delay: 0.15s;
`

const StyledLogo = styled(Logo)`
  & > g#title {
    opacity: ${ props => props.full ? 1 : 0 };
    transition: opacity 0.6s;
  }
`

const StyledLink = styled(MaybeLink)`
  cursor: ${ props => (props.to === props.pathname ? 'default' : 'pointer') };
  color: ${ props => (props.to === props.pathname ? SECONDARY_COLOR : '#000') };
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

  & > * {
    font-family: Amiko, serif;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1em;
    margin-right: ${ props => getPadding(props.media) / 2 }px;
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
      height: 0,
      width: 0,
    }
  }

  componentDidMount () {
    this.handleWindowSizeChange()
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  handleBurgerClick = () => {
    this.setState(state => ({ isMenuOpen: !state.isMenuOpen }))
  }

  render () {
    const { media, pathname } = this.props
    const { height, isMenuOpen, width } = this.state
    const { ratio } = media
    const isHome = pathname === '/'

    const burgerClassName = csx({ 'open': isMenuOpen })

    const navStyle = {
      ...config.navbar.getPosition(media)
    }

    const burgerStyle = {
      ...config.navbar.burger.getPosition(media)
    }

    const navMenuStyle = {
      opacity: isMenuOpen ? 1 : 0,
      transform: isMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
      boxShadow: ratio < 1 && '0px 5px 50px rgba(0, 0, 0, 0.5)',
      ...config.navbar.navMenu.getPosition(media, isHome)
    }

    const logoWrapper = {
      ...config.navbar.logo.wrapper.getPosition(media, isHome)
    }

    const logoStyle = {
      ...config.navbar.logo.getPosition(media, isHome)
    }

    const linksStyle = {
      // transform: `translateX(${ isMenuOpen ? 0 : -50 }%)`,
      ...config.navbar.links.getPosition(media, isHome)
    }

    return (
      <Nav role="navigation" aria-label="main-navigation" style={navStyle}>
        <NavWrapper>
          <LogoWrapper style={logoWrapper}>
            <StyledLogoLink
              to="/"
              className="navbar-item"
              style={logoStyle}
              title="Logo"
            >
              <div style={{ position: 'relative', width: '100%' }}>
                <StyledLogo full={isHome} style={{ width: '100%', height: '100%' }}/>
                {/* <LogoTitle /> */}
              </div>
            </StyledLogoLink>
          </LogoWrapper>
          <NavMenu style={navMenuStyle}>
            <Links media={media} key={pathname} style={linksStyle}>
              <StyledLink className="navbar-item" pathname={pathname} to="/">
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
          </NavMenu>
          <div className="navbar-brand">
            {/* Hamburger menu */}
            {/* {pathname !== '/' && (
              <Burger className="open">
              <div onClick={this.handleBurgerClick} data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </Burger>
        )} */}
        {ratio < 1 && (
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

const mapStateToProps = ({ media }) => {
  return { media }
}

const mapDispatchToProps = () => {}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar)
