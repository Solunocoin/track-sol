import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { createConnectionWithRetry } from '../../../../lib/solana';
import styles from './WalletTokenList.module.scss';

const WalletTokenList = async ({ walletAddress }: IWalletTokenList) => {
  const connection = await createConnectionWithRetry();

  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
    new PublicKey(walletAddress),
    {
      programId: TOKEN_PROGRAM_ID,
    },
  );

  const tokensData = tokenAccounts.value.filter(
    (token) => token.account.data.parsed.info.tokenAmount.uiAmount > 0,
  );

  const tokenAddresses = tokensData.map(
    (token) => token.account.data.parsed.info.mint,
  );

  console.log('tokens', tokenAddresses);

  console.log('tokenAccounts', tokenAccounts.value[5].account.data.parsed.info);

  const response = await fetch(
    `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses.join(',')}`,
  );

  const data: TokenDetailsResponseType = await response.json();

  // const groupedByBaseTokenAddress = data?.pairs?.reduce(
  //   (accumulator, currentValue) => {
  //     // Get the address you want to group by
  //     const address = currentValue.baseToken.address;

  //     // Check if there's already an entry for this address
  //     let group = accumulator.find((group) => group?.address === address);

  //     // If the group doesn't exist, create it and add to the accumulator
  //     if (!group) {
  //       group = { address: address, pairs: [] };
  //       accumulator.push(group);
  //     }

  //     // Add the current item to the group's pairs array
  //     group.pairs.push(currentValue);

  //     return accumulator;
  //   },
  //   [],
  // );

  // console.log('groupedByBaseTokenAddress', groupedByBaseTokenAddress);

  // const bestPairRes = await getTokensBestPair(tokenAddress);
  // const bestPair = bestPairRes?.data;

  // console.log('bestPair', bestPair);

  // console.log('Token                                         Balance');
  // console.log('------------------------------------------------------------');
  // tokenAccounts.value.forEach((tokenAccount) => {
  //   const accountData = AccountLayout.decode(tokenAccount.account.data);

  //   console.log(
  //     `${new PublicKey(accountData.mint)}   ${
  //       Number(accountData.amount) / 10 ** supply.value.decimals
  //     }`,
  //   );
  // });

  // let balance = 0;
  // let percentage = 0;
  // let value = 0;

  // if (tokenAccounts.value?.[0]) {
  //   const accountData = AccountLayout.decode(
  //     tokenAccounts.value?.[0]?.account?.data,
  //   );

  //   balance = Number(accountData.amount) / 10 ** supply.value.decimals;
  //   percentage = (balance / Number(supply?.value?.uiAmount)) * 100;
  //   value = Number(balance) * Number(bestPair?.priceUsd);
  // }

  return (
    <div
      style={{
        marginTop: '1rem',
      }}
    >
      <div
        className={styles.tokenWalletDetails}
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {tokensData.map((token, index) => (
          <>
            <h4>{token.account.data.parsed.info.mint}</h4>
            <div>{token.account.data.parsed.info.tokenAmount.uiAmount}</div>
          </>
        ))}
        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default WalletTokenList;
