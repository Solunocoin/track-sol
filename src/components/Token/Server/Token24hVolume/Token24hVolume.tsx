import formatNumber from '@/utils/formatNumber';
import getTokensBestPair from '@/utils/getTokensBestPair';
import styles from './Token24hVolume.module.scss';

const Token24hVolume = async ({ tokenAddress, tokenBestPair }: IToken24hVolume) => {
  // const bestPairRes = await getTokensBestPair(tokenAddress);
  // const bestPair = data;

  let content;

  if (tokenBestPair) {
    const h24Volume = tokenBestPair.volume?.h24;
    if (h24Volume !== undefined) {
      content = formatNumber(Number(h24Volume), 3);
    } else {
      content = 'Not 24 h yet';
    }
  } else {
    content = 'Not launched';
  }

  return <h4 className={styles.token24hVolume}>{content}</h4>;
};

export default Token24hVolume;
