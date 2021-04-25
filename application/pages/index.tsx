import React from "react";
import Link from "next/link";
import styled from 'styled-components';
import BasicLayout, { Theme } from "../layout/Basic";
import { Logo } from "../components/logo";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { Card } from "../components/card";

const Title = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.title};
  font-weight: 900;
  margin: 30px 16px;
  text-transform: uppercase;
`
const Stories = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  padding: 0 16px;
`

function IndexPage(props: { blogs: { id: React.Key | null | undefined; slug: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }[]; }) {
  return (
    <BasicLayout>
      <Container>
        <Header />
        <Title>Stories</Title>
        <Stories>
          {props.blogs.map((blog: any) => {
            return (
              <Card 
                key={blog.id}
                title={blog.title}
                date={blog.date}
                slug={blog.slug}
              />
            );
          })}
        </Stories>
      </Container>
    </BasicLayout>
  );
}

// This function gets called at build time on server-side.
export async function getStaticProps() {
  const fs = require("fs");
  const matter = require("gray-matter");
  const { v4: uuid } = require("uuid");

  const files = fs.readdirSync(`${process.cwd()}/contents`, "utf-8");

  const blogs = files
    .filter((fn: string) => fn.endsWith(".md"))
    .map((fn: any) => {
      const path = `${process.cwd()}/contents/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });
      const { data } = matter(rawContent);

      return { ...data, id: uuid() };
    });

    // By returning { props: blogs }, the IndexPage component
  // will receive `blogs` as a prop at build time
  return {
    props: { blogs },
  };
}

export default IndexPage;
