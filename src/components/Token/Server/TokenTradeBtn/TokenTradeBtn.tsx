import getTokensBestPair from '@/utils/getDexScreenerTokenData';
import styles from './TokenTradeBtn.module.scss';

const TokenTradeBtn = async ({ tokenAddress }: ITokenHolders) => {
  const bestPairRes = await getTokensBestPair(tokenAddress);
  const bestPair = bestPairRes?.data;

  const jupiterLink = `https://jup.ag/swap/${bestPair?.quoteToken?.address}-${bestPair?.baseToken?.address}`;

  return (
    <a
      className={`${!bestPair ? styles.tokenTradeBtnDisabled : ''} ${
        styles.tokenTradeBtn
      } `}
      href={bestPair ? jupiterLink : undefined}
      target="_blank"
    >
      Trade
    </a>
  );
};

export default TokenTradeBtn;
