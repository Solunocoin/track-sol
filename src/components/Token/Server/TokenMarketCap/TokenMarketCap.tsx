import formatNumber from '@/utils/formatNumber';
import getTokensBestPair from '@/utils/getTokensBestPair';

const TokenMarketCap = async ({
  tokenAddress,
  totalSupply,
}: ITokenMarketCap) => {
  const bestPairRes = await getTokensBestPair(tokenAddress);
  const bestPair = bestPairRes?.data;

  let content;

  if (bestPair) {
    const marketCap = Number(totalSupply) * parseFloat(bestPair?.priceUsd);
    content = formatNumber(Number(marketCap), 3);
  } else {
    content = 'Not launched';
  }

  return <h4>{content}</h4>;
};

export default TokenMarketCap;
