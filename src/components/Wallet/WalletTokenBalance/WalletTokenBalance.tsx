import formatNumber from '@/utils/formatNumber';

const WalletTokenBalance =  ({ token }: IWalletTokenPrice) => {
  const balance = token?.balance;
  const tokenValue = token?.value;

  let balanceText = '';
  let tokenValueText = '';

  if (balance < 0.000001) {
    balanceText = '<0.000001';
  } else if (balance < 1) {
    balanceText = formatNumber(Number(balance), 6);
  } else if (balance > 1) {
    balanceText = formatNumber(Number(balance), 3);
  } else {
    balanceText = '-';
  }

  if (tokenValue < 0.00001) {
    tokenValueText = '<$0.00001';
  } else if (tokenValue > 0) {
    tokenValueText = `$${formatNumber(Number(tokenValue), 3)}`;
  } else if (tokenValue < 0) {
    formatNumber(Number(balance), 5);
  } else {
    tokenValueText = '$0';
  }

  return (
    <div>
      <h4>{tokenValueText}</h4>
      <h3
        style={{
          marginBottom: '0.2rem',
        }}
      >
        {balanceText}
      </h3>
    </div>
  );
};

export default WalletTokenBalance;
