'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Button from '../Button/Button';
import styles from './NavbarSearch.module.scss';

const NavbarSearch = () => {
  const router = useRouter();
  const [token, setToken] = useState('');

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

  return (
    <div className={styles.navbarSearch}>
      <input
        placeholder="Search Token Address (cmd + k)"
        type="text"
        className={styles.navbarSearchInput}
        value={token}
        onChange={(e) => setToken(e.target.value)}
        onKeyDown={(e) => {
          // Optionally, you can handle the Enter key when the input is focused
          if (e.key === 'Enter' && token) {
            e.preventDefault();
            setToken('');
            router.push(`/token/${token}`);
          }
        }}
      />
      <div className={styles.navbarSearchButtonWrapper}>
        <Button
          onClick={() => {
            if (token) {
              router.push(`/token/${token}`);
              setToken('');
            }
          }}
          disabled={!token}
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

export default NavbarSearch;
