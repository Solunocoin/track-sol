export async function getCoinGeckoSolanaData() {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true';
  const response = await fetch(url, {
    cache: 'no-cache',
  });
  const solanaData: CoinGeckoSolanaResponseType = await response.json();

  return solanaData;
}
