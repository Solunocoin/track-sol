import formatNumber from '@/utils/formatNumber';
import { PublicKey } from '@solana/web3.js';
import { createConnectionWithRetry } from '../../../../../lib/solana';

const TokenSupply = async ({ tokenAddress }: ITokenSupply) => {
  const connection = await createConnectionWithRetry();

  let totalSupply;
  try {
    const supply = await connection.getTokenSupply(new PublicKey(tokenAddress));
    totalSupply = supply.value.uiAmount;
  } catch (error) {
    console.log('Supply Error', error);
  }

  return <h4>{formatNumber(Number(totalSupply), 3)}</h4>;
};

export default TokenSupply;
