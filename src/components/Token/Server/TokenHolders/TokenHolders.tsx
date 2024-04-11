import getTokenHolders from '@/utils/getTokenHolders';
import isNumeric from '@/utils/isNumeric';
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

    const accountInfo = await connection.getAccountInfo(
      new PublicKey(tokenAddress),
    );

    const programId = accountInfo?.owner.toBase58();

    const allHolders = await Promise.race([
      tatum.rpc.getProgramAccounts(programId as string, {
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
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 3000),
      ),
    ]);

    // @ts-ignore - data doesn't have parsed as a type
    const activeHolders = allHolders?.result?.filter(
      // @ts-ignore - data doesn't have parsed as a type
      (wallet) => wallet.account.data?.parsed?.info.tokenAmount.uiAmount > 0,
    );

    if (activeHolders?.length === 0) {
      throw new Error('No holders found');
    }

    holdersText = activeHolders?.length?.toString() || `Unavailable`;

    // const holders = await getTokenHolders(tokenAddress);
  } catch (error) {
    try {
      const url = `https://solscan.io/token/${tokenAddress}`;
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle0' });

      await page.waitForSelector('#__next', {
        visible: true,
      });

      // Extract some data or perform actions
      const result = await page.evaluate(() => {
        const firstChildDiv = document.querySelector(
          '#__next > div',
        ) as HTMLElement;

        const text = firstChildDiv?.innerText;

        const lines = text.split('\n'); // Splitting text into lines
        let holdersLineIndex = lines.findIndex((line) =>
          line.includes('Holders'),
        ); // Find index of the line containing 'Holders'
        return holdersLineIndex !== -1
          ? lines[holdersLineIndex + 1].trim()
          : 'Holders data not found'; // Return the next line if found
      });

      if (isNumeric(result)) {
        holdersText = result;
      } else {
        throw new Error('Holders data not found');
      }
    } catch (error) {
      try {
        const holders = await getTokenHolders(tokenAddress);
        holdersText = holders.length.toString();
      } catch (error) {
        holdersText = 'Unavailable';
      }
    }
  }

  return <h4>{holdersText}</h4>;
};

export default TokenHolders;
