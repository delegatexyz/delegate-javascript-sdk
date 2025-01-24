export const getV1DelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'TOKEN'];
  return types[key] || 'NONE';
};

export const getV2DelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'ERC721', 'ERC20', 'ERC1155'];
  return types[key] || 'NONE';
};

export const EMPTY_RIGHTS = '0x0000000000000000000000000000000000000000000000000000000000000000';
