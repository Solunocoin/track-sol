const WalletTokenPrice = ({ token }: IWalletTokenPrice) => {
  let priceChange = 0;

  if (token.priceChange.h24) {
    priceChange = token.priceChange.h24;
  } else if (token.priceChange.h6) {
    priceChange = token.priceChange.h6;
  } else {
    priceChange = token.priceChange.h1;
  }

  return (
    <div>
      <h4>${token?.price}</h4>
      <h3
        style={{
          marginBottom: '0.2rem',
          color: priceChange > 0 ? 'green' : 'red',
        }}
      >
        {priceChange.toFixed(2)}%
      </h3>
    </div>
  );
};

export default WalletTokenPrice;
