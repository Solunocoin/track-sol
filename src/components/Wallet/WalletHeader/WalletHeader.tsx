import formatNumber from '@/utils/formatNumber';
import styles from './WalletHeader.module.scss';

const WalletHeader = async ({ tokens, walletAddress }: IWalletHeader) => {
  const totalValue = tokens.reduce((acc, token) => acc + token.value, 0);

  return (
    <div className={styles.walletHeader}>
      <div>
        <h3>Portfolio Value</h3>

        <div className="d-flex flex-row mb-2">
          <h2 className="me-2">
            {totalValue < 1
              ? '$' + formatNumber(Number(totalValue), 10)
              : '$' + formatNumber(Number(totalValue), 3)}
          </h2>
        </div>
      </div>
      <div className="d-flex align-items-end flex-column">
        <h3 className={styles.walletHeaderTracking}>
          Tracking: {walletAddress && walletAddress.substring(0, 6)}...
          {walletAddress && walletAddress.substring(walletAddress.length - 4)}
        </h3>
      </div>
    </div>
  );
};

export default WalletHeader;
