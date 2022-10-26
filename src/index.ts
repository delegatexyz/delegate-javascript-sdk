import { ethers } from 'ethers';
import { ADDRESS, ABI } from './constants';
import { getProvider, getDelegationType } from './utils';

let provider, signer, delegationInterface, delegationContract;

try {
  provider = getProvider();
  signer = provider.getSigner();
  delegationInterface = new ethers.utils.Interface(ABI);
  delegationContract = new ethers.Contract(ADDRESS, ABI, provider);
}
catch {
  console.log("No signer found");
}

// READS
export const checkDelegateForAll = async (delegate: string, vault: string): Promise<boolean> => {
  return await delegationContract.callStatic.checkDelegateForAll(delegate, vault);
};

export const checkDelegateForContract = async (delegate: string, vault: string, contract: string): Promise<boolean> => {
  return await delegationContract.callStatic.checkDelegateForContract(delegate, vault, contract);
};

export const checkDelegateForToken = async (
  delegate: string,
  vault: string,
  contract: string,
  tokenId: number,
): Promise<boolean> => {
  return await delegationContract.callStatic.checkDelegateForToken(delegate, vault, contract, tokenId);
};

export const getContractLevelDelegations = async (vault: string): Promise<{ contract: string; delegate: string }[]> => {
  const delegations = await delegationContract.callStatic.getContractLevelDelegations(vault);
  return delegations.map((d) => {
    return {
      contract: d[0],
      delegate: d[1],
    };
  });
};

export const getDelegatesForAll = async (vault: string): Promise<string[]> => {
  return await delegationContract.callStatic.getDelegatesForAll(vault);
};

export const getDelegatesForContract = async (vault: string, contract: string): Promise<string[]> => {
  return await delegationContract.callStatic.getDelegatesForContract(vault, contract);
};

export const getDelegatesForToken = async (vault: string, contract: string, tokenId: number): Promise<string[]> => {
  return await delegationContract.callStatic.getDelegatesForToken(vault, contract, tokenId);
};

export const getDelegationsByDelegate = async (
  delegate: string,
): Promise<
  { type: 'NONE' | 'ALL' | 'CONTRACT' | 'TOKEN'; vault: string; delegate: string; contract: string; tokenId: number }[]
> => {
  const delegations = await delegationContract.callStatic.getDelegationsByDelegate(delegate);
  return delegations.map((d) => {
    return {
      type: getDelegationType(d[0]),
      vault: d[1],
      delegate: d[2],
      contract: d[3],
      tokenId: Number(d[4]),
    };
  });
};

export const getTokenLevelDelegations = async (
  vault: string,
): Promise<{ contract: string; tokenId: number; delegate: string }[]> => {
  const delegations = await delegationContract.callStatic.getTokenLevelDelegations(vault);
  return delegations.map((d) => {
    return {
      contract: d[0],
      tokenId: Number(d[1]),
      delegate: d[2],
    };
  });
};

//////

// WRITES
export const delegateForAll = async (delegate: string, value: boolean) => {
  return await delegationContract.connect(signer).delegateForAll(delegate, value);
};

export const delegateForContract = async (delegate: string, contract: string, value: boolean) => {
  return await delegationContract.connect(signer).delegateForContract(delegate, contract, value);
};

export const delegateForToken = async (delegate: string, contract: string, tokenId: number, value: boolean) => {
  return await delegationContract.connect(signer).delegateForToken(delegate, contract, tokenId, value);
};

export const revokeAllDelegates = async () => {
  return await delegationContract.connect(signer).revokeAllDelegates();
};

export const revokeDelegate = async (delegate: string) => {
  return await delegationContract.connect(signer).revokeDelegate(delegate);
};

export const revokeSelf = async (vault: string) => {
  return await delegationContract.connect(signer).revokeSelf(vault);
};

// RAW

export const rawDelegateForAll = (delegate: string, value: boolean) => {
  return delegationInterface.encodeFunctionData('delegateForAll', [delegate, value]);
};

export const rawDelegateForContract = (delegate: string, contract: string, value: boolean) => {
  return delegationInterface.encodeFunctionData('delegateForContract', [delegate, contract, value]);
};

export const rawDelegateForToken = (delegate: string, contract: string, tokenId: number, value: boolean) => {
  return delegationInterface.encodeFunctionData('delegateForToken', [delegate, contract, tokenId, value]);
};

export const rawRevokeAllDelegates = () => {
  return delegationInterface.encodeFunctionData('revokeAllDelegates');
};

export const rawRevokeDelegate = (delegate: string) => {
  return delegationInterface.encodeFunctionData('revokeDelegate', [delegate]);
};
