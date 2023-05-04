import React from "react"
import Head from "next/head"
import {ThemeProvider} from "theme-ui"
import dynamic from "next/dynamic"
import {AppProps} from "next/app";

// import "nprogress/nprogress.css" //styles of nprogress
// import "normalize.css/normalize.css"
import "@solana/wallet-adapter-react-ui/styles.css"
import pkg from '../package.json';

import defaultTheme from "../styles/theme"

const WalletProvider = dynamic(
  () => import("../components/WalletProvider/WalletProvider"),
  {
    ssr: false,
  }
)

function App(props: AppProps) {
  const {Component, pageProps} = props

  // const [colorMode, setColorMode] = useColorMode()

  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Sensei Labs - Unstake</title>
        {/** Load font styles directly on the document to prevent flashes */}
        <link href="/fonts/fonts.css" rel="stylesheet"/>
      </Head>

      <div style={{display: 'none'}}>{pkg?.version}</div>

      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ThemeProvider>
  )
}

export default App;
