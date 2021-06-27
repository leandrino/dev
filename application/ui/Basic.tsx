import React from "react";
import { createGlobalStyle, ThemeProvider  } from "styled-components";

export interface Theme {
  body: string;
  text: string;
  title?: string;
  headerBackground?: string;
  link?: string;
  linkHover?: string;
}

const genericColors = {
  title: '#FFBE0B',
  headerBackground: '#FFBE0B',
  link: '#3A86FF',
  linkHover: '#FB5607',
}

export const lightTheme: Theme = {
  ...genericColors,
  body: '#FFFFFF',
  text: '#0E141B',
}

export const darkTheme: Theme = {
  ...genericColors,
  body: '#0E141B',
  text: '#FFFFFF',
}

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

body {
  background-color: ${({ theme }: { theme: Theme }) => theme.body};
  color: ${({ theme }: { theme: Theme }) => theme.text};
}

a {
  color: ${({ theme }: { theme: Theme }) => theme.link};
  text-decoration: none;
}

a:hover {
  color: ${({ theme }: { theme: Theme }) => theme.linkHover};
}
`;

const BasicLayout = ({ children }: { children: any }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider >
  );
};

export default BasicLayout;
