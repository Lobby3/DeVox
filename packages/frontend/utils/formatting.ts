export const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const pageTitle = (title: string) => {
  return `${title} | DeVox`;
};
