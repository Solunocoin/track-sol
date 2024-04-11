import formatNumber from '@/utils/formatNumber';
import getTokensBestPair from '@/utils/getTokensBestPair';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { createConnectionWithRetry } from '../../../../../lib/solana';
import styles from './TokenWalletDetails.module.scss';

const TokenWalletData = async ({
  tokenAddress,
  walletAddress,
}: ITokenWalletData) => {
  const connection = await createConnectionWithRetry();

  const tokenAccounts = await connection.getTokenAccountsByOwner(
    new PublicKey(walletAddress),
    {
      mint: new PublicKey(tokenAddress),
      programId: TOKEN_PROGRAM_ID,
    },
  );

  const supply = await connection.getTokenSupply(new PublicKey(tokenAddress));

  const bestPairRes = await getTokensBestPair(tokenAddress);
  const bestPair = bestPairRes?.data;

  let balance = 0;
  let percentage = 0;
  let value = 0;

  if (tokenAccounts.value?.[0]) {
    const accountData = AccountLayout.decode(
      tokenAccounts.value?.[0]?.account?.data,
    );

    balance = Number(accountData.amount) / 10 ** supply.value.decimals;
    percentage = (balance / Number(supply?.value?.uiAmount)) * 100;
    value = Number(balance) * Number(bestPair?.priceUsd);
  }

  return (
    <div
      style={{
        marginTop: '1rem',
      }}
    >
      <div className={styles.tokenWalletDetails}>
        <div>
          <h3>Balance</h3>
          <div className={styles.tokenMoreDetailsItemInner}>
            <h4>
              {balance > 1
                ? formatNumber(Number(balance), 3)
                : balance < 1
                ? formatNumber(Number(balance), 8)
                : '-'}
            </h4>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <h3>Share</h3>

          <div className={styles.tokenMoreDetailsItemInner}>
            <h4>
              {percentage > 1
                ? `${formatNumber(Number(percentage), 4)}%`
                : percentage < 0.000001 && percentage > 0
                ? '<0.000001%'
                : `${formatNumber(Number(percentage), 6)}%`}
            </h4>
          </div>
        </div>
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <h3>Value</h3>
          <div className={styles.tokenMoreDetailsItemInner}>
            <h4>${formatNumber(Number(value), 3)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenWalletData;
