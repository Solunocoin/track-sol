import formatNumber from "@/utils/formatNumber";
import styles from "./TokenLiquidity.module.scss";
import { W_SOLANA_ADDRESS } from "@/global";

const TokenLiquidity = ({ tokenBestPair }: ITokenLiquidity) => {
  const liquidity = tokenBestPair.liquidity.usd;
  return (
    <h4 className={styles.tokenLiquidity}>
      {tokenBestPair.baseToken.address === W_SOLANA_ADDRESS
        ? "Not available"
        : liquidity
        ? `$${formatNumber(Number(liquidity), 3)}`
        : "Not launched"}
    </h4>
  );
};

export default TokenLiquidity;
