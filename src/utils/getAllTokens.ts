export async function fetchTokenData(tokenAddresses: string[]) {
  const maxAddressesPerRequest = 30;
  let results: DexScreenerPairType[] = [];

  // Function to chunk the token addresses
  function chunkArray(array: string[], size: number) {
    const chunkedArray = [];

    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }

    return chunkedArray;
  }

  // Chunk the token addresses array
  const chunks = chunkArray(tokenAddresses, maxAddressesPerRequest);

  // Function to fetch data for each chunk
  async function fetchDataForChunk(chunk: string[]) {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${chunk.join(
      ',',
    )}`;

    const response = await fetch(url, {
      cache: 'no-cache',
    });
    // Parse the JSON data
    const data: { pairs: DexScreenerPairType[] } = await response.json();

    // Initialize an object to hold groups of pairs by baseToken.address
    const groups: { [key: string]: DexScreenerPairType[] } = {};

    // Iterate through the pairs array to group them
    data.pairs.forEach((pair) => {
      const baseTokenAddress = pair.baseToken.address;
      if (!groups[baseTokenAddress]) {
        groups[baseTokenAddress] = [];
      }
      groups[baseTokenAddress].push(pair);
    });

    // Now, find the best pair in each group based on liquidity and prepare the final array
    const bestPairs: DexScreenerPairType[] = [];

    Object.keys(groups).forEach((tokenAddress) => {
      let highestLiquidityUSD = 0;
      let bestPair: DexScreenerPairType | null = null;

      groups[tokenAddress].forEach((pair) => {
        const liquidityUSD = pair.liquidity.usd;
        if (liquidityUSD > highestLiquidityUSD) {
          highestLiquidityUSD = liquidityUSD;
          bestPair = pair;
        }
      });

      if (bestPair) {
        bestPairs.push(bestPair);
      }
    });

    return bestPairs;
  }

  // Loop over each chunk, making API calls sequentially
  for (let chunk of chunks) {
    const data = await fetchDataForChunk(chunk);

    results.push(...data); // assuming the API returns an array of results
  }

  return results;
}
