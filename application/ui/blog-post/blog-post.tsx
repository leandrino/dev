import React from "react";
import BasicLayout from "../Basic";
import { Container } from "../../components/layout/container";
import { Content, Title, Divider } from './styles';

export function BlogPost(props: any) {
  return (
    <BasicLayout>
      <Container>
        <Title>{props.blog.title}</Title>
        <Divider />
        <Content dangerouslySetInnerHTML={{ __html: props.blog.content }} />
      </Container>
    </BasicLayout>
  );
}
