import { Connection } from '@solana/web3.js';

export const solana = new Connection(
  `https://solana-mainnet.api.syndica.io/api-token/${process.env.NEXT_PUBLIC_SYNDICA_API_KEY}`,
);
