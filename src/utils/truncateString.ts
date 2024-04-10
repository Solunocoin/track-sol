function truncateString(text: string, limit: number) {
  if (text.length > limit) {
    return text.substring(0, limit - 2) + '..';
  } else {
    return text;
  }
}

export default truncateString;
