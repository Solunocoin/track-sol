import Card from '@/components/Card/Card';
import Main from '@/components/Main/Main';
import TokenAddressInput from '@/components/Token/Client/TokenAddressInput/TokenAddressInput';
import styles from './styles/token.module.scss';

const token = () => {
  return (
    <Main>
      <Card>
        <div className={styles.tokenInfo}>
          <p>
            This tool lets you search any Solana token by contract address and
            see your or {`anyone's`} token balance, token price, and overall
            gains/loses.
          </p>
        </div>

        <TokenAddressInput />

        {/* <TrendingHeader>
            <div>
              <svg width="0" height="0">
                <linearGradient
                  id="flame-gradient"
                  x1="100%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop stopColor="#e90404" offset="0%" />
                  <stop stopColor="#fcdb00" offset="100%" />
                </linearGradient>
              </svg>
              <h3>
                Trending Tokens{''}
                <IoFlameSharp
                  className="flame"
                  style={{ fill: 'url(#flame-gradient)' }}
                ></IoFlameSharp>
              </h3>
            </div>

            <CardTrendingSearch
              number={1}
              logo="https://only1token.com/200x200o1tlogo.png"
              symbol="O1T"
              tokenAddress="0xbb994e80e2edc45dce9065bda73adc7e9337b64f"
              tokenName="Only 1 Token"
            />   

            <CardTrendingSearch
              number={2}
              logo="https://pbs.twimg.com/profile_images/1450673847842213888/HTXOm8SE_400x400.jpg"
              symbol="BITD"
              tokenAddress="0x003f83da9868acc151be89eefa4d19838ffe5d64"
              tokenName="8BIT DOGE"
            />

            <CardTrendingSearch
              number={3}
              logo="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0xB7Dba4C673beDB174DC3Ff7Ec65d17C863d39b16/logo.png"
              symbol="FATCAKE"
              tokenAddress="0xb7dba4c673bedb174dc3ff7ec65d17c863d39b16"
              tokenName="FAT CAKE"
            />

            <CardTrendingSearch
              number={4}
              logo="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x7c63F96fEAFACD84e75a594C00faC3693386FBf0/logo.png"
              symbol="ASS"
              tokenAddress="0x7c63f96feafacd84e75a594c00fac3693386fbf0"
              tokenName="Australian Safe Shepherd"
            />    

            <CardTrendingSearch
              number={5}
              logo="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/assets/0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5/logo.png"
              symbol="SAFEMOON"
              tokenAddress="0x42981d0bfbAf196529376EE702F2a9Eb9092fcB5"
              tokenName="SafeMoon"
            />
          </TrendingHeader> */}
      </Card>
    </Main>
  );
};

export default token;
