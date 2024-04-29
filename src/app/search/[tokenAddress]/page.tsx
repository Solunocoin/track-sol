import Card from '@/components/Card/Card';
import Main from '@/components/Main/Main';
import TokenInfo from '@/components/Token/Client/TokenInfo/TokenInfo';
import TokenMoreDetails from '@/components/Token/Client/TokenMoreDetails/TokenMoreDetails';
import TokenDetails from '@/components/Token/Server/TokenDetails/TokenDetails';
import TokenLinks from '@/components/Token/Server/TokenLinks/TokenLinks';
import getTokensBestPair from '@/utils/getTokensBestPair';

type Props = {
  params: { tokenAddress: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const tokenAddress = async ({ params }: Props) => {
  const bestPair = await getTokensBestPair(params.tokenAddress);

  if (!bestPair.data) {
    throw new Error('Could not find best pair');
  }

  return (
    <Main>
      <Card>
        <TokenInfo
          tokenAddress={params.tokenAddress}
          tokenBestPair={bestPair.data}
        />
        <TokenDetails
          tokenAddress={params.tokenAddress}
          tokenBestPair={bestPair.data}
        />
        <TokenLinks tokenBestPair={bestPair.data} tokenAddress={params.tokenAddress} />
        <TokenMoreDetails
          tokenAddress={params.tokenAddress}
          tokenBestPair={bestPair.data}
        />
        {/* <TokenConnectWallet tokenAddress={params.tokenAddress} /> */}
      </Card>
    </Main>
  );
};

export default tokenAddress;
