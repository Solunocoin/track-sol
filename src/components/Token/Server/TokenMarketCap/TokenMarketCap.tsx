import formatNumber from '@/utils/formatNumber';
import getTokensBestPair from '@/utils/getTokensBestPair';
import { PublicKey } from '@solana/web3.js';
import { createConnectionWithRetry } from '../../../../../lib/solana';

const TokenMarketCap = async ({ tokenAddress }: ITokenMarketCap) => {
  const connection = await createConnectionWithRetry();

  const supply = await connection.getTokenSupply(new PublicKey(tokenAddress));

  const bestPairRes = await getTokensBestPair(tokenAddress);
  const bestPair = bestPairRes?.data;

  const totalSupply = supply.value.uiAmount;

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
