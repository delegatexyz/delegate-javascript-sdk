import { hexToString, stringToHex } from 'viem';

export const getV1DelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'TOKEN'];
  return types[key] || 'NONE';
};

export const getV2DelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'ERC721', 'ERC20', 'ERC1155'];
  return types[key] || 'NONE';
};

export const rightsToHex = (rights: string = ''): `0x${string}` => {
  return stringToHex(rights, { size: 32 });
};

export const hexToRights = (rights: `0x${string}`): string => {
  const str = hexToString(rights, { size: 32 });
  return str.replace(/\0/g, '');
};
