import React from "react";
import Link from "next/link";
import styled from 'styled-components';
import BasicLayout from "../layout/Basic";

const Title = styled.h1`
  color: purple;
`

function IndexPage(props: { blogs: { id: React.Key | null | undefined; slug: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }[]; }) {
  return (
    <BasicLayout>
      <Title>Blog list</Title>
      <ul>
        {props.blogs.map((blog: { id: React.Key | null | undefined; slug: any; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }, idx: any) => {
          return (
            <li key={blog.id}>
              <Link href={`/blog/${blog.slug}`}>
                <a>{blog.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
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