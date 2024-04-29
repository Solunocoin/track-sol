import Button from "@/components/Button/Button";
import LogoLink from "@/components/LogoLink/LogoLink";
import Image from "next/image";
import Link from "next/link";
import browserLogo from "../../public/browser_logo.png";
import solunoLogo from "../../public/soluno_logo.png";
import telegramLogo from "../../public/telegram_logo.png";
import xLogo from "../../public/x_logo.png";
import styles from "./styles/page.module.scss";

export default function Home() {
  return (
    <main className={styles.indexPageWrapper}>
      {/* <NavBar /> */}
      <div className={styles.indexHero}>
        <div className={styles.indexHeroStickyWrapper}>
          <div className={styles.indexHeroSticky}>
            <h1>
              THE ULTIMATE <span>SOLANA</span> <br></br>PORTFOLIO AND TOKEN
              TRACKER
            </h1>
            <p>
              Keep an eye on any Solana wallets and tokens with no fuss.
              Discover which tokens are making money and which {`aren't`}, all
              through a simple, easy-to-use dashboard.
            </p>
            <div className={styles.indexLaunchButtonWrapper}>
              <Link href="/search">
                <Button>LAUNCH APP</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.indexOverviewWrapper}>
        <h2>Powered by Soluno</h2>
        <div className={styles.indexOverview}>
          <div className={styles.indexOverviewImgWrapper}>
            <Image
              objectFit="contain"
              fill
              src={solunoLogo}
              alt="soluno.io logo"
            />
          </div>
          <div className={styles.indexOverviewItemWrapper}>
            <div className={styles.indexOverviewItem}>
              <h3>There is only one Soluno in the world </h3>
              <p>
                Forget about cats and dogs. Be part of the new trend of memes
                with Soluno. Soluno is a very unique coin with only 1 token in
                total supply.
              </p>
            </div>
            <div className={styles.indexOverviewItem}>
              <h3>
                Our Goal: To become the most expensive asset in the world.
              </h3>
              <p>
                With just one in existence, our aim is clear, make Soluno the
                most expensive asset in the world. This exclusivity means
                {` Soluno's`} price can soar to unprecedented heights, making
                history and headlines along the way.
              </p>
            </div>
            <div className={styles.indexOverviewItem}>
              <h3>Join a legacy and {`let's`} make history together!</h3>
              <div className={styles.indexOverviewItemLinks}>
                <LogoLink
                  logo={telegramLogo}
                  alt="Telegram Logo"
                  href="https://t.me/solunocoin"
                />
                <LogoLink
                  logo={xLogo}
                  alt="X (Twitter) Logo"
                  href="https://twitter.com/soluno_coin"
                />
                <LogoLink
                  logo={browserLogo}
                  alt="Website Logo"
                  href="https://www.soluno.io/"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.indexPowered}>
        <h1>What can you do with this tool?</h1>
        <div className={styles.indexPoweredItemWrapper}>
          <div className={styles.indexPoweredItem}>
            <h2>Token Tracker</h2>
            <p>
              Track any Solana token for easy information on Price, Market Cap,
              Supply, Contract Address, Social Media links, Holders, Liquidity,
              Volume and more. See how much of any token a wallet has and if
              that wallet has made or lost money.
            </p>
          </div>
          <div className={styles.indexPoweredItem}>
            <h2>Wallet Tracker</h2>
            <p>
              Track any Solana wallet or connect your own wallet to see all the
              holdings in one place. See how much your wallet has made or lost
              and how much each token is worth.
            </p>
          </div>
        </div>
      </div>

      {/* <FooterLinks /> */}
    </main>
  );
}
