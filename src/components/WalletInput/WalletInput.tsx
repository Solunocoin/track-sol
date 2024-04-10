'use client';

import { useState } from 'react';

import { useQueryState } from 'nuqs';
import Button from '../Button/Button';
import styles from './WalletInput.module.scss';

const WalletInput = ({ tokenAddress }: IWalletInput) => {
  const [walletParam, setWalletParam] = useQueryState('wallet');
  const [wallet, setWallet] = useState('');

  return (
    <div className={styles.walletInput}>
      <input
        placeholder="Any Wallet Address Here"
        type="text"
        className={styles.walletSearchInput}
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        onKeyDown={(e) => {
          // Optionally, you can handle the Enter key when the input is focused
          if (e.key === 'Enter' && wallet) {
            e.preventDefault();
            setWalletParam(wallet);
            setWallet('');
          }
        }}
      />
      <div className={styles.walletInputButtonWrapper}>
        <Button
          onClick={() => {
            if (wallet) {
              setWalletParam(wallet);
              setWallet('');
            }
          }}
          disabled={!wallet}
          style={{
            height: '100%',
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default WalletInput;
