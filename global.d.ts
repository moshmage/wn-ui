import { MetaMaskInpageProvider } from "@metamask/providers";
import {DappeteerPage} from "@chainsafe/dappeteer/dist/page";
import {DappeteerBrowser} from "@chainsafe/dappeteer/dist/browser";
import {Dappeteer} from "@chainsafe/dappeteer";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}