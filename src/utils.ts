import { ethers } from 'ethers';

export const getDelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'TOKEN'];
  return types[key] || 'NONE';
};

export const getProvider = () => {
  if (typeof process !== 'undefined' && process.env?.PROVIDER_URL)
    return new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
  // @ts-ignore
  if (typeof window === 'undefined') return new ethers.providers.getDefaultProvider();
  // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return ethers.providers.getDefaultProvider();
};
