import Card from '@/components/Card/Card';
import Main from '@/components/Main/Main';
import WalletTokenList from '@/components/Wallet/WalletTokenList/WalletTokenList';

type Props = {
  params: { walletAddress: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const tokenAddress = ({ params }: Props) => {
  return (
    <Main>
      <Card>
        <WalletTokenList walletAddress={params.walletAddress} />
      </Card>
    </Main>
  );
};

export default tokenAddress;
