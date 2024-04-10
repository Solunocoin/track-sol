import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import Token24hVolume from '../../Server/Token24hVolume/Token24hVolume';
import TokenHolders from '../../Server/TokenHolders/TokenHolders';
import TokenLiquidity from '../../Server/TokenLiquidity/TokenLiquidity';
import TokenDetailsContainer from '../TokenDetailsContainer/TokenDetailsContainer';
import styles from './TokenMoreDetails.module.scss';

const TokenMoreDetails = async ({ tokenAddress }: ITokenInfo) => {
  return (
    <TokenDetailsContainer innerClassName={styles.tokenMoreDetails}>
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
            <TokenLiquidity tokenAddress={tokenAddress} />
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
            <Token24hVolume tokenAddress={tokenAddress} />
          </Suspense>
        </div>
      </div>
    </TokenDetailsContainer>
  );
};

export default TokenMoreDetails;
