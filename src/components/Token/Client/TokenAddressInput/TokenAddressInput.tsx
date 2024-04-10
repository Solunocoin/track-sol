'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../../../Button/Button';
import styles from './TokenAddressInput.module.scss';

const TokenAddressInput = () => {
  const router = useRouter();

  const [token, setToken] = useState('');

  return (
    <div className={styles.tokenAddressInputWrapper}>
      <div>
        <label className={styles.tokenAddressLabel}>Token Address</label>
        <div>
          <input
            placeholder={'Paste Token Address Here'}
            type="text"
            className={styles.tokenAddressInput}
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          router.push(`/token/${token}`);
        }}
        disabled={!token}
      >
        Search
      </Button>
    </div>
  );
};

export default TokenAddressInput;
