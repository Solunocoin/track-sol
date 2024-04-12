function isNumeric(value: string): boolean {
  const numericOnly = value.replace(/,/g, ''); // Remove commas
  return !isNaN(Number(numericOnly)) && !isNaN(parseFloat(numericOnly));
}

export default isNumeric;
