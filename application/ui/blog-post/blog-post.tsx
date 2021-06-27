import React from "react";
import BasicLayout from "../Basic";
import { Container } from "../../components/layout/container";
import { Content } from './styles';

export function BlogPost(props: any) {
  return (
    <BasicLayout>
      <Container>
        <h1>{props.blog.title}</h1>
        <Content dangerouslySetInnerHTML={{ __html: props.blog.content }} />
      </Container>
    </BasicLayout>
  );
}
