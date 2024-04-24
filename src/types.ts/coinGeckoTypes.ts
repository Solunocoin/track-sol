interface CoinGeckoSolanaType {
    solana: Solana;
}

interface Solana {
    usd:            number;
    usd_market_cap: number;
    usd_24h_vol:    number;
    usd_24h_change: number;
}
