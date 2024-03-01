import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, foundry,arbitrum } from 'wagmi/chains'

export const config = createConfig({
  chains: [sepolia,arbitrum],
  transports: {
    [sepolia.id]: http(),
    [arbitrum.id]: http()
  },
})