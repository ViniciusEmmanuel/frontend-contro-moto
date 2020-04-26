import { createGlobalStyle } from 'styled-components';

const globalstyles = createGlobalStyle`

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    --primary: #018fe1;

  }

  html,
  body,
  #root{
    width: 100%;
    height: 100%;
  }

  body{
    font: 400 14px Roboto, sans-serif;
    background: #f0f0f5;
  }

  input, button, textarea{
    font: 400 18px Roboto, sans-serif;
  }

  a, button {
    background: none;
    cursor: pointer;
  }
`;

export default globalstyles;
