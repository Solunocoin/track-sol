import { PublicKey } from '@solana/web3.js';
import {
  Commitment,
  Encoding,
  Network,
  Solana,
  TatumSDK,
} from '@tatumio/tatum';
import puppeteer from 'puppeteer';
import { createConnectionWithRetry } from '../../../../../lib/solana';

const TokenHolders = async ({ tokenAddress }: ITokenHolders) => {
  let holdersText = `Unavailable`;

  try {
    const connection = await createConnectionWithRetry();
    const tatum = await TatumSDK.init<Solana>({
      network: Network.SOLANA,
      apiKey: 't-661849d1acc02b001cc17141-890aa37e5291467ab8632a83',
    });

    const acc = await connection.getAccountInfo(new PublicKey(tokenAddress));

    const programId = acc?.owner.toBase58();

    const res = await tatum.rpc.getProgramAccounts(programId as string, {
      encoding: Encoding.JsonParsed,
      commitment: Commitment.Confirmed,
      filters: [
        {
          dataSize: 165,
        },
        {
          memcmp: {
            offset: 0,
            bytes: tokenAddress,
          },
        },
      ],
    });

    const activeHolders = res.result?.filter(
      (wallet) => wallet.account.data?.parsed?.info.tokenAmount.uiAmount > 0,
    );

    console.log('activeHolders', activeHolders?.length);

    holdersText = activeHolders?.length?.toString() || `Unavailable`;

    // const holders = await getTokenHolders(tokenAddress);
  } catch (error) {
    const url = `https://solscan.io/token/${tokenAddress}`;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    await page.waitForSelector('#__next', {
      visible: true,
    });

    // Extract some data or perform actions
    const result = await page.evaluate(() => {
      const firstChildDiv = document.querySelector('#__next > div');

      const text = firstChildDiv?.innerText;

      const lines = text.split('\n'); // Splitting text into lines
      let holdersLineIndex = lines.findIndex((line) =>
        line.includes('Holders'),
      ); // Find index of the line containing 'Holders'
      return holdersLineIndex !== -1
        ? lines[holdersLineIndex + 1].trim()
        : 'Holders data not found'; // Return the next line if found
    });

    console.log('NUMBER OF HOLDERS', parseFloat(result));

    console.log('holderssss', result);
    holdersText = result;
    await browser.close();
  }

  return <h4>{holdersText}</h4>;
};

export default TokenHolders;
