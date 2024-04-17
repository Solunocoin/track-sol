import LogoLink from "@/components/LogoLink/LogoLink";
import dexToolsLogo from "../../../../../public/dex_screener_logo.svg";
import solScanLogo from "../../../../../public/sol_scan_logo.png";
import Clipboard from "../../../Clipboard/Clipboard";
import websiteLogo from "../../../../../public/browser_logo.png";
import twitterLogo from "../../../../../public/x_logo.png";
import telegramLogo from "../../../../../public/telegram_logo.png";
import styles from "./TokenLinks.module.scss";
import { Metaplex, PublicKey } from "@metaplex-foundation/js";
import { solana } from "../../../../../lib/solana";
import getTokensBestPair from "@/utils/getTokensBestPair";

const TokenLinks = async ({ tokenAddress }: ITokenLinks) => {
  const metaplex = Metaplex.make(solana);

  const mintAddress = new PublicKey(tokenAddress);

  let twitterLink;
  let websiteLink;
  let telegramLink;
  const metadataAccount = metaplex
    .nfts()
    .pdas()
    .metadata({ mint: mintAddress });

  const metadataAccountInfo = await solana.getAccountInfo(metadataAccount);

  if (metadataAccountInfo) {
    const token = await metaplex
      .nfts()
      .findByMint({ mintAddress: mintAddress });
    const extensions = token.json?.extensions;
    console.log(extensions);
    if (extensions) {
      //@ts-ignore
      if (extensions.website) {
        //@ts-ignore
        websiteLink = extensions.website;
      }
      //@ts-ignore
      if (extensions.twitter) {
        //@ts-ignore
        twitterLink = extensions.twitter;
      }
      //@ts-ignore
      if (extensions.telegram) {
        //@ts-ignore
        telegramLink = extensions.telegram;
      }
    }
  }

  return (
    <div className={styles.tokenLinksWrapper}>
      <Clipboard text={tokenAddress} title="Contract" />

      <div className={styles.tokenLinks}>
        <LogoLink
          href={`https://dexscreener.com/solana/${tokenAddress}`}
          logo={dexToolsLogo}
          alt="DexScreener Logo"
        />

        <LogoLink
          href={`https://solscan.io/token/${tokenAddress}`}
          logo={solScanLogo}
          alt="Solscan Logo"
        />

        {twitterLink && (
          <LogoLink href={twitterLink} logo={twitterLogo} alt="Twitter Logo" />
        )}
        {websiteLink && (
          <LogoLink href={websiteLink} logo={websiteLogo} alt="Twitter Logo" />
        )}
        {telegramLink && (
          <LogoLink
            href={telegramLink}
            logo={telegramLogo}
            alt="Twitter Logo"
          />
        )}
      </div>
    </div>
  );
};

export default TokenLinks;
