---
title: React Testing Library e Hooks Assincronos
slug: react-testing-library-e-hooks-assincronos
date: "04-23-2021"
order: 1
---

Venho trabalhando há algum tempo com React, hooks e React Testing Library e observando alguns equívocos quanto a solução de testes unitários em hooks. Na maioria das vezes, as dificuldades encontrada nestes testes estão no entendimento da nova api, o que é comum, já que temos uma mudança de pensamento, em uma biblioteca popular e livre, onde permite times performar de formas diferentes ao longo dos projetos. Certo, este artigo terá algumas (ou muitas) visões pessoais sobre projetos e aplicações React, não leve tudo como verdade absoluta, deixarei referências ao final, para conseguir pesquisar e tirar suas próprias conclusões.

## Entendendo um pouco sobre a nova API

Farei uma passagem superficial sobre alguns recursos e funções desta “nova”(em aspas porque faz um bom tempo que foi lançada) API. Começarei pelos Hooks, que nos traz a possibilidade de conectar recursos do React em uma função, isso nos abre uma enorme porta de oportunidades, e também de desafios, uma vez que essa conexões podem ser intermináveis, e possivelmente gerar um problema de emaranhamento de código insustentável, sugiro pensar em um sistema de arquivos que faça muito sentido para aplicação, particularmente, em aplicações que utilizam rest, organizo via containers, componentes (estes em sua maioria styled), hooks, rotas, contextos.

Para ajudar a entender um pouco desse mundo dos hooks, vou trazer um exemplo que em uma só oportunidade, nos dará useState, useCallback e useEffect em um único hook:

```JS
const useAsync = (asyncFunction, immediate = true) => {
  const [pending, setPending] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
    const handleExecute = useCallback(() => {
    setPending(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then(response => setValue(response))
      .catch(error => setError(error))
      .finally(() => setPending(false));
  }, [asyncFunction]);
.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [handleExecute, immediate]);

  return { handleExecute, pending, value, error };
};
```

O hook useState, será o responsável por prover um estado do react para nós, além do estado ele prove uma função para modificarmos o valor deste estado em caso de necessidade. Teremos também o hook useCallback, que retornará uma versão memorizada de seu retorno, neste caso é uma promise, esse processo de memorizar seu retorno impede que seja realizada renderizações desnecessárias, pois só irá trocar o retorno do useCallback, se a promise, neste caso, for alterada. Este assunto pode ser um pouco confuso, para entender, você precisa saber que sempre que uma ação é tomada, por exemplo, atualizo meu estado, mesmo que o valor do seu retorno, seja igual ao anterior, o react vai efetuar o re-render desse estado, para que isso não ocorra, devemos aplicar a técnica de memoize (memorizar), assim, evitaremos que o mesmo valor, seja re-renderizado sem necessidade alguma. E por último, teremos o useEffect, que funciona, por exemplo, como o componenteDidMout(), que irá ser executado na primeira renderização, e depois, ele será executado, se uma dependência ou mais for alterada, neste caso handleExecute e ou immediate.

Fixado esses conceitos, vamos partir agora ao nosso teste unitário, que também precisaremos saber alguns conceitos, antes de aplicá-lo.

## Entendendo sobre testes unitários

Quero passar rapidamente por alguns conceitos antes de iniciar a implementação do teste unitário deste hook. Em primeiro lugar, vamos entender um pouco sobre teste unitário, ele tem por objetivo, testar de forma isolada a unidade em questão, parece óbvio, mas em muitos projetos, nos deparamos com testes extremamente complexos, de integração, se passando de testes unitários. A questão principal, é que estamos focados em testar apenas as implementações de nosso método ou componente, não as implementações de nossas dependências, estas, deveriam estar devidamente cobertas por seus próprios testes unitários.

Sabendo o que é unidade, podemos resolver esse “problema” que as dependência nos deixaram, a solução é utilizarmos as técnicas de mock, spy e stub, ou simplesmente Test Double, existem ótimos artigos aprofundando sobre este tema, quero extrair apenas o básico, para entendermos na prática como e quando utilizarmos cada um deles.

O termo test double é utilizado quando queremos substituir algo com um custo maior do que precisamos para executarmos determinada tarefa, por exemplo, quando substituímos uma API rest para desenvolvimento do frontend, por um db.json da vida, ou serviços semelhantes ao mocky.io, pelo motivo de ainda não termos a api principal, ou apenas o custo de subir todo o ambiente do backend para acessarmos determinada api, em ambientes de testes. Nos testes unitários, pensamos da mesma forma, como o objetivo é testar a unidade, queremos ter o controle total sob nossas dependências, definir o que cada dependência retorna para podermos criar nossos cenários de testes, por este motivo substituímos os objetos de produção para fins de testes.

O termo Mock, spy e stub, considero uma subdivisão do termo Test Double, eles possibilitam ao sistema observar a função que está sendo substituída, e também substituir a implementação original. O mock fica encarregado de substituir a implementação original do objeto mockado, a fim de ter exatamente o comportamento esperado. O Stub emite respostas pré definidas quanto os spies, registram informações de como foram chamados, nos três casos, conseguimos identificar se foram chamados.

No jest (ferramenta que vem sendo a mais usada no universo JavaScript) temos este ambiente fechado, possuindo ferramentas para asserção, mock e spy/stub em uma só dependência, a segunda ferramenta mais utilizada, vem sendo o conjunto mocha, chai e sinon, onde o mocha trabalha como a ferramenta de testes, o chai a ferramenta responsável pelas asserções e o sinon responsável pelos mocks e stubs. Neste artigo vou utilizar o Jest, por estar mais familiarizado, porém vou deixar um link de um projeto que utilizou mocha, chai e sinon, para efeito de comparação.

## Testando o hook

Como primeiro passos, podemos definir os cenários que precisamos garantir com este hook, eu imaginei três cenários básicos que o componente deve fazer:

- Executar a função e trazer os dados com sucesso;
- Executar a função e trazer os dados com erro; e
- Executar a função no carregamento do componente.

Podemos ter mais cenários, separados, porém, todas as funções deste hook, serão testadas nestes três passos, fazendo asserções conforme o fluxo da informação for processando. Veja como ficou nosso teste:

```JS
import useAsync from "./useAsync";
import {renderHook, act} from "@testing-library/react-hooks";

describe('useAsync unit test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('should return successfully response', async () => {
    const asyncFunction = jest.fn().mockResolvedValue({ prop: 1 })

    const { result, waitForNextUpdate } = renderHook(() => useAsync(asyncFunction, false));

    act(() => {
      result.current.execute()
    })

    expect(result.current.pending).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.value).toEqual({ prop: 1 });
    expect(result.current.error).toBeNull();
    expect(result.current.pending).toBeFalsy();
  });

  it('should return error response', async () => {
    const asyncFunction = jest.fn().mockRejectedValue({ message: 'error' })

    const { result, waitForNextUpdate } = renderHook(() => useAsync(asyncFunction, false));

    act(() => {
      result.current.execute()
    })

    expect(result.current.pending).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.value).toBeNull();
    expect(result.current.error).toEqual({"message": "error"});
    expect(result.current.pending).toBeFalsy();
  });

  it('should immediate execute my async function', async () => {
    const asyncFunction = jest.fn().mockResolvedValue({ prop: 1 })

    const { result, waitForNextUpdate } = renderHook(() => useAsync(asyncFunction));
    expect(result.current.pending).toBeTruthy();

    await waitForNextUpdate();

    expect(result.current.value).toEqual({ prop: 1 });
    expect(result.current.error).toBeNull();
    expect(result.current.pending).toBeFalsy();
  });

});
```

Podemos separar o que utilizamos nos testes, diferentes:

- jest.fn().mockResolvedValue
- renderHook()
- act()
- waitForNextUpdate()

Nosso hook, recebe um callback assíncrono, por este motivo, criei uma função para fazer este trabalho, ela é uma jest function, onde podemos utilizar um pacote de ferramentas que ela nos fornece, neste caso, utilizei o método mockResolvedValue, que passando um argumento para ela, retorna como uma promise.

O renderHook() faz parte da suíte de ferramentas do react-testing-library/react-hooks, instalada a parte em conjunto com a biblioteca react-test-renderer, que fornecerá a possibilidade de manipularmos o ciclo de vida de nosso hook, onde ele substituirá a necessidade de criarmos um componente react para envolver nosso hook. O retorno que utilizamos foi o result, que é responsável por fornecer os dados do retorno de nosso render, este retorno utilizamos para fazer asserções e/ou chamar métodos internos a fim de testar seu comportamento.

Quando precisamos simular o mais próximo possível o comportamento que o React tem dentro do browser, utilizamos o método act, ele prepara o componente para asserções, atua como definindo um espaço no tempo, para que possamos executar ações, como cliques, ou mesmo neste caso, efetuando uma chamada de um método.

Finalmente vamos ver como trabalhamos com os dados assíncronos de nossa aplicação, neste caso, utilizei waitForNextUpdate, este método tem como finalidade resolver a próxima renderização do hook ou seja, atualizará os estados após uma chamada assíncrona, em alguns testes, o jest.runAllTimers() dentro de um act(), também executa as funções assíncronas, mas fica para um próximo artigo sua funcionalidade. Após a execução do waitForNextUpdate, podemos considerar as asserções, após a execução de uma chamada assíncrona, ou seja, os dados que seriam atualizados após a chamada assíncrona retornar, estarão devidamente atualizados. Com isso, podemos entender que conseguimos fazer asserções antes da execução waitForNextUpdate, esperando receber os estados sem atualização, e fazer asserções após a execução do waitForNextUpdate, eperando receber os estados atualizados.

## Conclusão

Este artigo foi criado com a intenção de conseguir entender melhor como funciona o teste de um hook, bem específico, mas que normalmente aplica-se à vários cenários, podendo ser replicada essa técnica. A busca constante em melhorarmos nossos testes, ambientes e código, deve ser mantida, e os pensamentos e execuções que apliquei neste artigo, podem mudar, mas tentei reproduzir uma experiência que tive no mundo real que ajudou diretamente na forma em que escrevo meus hooks e também os testo. Pontos de observação ficam em performance e complexidade ciclomática de um hook, isso pode tornar uma dor muito grande, ao realizar um teste.

## Referências

- [https://react-hooks-testing-library.com/reference/api#async-utilities](https://react-hooks-testing-library.com/reference/api#async-utilities)
- [https://martinfowler.com/bliki/TestDouble.html](https://martinfowler.com/bliki/TestDouble.html)
- [https://designer.mocky.io/](https://designer.mocky.io/)
- [https://jestjs.io/docs/en/mock-function-api](https://jestjs.io/docs/en/mock-function-api)
- [https://jestjs.io/docs/en/timer-mocks](https://jestjs.io/docs/en/timer-mocks)
- [https://github.com/testing-library/react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)
- [https://usehooks.com/](https://usehooks.com/)
