import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

interface CardProps {
  title: string;
  date: string;
  slug: string;
  language?: string;
}

const Wrapper = styled.section`
  width: 43.333%;
  min-height: 105px;
  background-color: #FFFFFF;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  padding: 10px;
`

const Title = styled.h2`
  color: #8338EC;
  font-size: 18px;
  margin: 0;
  padding: 0;
`

export function Card ({ title, slug, date, language = "pt-BR" }: CardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Wrapper>
        <Title>{title}</Title>
      </Wrapper>
    </Link>
  )
}
