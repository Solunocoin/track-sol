'use client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { solana } from '../../../lib/solana';
import Button from '../Button/Button';
import styles from './NavbarSearch.module.scss';

const NavbarSearch = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // For focusing input on Command + K (Mac) or Ctrl + K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent the default action to ensure it focuses the input
        const inputElement = document.querySelector(
          `.${styles.navbarSearchInput}`,
        ) as HTMLElement;
        inputElement?.focus();
      }

      if (e.key === 'Escape') {
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur(); // This removes the focus from the currently focused element
      }
    };

    // Add event listener for the whole document
    document.addEventListener('keydown', handleKeyDown);

    // Clean up to avoid memory leaks
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [token, router]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const tokenAddress = new PublicKey(token);

      if (!tokenAddress) {
        notFound();
      }

      const accountInfo = await solana.getAccountInfo(tokenAddress);

      await new Promise((resolve) => setTimeout(resolve, 3000));

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
    <div className={styles.navbarSearch}>
      <input
        placeholder="Search any Token or Wallet Address (cmd + k)"
        type="text"
        className={styles.navbarSearchInput}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        onKeyDown={(e) => {
          // Optionally, you can handle the Enter key when the input is focused
          if (e.key === 'Enter' && token) {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <div className={styles.navbarSearchButtonWrapper}>
        <Button
          onClick={() => handleSearch()}
          disabled={!token || loading}
          style={{
            height: '100%',
          }}
        >
          {loading ? 'Searching' : 'Search'}
        </Button>
      </div>
    </div>
  );
};

export default NavbarSearch;
