import axios from 'axios';

interface TokenPriceResponse {
  data: {
    value: number;
    updateUnixTime: number;
    updateHumanTime: string;
    liquidity: number;
  };
  success: boolean;
}

export default async function getTokenPrice(
  tokenAddress: string,
): Promise<number | null> {
  try {
    const BIRD_EYE_KEY = process.env.BIRD_EYE_KEY; // Replace 'YOUR_API_KEY' with your actual API key
    const url = `https://public-api.birdeye.so/defi/price?check_liquidity=1000.25&include_liquidity=true&address=${tokenAddress}`;
    const headers = {
      Accept: 'application/json',
      'x-chain': 'solana',
      'X-API-KEY': BIRD_EYE_KEY,
    };

    const response = await axios.get<TokenPriceResponse>(url, { headers });
    // console.log(response);
    if (response.data.success) {
      return response.data.data.value;
    } else {
      console.error('Failed to fetch token price:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
}
