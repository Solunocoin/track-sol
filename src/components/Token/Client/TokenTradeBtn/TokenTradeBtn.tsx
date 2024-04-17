import styles from "./TokenTradeBtn.module.scss";

const TokenTradeBtn = ({tokenBestPair }: ITokenTradeBtn) => {
  const jupiterLink = `https://jup.ag/swap/${tokenBestPair.quoteToken.address}-${tokenBestPair.baseToken.address}`;

  return (
    <a
      className={`${!tokenBestPair ? styles.tokenTradeBtnDisabled : ""} ${
        styles.tokenTradeBtn
      } `}
      href={tokenBestPair ? jupiterLink : undefined}
      target="_blank"
    >
      Trade
    </a>
  );
};

export default TokenTradeBtn;
