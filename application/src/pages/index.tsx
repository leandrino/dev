import React from "react";
import styled from 'styled-components';
import BasicLayout, { Theme } from "../ui/Basic";
import { Container } from "../components/layout/container";
import { Header } from "../components/surfaces/header";
import { Card } from "../components/surfaces/card";

const Title = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.title};
  font-weight: 900;
  margin: 30px 16px;
  text-transform: uppercase;
`
const Stories = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 20px;
  padding: 0 16px;
  row-gap: 20px;

  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`

function IndexPage(props: any) {
  return (
    <BasicLayout>
      <Header />
      <Container>
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
    })
    .sort((a: any,b: any) => 0 - (a.order > b.order ? 1 : -1));

  // By returning { props: blogs }, the IndexPage component
  // will receive `blogs` as a prop at build time
  // desc values.sort((a,b) => 0 - (a > b ? 1 : -1));
  
  return {
    props: { blogs },
  };
}

export default IndexPage;
