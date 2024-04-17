import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TokenDataInfo from "../../Server/TokenInfoData/TokenInfoData";
import styles from "./TokenInfo.module.scss";

const TokenInfo = ({ tokenAddress, tokenBestPair }: ITokenInfo) => {
  return (
    <div className={styles.tokenInfoWrapper}>
      <div>
        <h2>Token Info</h2>
      </div>

      <div className={styles.tokenInfoDataWrapper}>
        <Suspense fallback={<Skeleton height="100%" width="100px" />}>
          <TokenDataInfo
            tokenAddress={tokenAddress}
            tokenBestPair={tokenBestPair}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default TokenInfo;
