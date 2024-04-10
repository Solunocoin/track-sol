// Import the Connection class from @solana/web3.js
import { Connection } from '@solana/web3.js';

// Define your API keys
const RPCS = [
  'https://solana-mainnet.g.alchemy.com/v2/XQdIftX7HZ9djfNYjv5JJvYFkcxWEbmd',
  'https://black-spring-slug.solana-mainnet.quiknode.pro/2dd9ff1cc046bf9e36cb4bcd8f2e98d578c72c7e/',
];

// This function attempts to create a connection with each API key
const createConnectionWithRetry = async () => {
  let lastError = null;

  for (const rpc of RPCS) {
    try {
      const connection = new Connection(rpc);

      // Example validation check (customize as needed)
      // For instance, try fetching recent blockhash to test connection
      const { blockhash } = await connection.getLatestBlockhash();

      if (blockhash) {
        console.log('Successfully connected with API Key:', rpc);
        return connection; // Connection is successful
      }
    } catch (error) {
      console.error(`Connection failed with API Key ${rpc}:`, error);
      lastError = error;
      // Continue to try the next API key
    }
  }

  // If all API keys fail, throw the last encountered error
  throw new Error(`All connections failed: ${lastError || 'Unknown error'}`);
};

// Export the connection function for use throughout your project
export { createConnectionWithRetry };
