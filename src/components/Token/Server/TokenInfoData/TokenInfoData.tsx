import truncateString from "@/utils/truncateString";
import { Metaplex } from "@metaplex-foundation/js";
import { ENV, TokenListProvider } from "@solana/spl-token-registry";
import { PublicKey } from "@solana/web3.js";
import { QuestionCircle } from "react-bootstrap-icons";
import { solana } from "../../../../../lib/solana";
import styles from "./TokenInfoData.module.scss";
import { W_SOLANA_ADDRESS } from "@/global";

const TokenDataInfo = async ({
  tokenAddress,
  tokenBestPair,
}: ITokenInfoData) => {
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
  // console.log("mtad", metadataAccountInfo);
  if (tokenAddress == W_SOLANA_ADDRESS) {
    tokenName = "Solana";
    tokenSymbol = "SOL";
    tokenLogo =
      "https://api.phantom.app/image-proxy/?image=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fsolana-labs%2Ftoken-list%40main%2Fassets%2Fmainnet%2FSo11111111111111111111111111111111111111112%2Flogo.png&fit=cover&width=256&height=256";
  } else if (metadataAccountInfo) {
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });
    // console.log("metaplex", token);
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
      console.log(
        "Could not find token logo with metaplex, trying other method"
      );
    }
  } else {
    try {
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
    } catch (error) {
      console.log("Could not find logo, defaulting to question mark");
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
