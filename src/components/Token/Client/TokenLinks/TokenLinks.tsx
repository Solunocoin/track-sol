import LogoLink from '@/components/LogoLink/LogoLink';
import dexToolsLogo from '../../../../../public/dex_screener_logo.svg';
import solScanLogo from '../../../../../public/sol_scan_logo.png';
import Clipboard from '../../../Clipboard/Clipboard';
import styles from './TokenLinks.module.scss';

const TokenLinks = async ({ tokenAddress }: ITokenInfo) => {
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
      </div>
    </div>
  );
};

export default TokenLinks;
