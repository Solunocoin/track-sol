import getTokenHolders from "@/utils/getTokenHolders";
import isNumeric from "@/utils/isNumeric";
import { AccountInfo, ParsedAccountData, PublicKey } from "@solana/web3.js";
import puppeteer from "puppeteer";
import { solana } from "../../../../../lib/solana";
const TokenHolders = async ({ tokenAddress }: ITokenHolders) => {
  let holdersText = `Unavailable`;
  if (tokenAddress == "So11111111111111111111111111111111111111112") {
    holdersText = "Not Available";
  } else {
    try {
      const accountInfo = await solana.getAccountInfo(
        new PublicKey(tokenAddress)
      );

      const allHolders = (await Promise.race([
        await solana.getParsedProgramAccounts(accountInfo?.owner as PublicKey, {
          commitment: "confirmed",
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
          setTimeout(() => {
            reject(new Error("Request timed out"));
            return [];
          }, 3000)
        ),
      ])) as {
        pubkey: PublicKey;
        account: AccountInfo<Buffer | ParsedAccountData>;
      }[];

      // console.log('allHolders', allHolders);

      // @ts-ignore - data doesn't have parsed as a type
      const activeHolders = allHolders?.filter(
        // @ts-ignore - data doesn't have parsed as a type
        (wallet) => wallet.account.data?.parsed?.info.tokenAmount.uiAmount > 0
      );

      if (activeHolders?.length === 0) {
        throw new Error("No holders found");
      }

      holdersText = activeHolders?.length?.toString() || `Unavailable`;

      // const holders = await getTokenHolders(tokenAddress);
    } catch (error) {
      console.log("ERROR", error);
      try {
        const url = `https://solscan.io/token/${tokenAddress}`;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        if (!page) {
          throw new Error("Page not found");
        }

        const pageVerify = await page.goto(url, { waitUntil: "networkidle0" });

        if (!pageVerify) {
          throw new Error("Page not found");
        }

        await page.waitForSelector("#__next", {
          visible: true,
        });

        // Extract some data or perform actions
        const result = await page.evaluate(() => {
          const firstChildDiv = document.querySelector(
            "#__next > div"
          ) as HTMLElement;

          const text = firstChildDiv?.innerText;

          const lines = text.split("\n"); // Splitting text into lines
          let holdersLineIndex = lines.findIndex((line) =>
            line.includes("Holders")
          ); // Find index of the line containing 'Holders'
          return holdersLineIndex !== -1
            ? lines[holdersLineIndex + 1].trim()
            : "Holders data not found"; // Return the next line if found
        });

        if (isNumeric(result)) {
          holdersText = result;
        } else {
          throw new Error("Holders data not found");
        }
      } catch (error) {
        try {
          const holders = await getTokenHolders(tokenAddress);
          holdersText = holders.length.toString();
        } catch (error) {
          holdersText = "Unavailable";
        }
      }
    }
  }

  return <h4>{holdersText}</h4>;
};

export default TokenHolders;
