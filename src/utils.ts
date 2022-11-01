import { ethers } from 'ethers';

export const getDelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'TOKEN'];
  return types[key] || 'NONE';
};

export const getProvider = (): ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider => {
  
  if (typeof process !== 'undefined' && process.env?.PROVIDER_URL)
    return new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);
  
    // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window.ethereum);
  }

  return null;
};
