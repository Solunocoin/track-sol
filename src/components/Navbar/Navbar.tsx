import Image from 'next/image';
import Link from 'next/link';
import browserLogo from '../../../public/browser_logo.png';
import logo from '../../../public/logo.png';
import telegramLogo from '../../../public/telegram_logo.png';
import LogoLink from '../LogoLink/LogoLink';
import NavbarSearch from '../NavbarSearch/NavbarSearch';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.navbar}>
        <div className={styles.navbarLogo}>
          <div
            style={{
              width: '40px',
              height: '40px',
              position: 'relative',
              marginRight: '10px',
            }}
          >
            <Image fill src={logo} alt="TrackSol logo" />
          </div>
          <div>
            <Link href="/">
              <div>
                <h2>
                  TRACK<span>SOL</span>
                </h2>
                <div>by soluno.io</div>
              </div>
            </Link>
          </div>
        </div>
        <NavbarSearch />
        <div className={styles.navbarLinks}>
          <LogoLink
            href="https://t.me/solunocoin"
            logo={telegramLogo}
            alt="Telegram logo"
          />
          {/* <LogoLink
            href="https://twitter.com/solunocoin"
            logo={xLogo}
            alt="X (twitter) logo"
          /> */}

          <LogoLink
            logo={browserLogo}
            alt="Website Logo"
            href="https://www.soluno.io/"
          />

          <Link href="/wallet/4NdPokJKEyozbcXzhj9KN4gMcgBNBwxdeNitg9dYGsex">
            wallet
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
