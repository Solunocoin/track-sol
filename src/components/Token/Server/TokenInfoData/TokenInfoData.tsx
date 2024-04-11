import getTokensBestPair from '@/utils/getTokensBestPair';
import truncateString from '@/utils/truncateString';
import { Metaplex } from '@metaplex-foundation/js';
import { ENV, TokenListProvider } from '@solana/spl-token-registry';
import { PublicKey } from '@solana/web3.js';
import { createConnectionWithRetry } from '../../../../../lib/solana';
import logo from '../../../../../public/logo.png';
import styles from './TokenInfoData.module.scss';

const TokenDataInfo = async ({ tokenAddress }: ITokenInfo) => {
  const connection = await createConnectionWithRetry();

  const metaplex = Metaplex.make(connection);

  const mintAddress = new PublicKey(tokenAddress);

  let tokenName;
  let tokenSymbol;
  let tokenLogo;

  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintAddress });

  const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });

    tokenName = token.name;
    tokenSymbol = token.symbol;

    const logoFetch = await fetch(token.json?.image as string);

    if (logoFetch.status === 200) {
      tokenLogo = token.json?.image;
    } else {
      const bestPair = await getTokensBestPair(tokenAddress);
      tokenLogo = bestPair.data?.info.imageUrl;
    }
  } else {
    const provider = await new TokenListProvider().resolve();
    const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();
    console.log(tokenList);
    const tokenMap = tokenList.reduce((map, item) => {
      map.set(item.address, item);
      return map;
    }, new Map());

    const token = tokenMap.get(mintAddress.toBase58());

    if (token) {
      tokenName = token.name;
      tokenSymbol = token.symbol;

      const logoFetch = await fetch(token.logoURI);

      if (logoFetch.status === 200) {
        tokenLogo = token.json?.image;
      } else {
        const bestPair = await getTokensBestPair(tokenAddress);
        tokenLogo = bestPair.data?.info.imageUrl;
      }
    } else {
      const bestPair = await getTokensBestPair(tokenAddress);

      tokenName = bestPair.data?.baseToken.name;
      tokenSymbol = bestPair.data?.baseToken.symbol;
      tokenLogo = bestPair.data?.info.imageUrl;
    }
  }

  return (
    <div className={styles.tokenInfoData}>
      <div className={styles.tokenInfoDataName}>
        <h4>{truncateString(tokenName, 15)}</h4>
        <h5>{tokenSymbol}</h5>
      </div>

      <img
        className={styles.tokenInfoDataLogo}
        src={tokenLogo ? tokenLogo : logo}
        alt={`${tokenName} logo`}
      />
    </div>
  );
};

export default TokenDataInfo;
