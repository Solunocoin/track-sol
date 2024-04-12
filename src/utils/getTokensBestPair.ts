type GetTokensBestPairType = {
  data: TokenDetailsType | null;
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

    const data: TokenDetailsResponseType = await response.json();

    if (data.pairs === null || data.pairs.length === 0) {
      return {
        data: null,
        error: {
          message: 'No pairs found for this token',
        },
      };
    }

    const pairs: TokenDetailsType[] = data.pairs;

    const bestPair = pairs.reduce((prev, current) => {
      return prev.liquidity.usd > current.liquidity.usd ? prev : current;
    });

    return {
      data: bestPair,
      error: null,
    };
  } catch (error) {
    throw new Error('Error fetching dex screener data');
  }
};

export default getTokensBestPair;
