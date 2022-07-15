import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    /* http://meyerweb.com/eric/tools/css/reset/ 
    v2.0 | 20110126
    License: none (public domain)
    */

    body {
        margin: 0;
        padding: 0;
        border: 0;
        font-family: 'Raleway', sans-serif;
    }
    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyles;