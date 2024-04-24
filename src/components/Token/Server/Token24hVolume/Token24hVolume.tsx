import formatNumber from "@/utils/formatNumber";
import styles from "./Token24hVolume.module.scss";
import { W_SOLANA_ADDRESS } from "@/global";
import { getCoinGeckoSolanaData } from "@/utils/getCoinGeckoSolanaData";

const Token24hVolume = async ({ tokenBestPair }: IToken24hVolume) => {
  let content;
  let h24Volume;
  if (tokenBestPair.baseToken.address === W_SOLANA_ADDRESS) {
    let coinGeckoSolanaData = await getCoinGeckoSolanaData();
    h24Volume = coinGeckoSolanaData.solana.usd_24h_vol;
  } else {
    h24Volume = tokenBestPair.volume?.h24;
  }

  if (h24Volume !== undefined) {
    content = `$${formatNumber(Number(h24Volume), 3)}`;
  } else {
    content = "Not 24 h yet";
  }

  return <h4 className={styles.token24hVolume}>{content}</h4>;
};

export default Token24hVolume;
