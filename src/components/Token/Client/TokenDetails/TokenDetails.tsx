import formatNumber from '@/utils/formatNumber';
import { PublicKey } from '@metaplex-foundation/js';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import { solana } from '../../../../../lib/solana';
import InfoTip from '../../../InfoTip/InfoTip';
import TokenMarketCap from '../../Server/TokenMarketCap/TokenMarketCap';
import TokenPrice from '../../Server/TokenPrice/TokenPrice';
import TokenTradeBtn from '../../Server/TokenTradeBtn/TokenTradeBtn';
import TokenDetailsContainer from '../TokenDetailsContainer/TokenDetailsContainer';
import styles from './TokenDetails.module.scss';

const TokenDetails = async ({ tokenAddress }: ITokenDetails) => {
  const supply = await solana.getTokenSupply(new PublicKey(tokenAddress));
  const totalSupply = supply.value.uiAmount;

  if (!totalSupply) {
    return null;
  }

  return (
    <TokenDetailsContainer>
      <div>
        <h3>Price</h3>
        <div className={styles.tokenDetailsItemInner}>
          <Suspense fallback={<Skeleton height="18px" width="80%" />}>
            <TokenPrice tokenAddress={tokenAddress} />
          </Suspense>
        </div>
      </div>
      <div>
        <h3>
          Market Cap{' '}
          <InfoTip
            id="tool-tip-mCap"
            description="The circulating supply multiplied by the price. (Includes locked, excludes burned)"
          />
        </h3>
        <div className={styles.tokenDetailsItemInner}>
          <Suspense fallback={<Skeleton height="100%" width="80%" />}>
            <TokenMarketCap
              tokenAddress={tokenAddress}
              totalSupply={totalSupply}
            />
          </Suspense>
        </div>
      </div>
      <div>
        <h3>
          Supply{' '}
          <InfoTip
            id="tool-tip-supply"
            description="The total supply of the token, including burned and locked tokens."
          />
        </h3>

        <div className={styles.tokenDetailsItemInner}>
          <h4>{formatNumber(Number(totalSupply), 3)}</h4>
        </div>
      </div>

      <div className={styles.tokenDetailsTradeBtnContainer}>
        <Suspense fallback={<Skeleton height="100%" />}>
          <TokenTradeBtn tokenAddress={tokenAddress} />
        </Suspense>
      </div>
    </TokenDetailsContainer>
  );
};

export default TokenDetails;
