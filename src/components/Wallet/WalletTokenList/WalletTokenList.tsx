import Divider from '@/components/Divider/Divider';
import { fetchTokenData } from '@/utils/getAllTokens';
import { getSolPrice } from '@/utils/getSolPrice';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import Link from 'next/link';
import { solana } from '../../../../lib/solana';
import WalletHeader from '../WalletHeader/WalletHeader';
import WalletTokenBalance from '../WalletTokenBalance/WalletTokenBalance';
import WalletTokenInfo from '../WalletTokenInfo/WalletTokenInfo';
import WalletTokenPrice from '../WalletTokenPrice/WalletTokenPrice';
import WalletTokenTradeBtn from '../WalletTokenTradeBtn/WalletTokenTradeBtn';
import styles from './WalletTokenList.module.scss';

const WalletTokenList = async ({ walletAddress }: IWalletTokenList) => {
  const tokens: WalletTokenType[] = [];

  const walletSolBalance = await solana.getBalance(
    new PublicKey(walletAddress),
  );

  const solPrice = await getSolPrice();

  console.log('solPrice', solPrice);

  console.log('walletSolBalance', walletSolBalance / 10 ** 9);

  tokens.push({
    address: 'sol',
    balance: walletSolBalance / 10 ** 9,
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fsolana-labs%2Ftoken-list%40main%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&fit=cover&width=256&height=256',
    price: solPrice?.price,
    value: (walletSolBalance / 10 ** 9) * solPrice?.price,
    priceChange: {
      h1: 0,
      h6: 0,
      m5: 0,
      h24: solPrice?.change24h,
    },
    quoteToken: {
      address: 'usd',
      name: 'USD',
      symbol: 'USD',
    },
  });

  const tokenAccounts = await solana.getParsedTokenAccountsByOwner(
    new PublicKey(walletAddress),
    {
      programId: TOKEN_PROGRAM_ID,
    },
  );

  const tokenAccountsFiltered = tokenAccounts.value.filter(
    (token) => token.account.data.parsed.info.tokenAmount.uiAmount > 0,
  );

  const tokenAddresses = tokenAccountsFiltered.map(
    (token) => token.account.data.parsed.info.mint,
  );

  const allTokens = await fetchTokenData(tokenAddresses);

  allTokens.forEach((token) => {
    const tokenInfo = tokenAccountsFiltered.find(
      (t) => t.account.data.parsed.info.mint === token.baseToken.address,
    );

    const tokenBalance =
      tokenInfo?.account.data.parsed.info.tokenAmount.uiAmount;

    const tokenValue = tokenBalance * parseFloat(token.priceUsd);

    tokens.push({
      address: token.baseToken.address,
      name: token.baseToken.name,
      symbol: token.baseToken.symbol,
      logo: token.info.imageUrl,
      price: parseFloat(token.priceUsd),
      priceChange: token.priceChange,
      balance: tokenBalance,
      value: tokenValue,
      quoteToken: token.quoteToken,
    });
  });

  const allTokensMapSorted = tokens.sort((a, b) => b.value - a.value);

  console.log('tokens', tokens);

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
        <WalletHeader tokens={tokens} walletAddress={walletAddress} />

        <div className={styles.walletListHeader}>
          <div>Token</div>
          <div>Price</div>
          <div>Amount</div>
          <div className={styles.walletListHeaderInfo}>Info</div>
        </div>

        <Divider />

        {allTokensMapSorted.map((token, index) => (
          <Link
            href={`/token/${token.address}`}
            key={index}
            className={styles.walletListItem}
          >
            <WalletTokenInfo
              tokenLogo={token?.logo}
              tokenName={token.name}
              tokenSymbol={token.symbol}
            />

            <WalletTokenPrice token={token} />

            <WalletTokenBalance token={token} />
            <WalletTokenTradeBtn
              baseToken={token.address}
              quoteToken={token.quoteToken.address}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WalletTokenList;
