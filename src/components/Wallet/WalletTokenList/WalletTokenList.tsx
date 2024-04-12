import TokenInfo from '@/components/Token/Client/TokenInfo/TokenInfo';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { solana } from '../../../../lib/solana';
import WalletTokenPrice from '../WalletTokenPrice/WalletTokenPrice';
import styles from './WalletTokenList.module.scss';

const WalletTokenList = async ({ walletAddress }: IWalletTokenList) => {
  const tokenAccounts = await solana.getParsedTokenAccountsByOwner(
    new PublicKey(walletAddress),
    {
      programId: TOKEN_PROGRAM_ID,
    },
  );

  const tokensData = tokenAccounts.value.filter(
    (token) => token.account.data.parsed.info.tokenAmount.uiAmount > 0,
  );

  console.log('tokensData', tokensData[0].account.data);

  const tokenAddresses = tokensData.map(
    (token) => token.account.data.parsed.info.mint,
  );

  // console.log('tokens', tokenAddresses);

  // console.log('tokenAccounts', tokenAccounts.value[5].account.data.parsed.info);

  // const response = await fetch(
  //   `https://api.dexscreener.com/latest/dex/tokens/${tokenAddresses.join(',')}`,
  // );

  // const data: TokenDetailsResponseType = await response.json();

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
        <div className={styles.walletListHeader}>
          <div>Token</div>
          <div>Price</div>
          <div>Amount</div>
          <div>Info</div>
        </div>
        <hr />
        {tokensData.map((token, index) => (
          <div key={index} className={styles.walletListItem}>
            <TokenInfo
              reverse={true}
              tokenAddress={token.account.data.parsed.info.mint}
            />

            <WalletTokenPrice
              tokenAddress={token.account.data.parsed.info.mint}
            />
            <WalletTokenPrice
              tokenAddress={token.account.data.parsed.info.mint}
            />
            <div>Trade</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletTokenList;
