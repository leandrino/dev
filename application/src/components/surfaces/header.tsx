import Link from "next/link";
import styled from "styled-components";
import { Theme } from "../../ui/Basic";
import { Logo } from "../images/logo";

const Wrap = styled.nav`
  align-items: center;
  background-color: ${({ theme }: { theme: Theme }) => theme.headerBackground};
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 16px;
  width: 100%;
`

const LinkWarp = styled.div`
  font-size: 18px;
  font-weight: 900;

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
