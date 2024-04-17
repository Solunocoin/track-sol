import formatNumber from "@/utils/formatNumber";
import styles from "./TokenLiquidity.module.scss";

const TokenLiquidity = ({tokenBestPair}: ITokenLiquidity) => {
  const liquidity = tokenBestPair.liquidity.usd;
  return (
    <h4 className={styles.tokenLiquidity}>
      {liquidity ? formatNumber(Number(liquidity), 3) : "Not launched"}
    </h4>
  );
};

export default TokenLiquidity;
