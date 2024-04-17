'use client';

import { PublicKey } from '@metaplex-foundation/js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { solana } from '../../../../../lib/solana';
import Button from '../../../Button/Button';
import styles from './TokenAddressInput.module.scss';

const TokenAddressInput = () => {
  const router = useRouter();

  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const tokenAddress = new PublicKey(token);

      const accountInfo = await solana.getAccountInfo(tokenAddress);

      setToken('');

      if (accountInfo?.owner.equals(TOKEN_PROGRAM_ID)) {
        router.push(`/token/${token}`);
      } else {
        router.push(`/wallet/${token}`);
      }
    } catch (error) {
      router.push(`/error`);
    } finally {
      setLoading(false);
    }
  };

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
      <Button onClick={() => handleSearch()} disabled={!token}>
        Search
      </Button>
    </div>
  );
};

export default TokenAddressInput;
