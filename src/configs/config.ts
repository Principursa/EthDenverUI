import { http, createConfig } from 'wagmi'
import {sepolia,arbitrum } from 'wagmi/chains'

export const config = createConfig({
  chains: [sepolia,arbitrum],
  transports: {
    [sepolia.id]: http(),
    [arbitrum.id]: http()
  },
})