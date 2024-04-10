const formatNumber = (n: number, maxDecimals: number) => {
  if (n === 0) return '0'; // Handle zero case explicitly

  const zeroes = Math.floor(Math.log10(Math.abs(n)));
  let postfix = '';
  let divisor = 1;

  if (zeroes >= 15) {
    postfix = 'Q';
    divisor = 1e15;
  } else if (zeroes >= 12) {
    postfix = 'T';
    divisor = 1e12;
  } else if (zeroes >= 9) {
    postfix = 'B';
    divisor = 1e9;
  } else if (zeroes >= 6) {
    postfix = 'M';
    divisor = 1e6;
  }

  // Adjust number by divisor and calculate how many decimal places to show
  n /= divisor;
  const decimalPlacesToShow = Math.min(
    maxDecimals,
    maxDecimals - Math.max(zeroes - 6, 0),
  );

  // Format number with toLocaleString for localization and formatting
  return (
    n.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: Math.max(decimalPlacesToShow, 2),
    }) + postfix
  );
};

export default formatNumber;
