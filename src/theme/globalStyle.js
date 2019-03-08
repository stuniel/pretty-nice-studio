import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Amiri')
@import url('https://fonts.googleapis.com/css?family=Amiko')
@import url('https://fonts.googleapis.com/css?family=Cardo')
@import url('https://fonts.googleapis.com/css?family=Scheherazada')

html {
  scroll-behavior: smooth;
}

body {
  overscroll-behavior: contain;
  overflow: hidden;
  font-family: Amiri, serif;
  font-size: 14px;
  color: #464646;
  -webkit-font-smoothing: antialiased;
  
  & > div#___gatsby {
    position: absolute;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    
  }
  
  & > div {
    width: 100%;
    max-width: 100%;
    height: 100%;
  }
}

.preload * {
  -webkit-transition: none !important;
  -moz-transition: none !important;
  -ms-transition: none !important;
  -o-transition: none !important;
  transition: none !important;
}

.debug {
  background: red !important;
}

.description {
  position: relative;
}

.logo-enter {
  opacity: 0;
}
  
.logo-exit {
  transition: all 1.2s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(0);
  opacity: 1;
  
  &.logo-exit-active {
    transform: translateX(100%);
    opacity: 0;
  }
}

.description-forward-enter {
  transition: all 0.4s;
  transition-delay: 0.8s;
  transform: translateX(-33%);
  opacity: 0;
  
  &.description-forward-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
}
  
.description-forward-exit {
  transition: all 1s;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateX(0);
  opacity: 1;
  
  &.description-forward-exit-active {
    transform: translateX(100%);
    opacity: 0;
  }
}

.description-backward-enter {
  transition: all 0.4s;
  transition-delay: 0.8s;
  transform: translateX(33%);
  opacity: 0;
  
  &.description-backward-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
}
  
.description-backward-exit {
  transition: all 1s;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateX(0);
  opacity: 1;
  
  &.description-backward-exit-active {
    transform: translateX(-100%);
    opacity: 0;
  }
}
    
.number-primary-backward  {
  position: relative;
  float: left;
  
  span {
    display: inline-block;
  }
}

.number-primary-forward {
  position: relative;
  float: left;
  
  span {
    display: inline-block;
  }
}
      
.number-primary-forward-enter {
  transform: translateY(-100%);
  transition: all 0.4s;
  opacity: 0;
  
  &.number-primary-forward-enter-active {
    transform: translateY(0);
    opacity: 1;
  }
}
  
.number-primary-forward-exit {
  transition: all 0.4s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(0);
  opacity: 1;
  
  &.number-primary-forward-exit-active {
    transform: translateY(100%);
    opacity: 0;
  }
}


.number-primary-backward-enter {
  transition: all 0.4s;
  transform: translateY(100%);
  opacity: 0;
  
  &.number-primary-backward-enter-active {
    transform: translateY(0);
    opacity: 1;
  }
}
  
.number-primary-backward-exit {
  transition: all 0.4s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(0);
  opacity: 1;
  
  &.number-primary-backward-exit-active {
    transform: translateY(-100%);
    opacity: 0;
  }
}
    
    
.number-secondary-backward  {
  position: relative;
  float: left;
  
  span {
    display: inline-block;
  }
}

.number-secondary-forward {
  position: relative;
  float: left;
  
  span {
    display: inline-block;
  }
}
      
.number-secondary-forward-enter {
  transform: translateY(-200%);
  transition: all 0.4s;
  opacity: 0;
  
  &.number-secondary-forward-enter-active {
    transform: translateY(0);
    opacity: 1;
  }
}
  
.number-secondary-forward-exit {
  transition: all 0.4s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(0);
  opacity: 1;
  
  &.number-secondary-forward-exit-active {
    transform: translateY(200%);
    opacity: 0;
  }
}


.number-secondary-backward-enter {
  transition: all 0.4s;
  transform: translateY(200%);
  opacity: 0;
  
  &.number-secondary-backward-enter-active {
    transform: translateY(0);
    opacity: 1;
  }
}
  
.number-secondary-backward-exit {
  transition: all 0.4s;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(0);
  opacity: 1;
  
  &.number-secondary-backward-exit-active {
    transform: translateY(-200%);
    opacity: 0;
  }
}
`
