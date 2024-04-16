import formatNumber from '@/utils/formatNumber';
import getTokenPrice from '@/utils/getTokenPrice';
import getTokensBestPair from '@/utils/getTokensBestPair';

const TokenMarketCap = async ({
  tokenAddress,
  totalSupply,
}: ITokenMarketCap) => {
  let content;
  const bestPairRes = await getTokensBestPair(tokenAddress);
  
  if (bestPairRes?.data) {
    const bestPair = bestPairRes.data;
    const marketCap = Number(totalSupply) * parseFloat(bestPair.priceUsd);
    content = formatNumber(Number(marketCap), 3);
  } else {
    const priceRes = await getTokenPrice(tokenAddress);
    if (priceRes) {
      const marketCap = Number(totalSupply) * priceRes;
      content = formatNumber(Number(marketCap), 3);
    } else {
      content = 'Not launched';
    }
  }

  return <h4>{content}</h4>;
};

export default TokenMarketCap;
