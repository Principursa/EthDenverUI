import { http } from 'wagmi'
import { sepolia } from 'wagmi/chains'

import { getDefaultConfig } from '@rainbow-me/rainbowkit';


export const config = getDefaultConfig({
  appName: "Twine",
  projectId: 'b17dfb75dcaf111070742d4a6cbf0c5b',
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})