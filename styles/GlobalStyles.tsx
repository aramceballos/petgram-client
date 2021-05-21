import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
html {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

* {
    scrollbar-width: 0;
}

*, *::before, *::after {
    box-sizing: inherit;
}

ul, li, h1, h2, h3, p, button {
    margin: 0;
    padding: 0;
}

ul {
    list-style: none;
}

button {
    background: transparent;
    border: 0;
    outline: 0;
}

body {
    background: #fefefe;
    height: 100vh;
    margin: 0 auto;
    max-width: 500px;
    width: 100%;
    padding-top: 49px;
}

#app {
    overflow-x: hidden;
    min-height: 100vh;
    padding-bottom: 50px;
}

a  {
    color: black
}

`

export default GlobalStyles
