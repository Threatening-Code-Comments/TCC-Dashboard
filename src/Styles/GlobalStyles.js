import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #FFFC;
  }
  button {
    cursor: pointer;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 10px;
  }
  h1 {
    font-size: 40px;
  }
  .card {
    padding: 15px 20px;
    border-radius: 15px;
    width: auto;
    display: inline-block;
  }
  .glassParent {
    background: inherit;
  }
  .glass {
    position: relative;
    background: inherit;
    overflow: hidden;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.1);
  }
  .glass > * {
    position: relative;
    z-index: 10;
  }
  .glass::before {
    content: " ";
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: inherit; 
    position: absolute;
    left: -10px;
    right: 10px;
    top: -10px;
    bottom: 10px;
    box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.125);
    filter: blur(5px);
  }
  .iconButton {
    color: #FFFC;
    font-size: 30px;
  }
  .button {
    margin-bottom: 10px;
    padding: 10px 20px;
    border: none;
    outline: none;
    border-radius: 10px;
    color: #FFFC;
		transition: all 200ms ease-out;
  }
  .button:hover {
    transform: translateY(-1px);
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default GlobalStyle;