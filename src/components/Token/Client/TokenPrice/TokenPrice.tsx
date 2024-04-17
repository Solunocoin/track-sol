import formatNumber from "@/utils/formatNumber";

const TokenPrice = ({tokenBestPair }: ITokenPrice) => {
  let content;

  const tokenPrice = parseFloat(tokenBestPair.priceUsd);
  content =
    tokenPrice < 1
      ? "$" + formatNumber(Number(tokenPrice), 10)
      : tokenPrice > 1
      ? "$" + formatNumber(Number(tokenPrice), 3)
      : "-";
  content = "Not launched";

  return <h4>{content}</h4>;
};

export default TokenPrice;
