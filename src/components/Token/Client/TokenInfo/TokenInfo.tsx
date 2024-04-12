import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import TokenDataInfo from '../../Server/TokenInfoData/TokenInfoData';
import styles from './TokenInfo.module.scss';

const TokenInfo = async ({ tokenAddress, reverse }: ITokenInfo) => {
  return (
    <div
      className={styles.tokenInfoWrapper}
      style={{
        marginBottom: reverse ? '0rem' : '1rem',
      }}
    >
      {!reverse && (
        <div>
          <h2>Token Info</h2>
        </div>
      )}

      <div
        className={styles.tokenInfoDataWrapper}
        style={{
          justifyContent: reverse ? 'flex-start' : 'flex-end',
        }}
      >
        <Suspense fallback={<Skeleton height="100%" width="100px" />}>
          <TokenDataInfo reverse={reverse} tokenAddress={tokenAddress} />
        </Suspense>
      </div>
    </div>
  );
};

export default TokenInfo;
