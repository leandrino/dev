import styled from "styled-components";
import { Theme } from "../Basic";

export const Content = styled.section`
  margin: 20px;
  
  & > pre > code {
    margin: 20px;
    border-radius: 8px;
  }

  & > p {
    color: #dbdbdb;
    line-height: 1.6;
  }

  & > h2, h3, h4, h5, h6 {
    color: ${({ theme }: { theme: Theme }) => theme.title}
  }
`

export const Title = styled.h1`
  margin: 20px;
  color: ${({ theme }: { theme: Theme }) => theme.title}
`

export const Divider = styled.hr`
  background: rgb(228,14,61);
  background: linear-gradient(45deg, #e62b54 0%, #8f07b1 45%, #3672e2 75%);
  border-radius: 10px;
  border: none;
  height: 8px;
  margin: 0 20px;
  width: 100px;
`
