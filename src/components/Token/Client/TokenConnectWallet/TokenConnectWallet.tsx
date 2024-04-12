'use client';

import { useQueryState } from 'nuqs';
import styles from './TokenConnectWallet.module.scss';

const TokenConnectWallet = ({ tokenAddress }: ITokenConnectWallet) => {
  const [walletParam, setWalletParam] = useQueryState('wallet');

  return (
    <div className={styles.tokenConnectWallet}>
      <div>
        <h2 className="mb-2">Check your holdings or somebody elses.</h2>
        <h5>
          <span>
            Paste any wallet address to check their holdings, percentage of the
            supply and total value.
          </span>
        </h5>
      </div>
      <div
        className={styles.tokenConnectWalletBtnWrapper}
        style={{
          width: '100%',
        }}
      >
        {/* <WalletInput tokenAddress={tokenAddress} /> */}
        <h4
          style={{
            textAlign: 'center',
            width: '100%',
          }}
        >
          Coming Soon...
        </h4>
      </div>
      {/* {walletParam && <TokenWalletDetails tokenAddress={tokenAddress} />} */}
    </div>
  );
};

export default TokenConnectWallet;
