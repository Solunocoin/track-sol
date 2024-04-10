import truncateString from '@/utils/truncateString';
import {
  fetchDigitalAsset,
  mplTokenMetadata,
} from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from '@metaplex-foundation/umi-public-keys';
import logo from '../../../../../public/logo.png';
import styles from './TokenInfoData.module.scss';

const TokenDataInfo = async ({ tokenAddress }: ITokenInfo) => {
  const umi = createUmi(
    'https://mainnet.helius-rpc.com/?api-key=4ca86fba-27ab-474e-a1c2-08ec85212009',
  ).use(mplTokenMetadata());

  const mintAddress = publicKey(tokenAddress);

  const asset = await fetchDigitalAsset(umi, mintAddress);

  const tokenRes = await fetch(asset.metadata.uri);
  const tokenData = await tokenRes.json();

  return (
    <div className={styles.tokenInfoData}>
      <div className={styles.tokenInfoDataName}>
        <h4>{truncateString(asset.metadata.name, 15)}</h4>
        <h5>{asset.metadata.symbol}</h5>
      </div>

      <img
        className={styles.tokenInfoDataLogo}
        src={tokenData?.image ? tokenData.image : logo}
        alt={`${asset.metadata.name} logo`}
      />
    </div>
  );
};

export default TokenDataInfo;
