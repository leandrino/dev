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
  width: 100%;
  min-height: 135px;
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

const Infos = styled.div`
  width: 100%;
`

const Date = styled.span`
  color: #FF006E;
  font-size: 12px;
  font-weight: 700;
`

export function Card ({ title, slug, date, language = "pt-BR" }: CardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Wrapper>
        <Title>{title}</Title>
        <Infos>
          <Date>{date}</Date>
        </Infos>
      </Wrapper>
    </Link>
  )
}
