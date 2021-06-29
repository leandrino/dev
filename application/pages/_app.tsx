import { AppProps } from 'next/app'
import Head from 'next/head'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/atom-one-dark.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700&display=swap"
              rel="stylesheet" />
        <title>Leandro</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
