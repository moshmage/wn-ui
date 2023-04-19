import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Web3EffectsProvider} from "@/contexts/web3-effects";

export default function App({ Component, pageProps }: AppProps) {
  return <Web3EffectsProvider><Component {...pageProps} /></Web3EffectsProvider>
}
