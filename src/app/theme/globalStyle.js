import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

body:before {
  content: "";
  width: 100%;
  height: 100%;
}

body {
  overflow: hidden;
  font-family: Amiri, serif;
  font-size: 14px;
  color: #232323;
  fill: #232323;
  scroll-behavior: smooth
  -webkit-font-smoothing: antialiased;
  overflow: hidden;

  &::-webkit-scrollbar { 
    display: none;
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

.cc-settings-btn {
  visibility: hidden !important;
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
