import styles from './TokenTradeBtn.module.scss';

const WalletTokenTradeBtn = async ({
  baseToken,
  quoteToken,
}: IWalletTokenTradeBtn) => {
  const jupiterLink = `https://jup.ag/swap/${quoteToken}-${baseToken}`;

  return (
    <a className={styles.tokenTradeBtn} href={jupiterLink} target="_blank">
      Trade
    </a>
  );
};

export default WalletTokenTradeBtn;
