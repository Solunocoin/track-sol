import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import TokenHolders from '../../Server/TokenHolders/TokenHolders';
import Token24hVolume from '../Token24hVolume/Token24hVolume';
import TokenLiquidity from '../TokenLiquidity/TokenLiquidity';
import styles from './TokenMoreDetails.module.scss';

const TokenMoreDetails = ({
  tokenAddress,
  tokenBestPair,
}: ITokenMoreDetails) => {
  return (
    <div className={styles.tokenMoreDetails}>
      <div className={styles.tokenMoreDetailsInner}>
        <div>
          <h3>Holders</h3>
          <div className={styles.tokenMoreDetailsItemInner}>
            <Suspense fallback={<Skeleton height="100%" width="60%" />}>
              <TokenHolders tokenAddress={tokenAddress} />
            </Suspense>
          </div>
        </div>

        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h3>Liquidity</h3>

          <div className={styles.tokenMoreDetailsItemInner}>
            <Suspense fallback={<Skeleton height="100%" width="60%" />}>
              <TokenLiquidity tokenBestPair={tokenBestPair} />
            </Suspense>
          </div>
        </div>

        <div
          style={{
            textAlign: 'right',
          }}
        >
          <h3>24h Volume</h3>
          <div className={styles.tokenMoreDetailsItemInner}>
            <Suspense fallback={<Skeleton width="60%" />}>
              <Token24hVolume tokenBestPair={tokenBestPair} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenMoreDetails;
