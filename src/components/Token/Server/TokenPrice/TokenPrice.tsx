import formatNumber from '@/utils/formatNumber';
import getTokensBestPair from '@/utils/getDexScreenerTokenData';

const TokenPrice = async ({ tokenAddress }: ITokenHolders) => {
  const bestPairRes = await getTokensBestPair(tokenAddress);
  const bestPair = bestPairRes?.data;

  let content;

  if (bestPair) {
    const tokenPrice = parseFloat(bestPair.priceUsd);
    content =
      tokenPrice < 1
        ? '$' + formatNumber(Number(tokenPrice), 10)
        : tokenPrice > 1
        ? '$' + formatNumber(Number(tokenPrice), 3)
        : '-';
  } else {
    content = 'Not launched';
  }

  return <h4>{content}</h4>;
};

export default TokenPrice;
