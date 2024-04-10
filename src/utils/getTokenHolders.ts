// Array of endpoints to cycle through
const urls = [
  'https://mainnet.helius-rpc.com/?api-key=4ca86fba-27ab-474e-a1c2-08ec85212009',
  'https://mainnet.helius-rpc.com/?api-key=57ec5395-79e8-4132-a656-f8ff78d01019',
  'https://mainnet.helius-rpc.com/?api-key=85a3b06c-4731-437c-8acc-21523bc03983',
];

// Helper function to delay the execution for a given number of milliseconds
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getTokenHolders = async (tokenAddress: string) => {
  let page = 1;
  let allOwners = new Set();
  let currentUrlIndex = 0; // Start with the first URL

  while (true) {
    try {
      const response = await fetch(urls[currentUrlIndex], {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: 'getTokenAccounts',
          id: 'helius-test',
          params: {
            page: page,
            limit: 1000,
            displayOptions: {},
            mint: tokenAddress,
          },
        }),
      });
      const data = await response.json();

      // Check for rate limit or other errors in response
      if (data.error && data.error.code === -32429) {
        // Assuming 429 is the rate limit error code
        console.log(
          `Rate limit hit on ${urls[currentUrlIndex]}, switching endpoint...`,
        );
        currentUrlIndex = (currentUrlIndex + 1) % urls.length; // Switch to the next URL

        if (currentUrlIndex === 0) {
          // If we've looped back to the first URL
          await delay(1000); // Wait for 1 second before retrying
        }
        continue; // Retry the request with a new endpoint or after a delay
      }

      if (!data.result || data.result.token_accounts.length === 0) {
        console.log(`No more results. Total pages: ${page - 1}`);
        break;
      }

      data.result.token_accounts.forEach((account: any) =>
        allOwners.add(account.owner),
      );
      page++;
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle other potential errors here
    }
  }

  return Array.from(allOwners);
};

export default getTokenHolders;
