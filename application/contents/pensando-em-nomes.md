---
title: Pensando em nomes...
slug: pensando-em-nomes
date: "06-21-2017"
order: 1
---

Há pouco comecei a ler Clean Code de Robert Cecil Martin, e em suas primeiras páginas já percebo que este conhecimento fará diferença no meu código a partir deste momento.

Para fixar a idéia resolvi escrever posts conforme existir progressão na leitura do livro, é algo pessoal, que possivelmente utilizarei no dia a dia para consultas.

## Nomes — Noções gerais

A primeira regra que gosto de seguir é a do contexto, os exemplos do livro são bem legais para termos esta ideia da importância do contexto ao nomear uma variável, método ou objeto.

No geral, além de mantermos os nomes dentro do contexto, deixar explícito sua utilização é fundamental, para isto podemos contar com termos da informática, nomes de algoritmos, nome de padrões, termos matemáticos … A justificativa vem no livro:

> It is not wise to draw every name from the problem domain because we don’t want our coworkers to have to run back and forth to the customer asking what every name means when they already know the concept by a different name.

Cuidado em nomear abusando do contexto, um exemplo abordado é do `accountAddress` , para uma instância estaria ok, mas para uma classe `address` faz mais sentido, pensando em seu reuso, simples e direto.

### Variáveis

As variáveis precisam nos dizer sua finalidade, de forma clara e objetiva simulando um contexto de Data, podemos ter `day`, `week`, `month`, `year`… Podemos utilizar algum contexto, conforme a necessidade de deixarmos claro a sua finalidade como `initialDay` , que trataremos o dia inicial de algo. Seguindo essas regras teremos a possibilidade de pesquisar variáveis de forma fácil e compreenderemos o seu contexto.

### Classes e Objetos

Classes esperam ser algum adjetivo, como `customer`, `address`, `service`, `addressParser`… ela não espera ser um verbo.

### Funções

Estes já esperam ter um verbo ou frase com a ação, como `createPage`, `postPayment`, `save` … já que esperamos alguma ação.

## Conclusão

Acredito que estas dicas possam ajudar mais pessoas, eu confesso que tive dificuldades de entender todo este universo de código limpo, e precisava de algo um pouco mais prático, o livro foi uma excelente aquisição, aprofunda no tema e nos dá uma visão mais analítica da forma como escrevemos, mas apenas a prática, o dia a dia, é quem irá nos preparar de verdade para uma boa escrita.
