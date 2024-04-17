'use client';

import LogoLink from '@/components/LogoLink/LogoLink';
import Main from '@/components/Main/Main';
import TokenAddressInput from '@/components/Token/Client/TokenAddressInput/TokenAddressInput';
import Lottie from 'lottie-react';
import telegramLogo from '../../../public/telegram_logo.png';
import noFoundLottie from '../../lottie/not-found.json';

const error = () => {
  return (
    <Main>
      <h1
        style={{
          fontSize: '40px',
          maxWidth: '700px',
          textAlign: 'center',
        }}
      >
        Not Found. <br />
        Make sure the token or wallet address is correct. <br />
        Search another token or wallet below.
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '2rem',
        }}
      >
        <div>If the issue persits, please contact us at </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem',
          }}
        >
          <LogoLink
            logo={telegramLogo}
            href="https://t.me/solunocoin"
            alt="telegram logo"
          />
          <a
            href="https://t.me/solunocoin"
            target="_blank"
            style={{
              marginLeft: '0.5rem',
            }}
          >
            https://t.me/solunocoin
          </a>
        </div>
      </div>
      <div
        style={{
          maxWidth: '200px',
          marginTop: '1rem',
          marginBottom: '1rem',
        }}
      >
        <Lottie animationData={noFoundLottie} loop />
      </div>
      <div
        style={{
          maxWidth: '500px',
          width: '100%',
        }}
      >
        <TokenAddressInput />
      </div>
    </Main>
  );
};

export default error;
