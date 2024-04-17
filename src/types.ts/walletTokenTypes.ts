interface WalletTokenType {
  address: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  balance: number;
  value: number;
  priceChange: DexScreenerPriceChangeType;
  quoteToken: DexScreenerETokenType;
}
