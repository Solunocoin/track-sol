import truncateString from '@/utils/truncateString';
import { QuestionCircle } from 'react-bootstrap-icons';
import styles from './WalletTokenInfo.module.scss';

const WalletTokenInfo = async ({
  tokenName,
  tokenSymbol,
  tokenLogo,
}: IWalletTokenInfo) => {
  return (
    <div className={styles.walletTokenInfoWrapper}>
      <div className={styles.walletTokenInfoDataWrapper}>
        <div className={styles.walletTokenInfoData}>
          {tokenLogo ? (
            <img
              className={styles.walletTokenInfoLogo}
              src={tokenLogo}
              alt={`${tokenName} logo`}
            />
          ) : (
            <QuestionCircle
              className={styles.walletTokenInfoLogo}
              width={40}
              height={40}
            />
          )}

          <div className={styles.walletTokenInfoName}>
            <h4>{truncateString(tokenName, 15)}</h4>
            <h5>{tokenSymbol}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTokenInfo;
