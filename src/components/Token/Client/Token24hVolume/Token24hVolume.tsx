import formatNumber from '@/utils/formatNumber';
import styles from './Token24hVolume.module.scss';

const Token24hVolume = ({tokenBestPair }: IToken24hVolume) => {
  let content;
    const h24Volume = tokenBestPair.volume?.h24;
    if (h24Volume !== undefined) {
      content = formatNumber(Number(h24Volume), 3);
    } else {
      content = 'Not 24 h yet';
    }
  

  return <h4 className={styles.token24hVolume}>{content}</h4>;
};

export default Token24hVolume;
