
import truncateString from '@/utils/truncateString';
import { Metaplex } from '@metaplex-foundation/js';
import { ENV, TokenListProvider } from '@solana/spl-token-registry';
import { PublicKey } from '@solana/web3.js';
import { QuestionCircle } from 'react-bootstrap-icons';
import { solana } from '../../../../../lib/solana';
import styles from './TokenInfoData.module.scss';

const TokenDataInfo = async ({ tokenAddress, tokenBestPair }: ITokenInfoData) => {
  const metaplex = Metaplex.make(solana);

  const mintAddress = new PublicKey(tokenAddress);

  let tokenName;
  let tokenSymbol;
  let tokenLogo;

  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintAddress });

  const metadataAccountInfo = await solana.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });

    tokenName = token.name;
    tokenSymbol = token.symbol;

    try {
      const logoFetch = await fetch(token.json?.image as string);

      if (logoFetch.status === 200) {
        tokenLogo = token.json?.image;
      } else {
        tokenLogo = tokenBestPair.info.imageUrl;
      }
    } catch (error) {
      throw new Error('Error in fetching token logo');
    }
  } else {
    const provider = await new TokenListProvider().resolve();
    const tokenList = provider.filterByChainId(ENV.MainnetBeta).getList();

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
        tokenLogo = tokenBestPair.info.imageUrl;
      }
    } else {
    

      tokenName = tokenBestPair.baseToken.name;
      tokenSymbol = tokenBestPair.baseToken.symbol;
      tokenLogo = tokenBestPair.info.imageUrl;
    }
  }

  return (
    <div className={`${styles.tokenInfoData}`}>
      <div className={styles.tokenInfoDataName}>
        <h4>{truncateString(tokenName, 15)}</h4>
        <h5>{tokenSymbol}</h5>
      </div>

      {tokenLogo ? (
        <img
          className={styles.tokenInfoDataLogo}
          src={tokenLogo}
          alt={`${tokenName} logo`}
        />
      ) : (
        <QuestionCircle
          className={styles.tokenInfoDataLogo}
          width={40}
          height={40}
        />
      )}
    </div>
  );
};

export default TokenDataInfo;
