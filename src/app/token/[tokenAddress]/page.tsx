import Card from '@/components/Card/Card';
import Main from '@/components/Main/Main';
import TokenConnectWallet from '@/components/Token/Client/TokenConnectWallet/TokenConnectWallet';
import TokenDetails from '@/components/Token/Client/TokenDetails/TokenDetails';
import TokenInfo from '@/components/Token/Client/TokenInfo/TokenInfo';
import TokenLinks from '@/components/Token/Client/TokenLinks/TokenLinks';
import TokenMoreDetails from '@/components/Token/Client/TokenMoreDetails/TokenMoreDetails';

type Props = {
  params: { tokenAddress: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const tokenAddress = ({ params }: Props) => {
  return (
    <Main>
      <Card>
        <TokenInfo tokenAddress={params.tokenAddress} />
        <TokenDetails tokenAddress={params.tokenAddress} />
        <TokenLinks tokenAddress={params.tokenAddress} />
        <TokenMoreDetails tokenAddress={params.tokenAddress} />
        <TokenConnectWallet tokenAddress={params.tokenAddress} />
      </Card>
    </Main>
  );
};

export default tokenAddress;
