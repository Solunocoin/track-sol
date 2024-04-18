import formatNumber from '@/utils/formatNumber';

const TokenMarketCap = ({ totalSupply, tokenBestPair }: ITokenMarketCap) => {
  const marketCap = Number(totalSupply) * parseFloat(tokenBestPair.priceUsd);
  let content = formatNumber(Number(marketCap), 3);

  return <h4>${content}</h4>;
};

export default TokenMarketCap;
