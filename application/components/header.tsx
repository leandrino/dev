import Link from "next/link";
import styled from "styled-components";
import { Theme } from "../layout/Basic";
import { Logo } from "./logo";

const Wrap = styled.nav`
  background-color: ${({ theme }: { theme: Theme }) => theme.headerBackground};
  border-radius: 0 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
`

const LinkWarp = styled.div`
  font-weight: 700;
  
  && > a:not(:last-child) {
    margin-right: 16px;
  }
`

export function Header() {
  return (
    <Wrap>
      <Logo />
      <LinkWarp>
        <Link href="/about">ABOUT</Link>
        <Link href="/">STORIES</Link>
      </LinkWarp>
    </Wrap>
  )
}
