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
