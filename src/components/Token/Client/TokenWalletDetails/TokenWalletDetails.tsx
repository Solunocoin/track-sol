'use client';

import Clipboard from '@/components/Clipboard/Clipboard';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useQueryState } from 'nuqs';
import { Suspense, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { solana } from '../../../../../lib/solana';
import TokenWalletData from '../../Server/TokenWalletData/TokenWalletData';

const TokenWalletDetails = ({ tokenAddress }: ITokenWalletDetails) => {
  const [walletParam, setWalletParam] = useQueryState('wallet');
  const [invalidWalletAddress, setInvalidWalletAddress] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const accountInfo = await solana.getAccountInfo(
          new PublicKey(walletParam as string),
        );

        if (accountInfo?.owner.equals(TOKEN_PROGRAM_ID)) {
          setInvalidWalletAddress(true);
        } else {
          setInvalidWalletAddress(false);
        }
      } catch (error) {
        setInvalidWalletAddress(true);
      }
    };

    fetch();
  }, [walletParam]);

  return (
    <div
      style={{
        marginTop: '1rem',
      }}
    >
      <Clipboard text={walletParam as string} title="Viewing" />
      {invalidWalletAddress ? (
        <div
          style={{
            marginTop: '1rem',
            color: 'red',
          }}
        >
          <div>Invalid wallet address</div>
          <div
            style={{
              fontSize: '14px',
              color: '#fff',
            }}
          >
            Please make sure {`you're`} inputting a Solana wallet address.
          </div>
        </div>
      ) : (
        <div
          style={{
            marginTop: '1rem',
          }}
        >
          <Suspense
            fallback={
              <Skeleton
                count={1}
                baseColor="#0c0e1c50"
                highlightColor="#1e284f50"
                height={68}
              />
            }
          >
            <TokenWalletData
              tokenAddress={tokenAddress}
              walletAddress={walletParam as string}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default TokenWalletDetails;
