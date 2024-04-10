interface ITokenDetails {
  tokenAddress: string;
}

interface TokenDetailsResponseType {
  schemaVersion: string;
  pairs: TokenDetailsType[] | null;
}

interface TokenDetailsType {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: EToken;
  quoteToken: EToken;
  priceNative: string;
  priceUsd: string;
  txns: Txns;
  volume: PriceChange;
  priceChange: PriceChange;
  liquidity: Liquidity;
  fdv: number;
  pairCreatedAt: number;
  info: Info;
}

interface EToken {
  address: string;
  name: string;
  symbol: string;
}

interface Info {
  imageUrl: string;
  websites: any[];
  socials: Social[];
}

interface Social {
  type: string;
  url: string;
}

interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

interface PriceChange {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface Txns {
  m5: H1;
  h1: H1;
  h6: H1;
  h24: H1;
}

interface H1 {
  buys: number;
  sells: number;
}
