interface DexScreenerResponseType {
  schemaVersion: string;
  pairs: DexScreenerPairType[] | null;
}

interface DexScreenerPairType {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: DexScreenerETokenType;
  quoteToken: DexScreenerETokenType;
  priceNative: string;
  priceUsd: string;
  txns: DexScreenerTxnsType;
  volume: DexScreenerPriceChangeType;
  priceChange: DexScreenerPriceChangeType;
  liquidity: DexScreenerLiquidity;
  fdv: number;
  pairCreatedAt: number;
  info: DexScreenerInfoType;
}

interface DexScreenerETokenType {
  address: string;
  name: string;
  symbol: string;
}

interface DexScreenerInfoType {
  imageUrl: string;
  websites: any[];
  socials: DesxScreenerSocials[];
}

interface DesxScreenerSocials {
  type: string;
  url: string;
}

interface DexScreenerLiquidity {
  usd: number;
  base: number;
  quote: number;
}

interface DexScreenerPriceChangeType {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface DexScreenerTxnsType {
  m5: DexScreenerH1Type;
  h1: DexScreenerH1Type;
  h6: DexScreenerH1Type;
  h24: DexScreenerH1Type;
}

interface DexScreenerH1Type {
  buys: number;
  sells: number;
}
