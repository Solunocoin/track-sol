import formatNumber from '@/utils/formatNumber';
import getTokensBestPair from '@/utils/getTokensBestPair';
import styles from './TokenLiquidity.module.scss';

const TokenLiquidity = async ({ tokenAddress }: ITokenHolders) => {
  const bestPairRes = await getTokensBestPair(tokenAddress);
  const bestPair = bestPairRes?.data;

  const liquidity = bestPair?.liquidity?.usd;

  return (
    <h4 className={styles.tokenLiquidity}>
      {liquidity ? formatNumber(Number(liquidity), 3) : 'Not launched'}
    </h4>
  );
};

export default TokenLiquidity;
