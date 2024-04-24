
export async function getCoinGeckoSolanaData() {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true';
  const response = await fetch(url, {
    cache: 'no-cache',
  });
  const solanaData : CoinGeckoSolanaType  = await response.json();
  // const price = data.solana.usd; // Price of Solana in USD
  // const change24h = data.solana.usd_24h_change; // 24h price change percentage of Solana
  // const vol24h = data.solana.usd_24_vol;
  console.log("!@#!@#",solanaData);
  return solanaData;
}
