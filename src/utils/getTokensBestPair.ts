type GetTokensBestPairType = {
  data: DexScreenerPairType | null;
  error: {
    message: string;
  } | null;
};

const getTokensBestPair = async (
  tokenAddress: string,
): Promise<GetTokensBestPairType> => {
  try {
    
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
      {
        cache: 'no-cache',
      },
    );

    const data: DexScreenerResponseType = await response.json();

    console.log('data', data);

    if (data.pairs === null || data.pairs.length === 0) {
      return {
        data: null,
        error: {
          message: 'No pairs found for this token',
        },
      };
    }

    const pairs: DexScreenerPairType[] = data.pairs;

    const bestPair = pairs.reduce((prev, current) => {
      return prev?.liquidity?.usd < current?.liquidity?.usd ? current : prev;
    });

    return {
      data: bestPair,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        message: 'Error in retrieving best pair from dexScreener',
      },
    };
  }
};

export default getTokensBestPair;
