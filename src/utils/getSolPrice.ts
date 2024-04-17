export async function getSolPrice() {
  const url =
    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true';
  const response = await fetch(url);
  const data = await response.json();
  const price = data.solana.usd; // Price of Solana in USD
  const change24h = data.solana.usd_24h_change; // 24h price change percentage of Solana

  return { price, change24h };
}
