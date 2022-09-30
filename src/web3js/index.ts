import { ADDRESS, ABI } from '../constants';
import { getWeb3, gasFix } from './utils';

const web3 = getWeb3();
const delegationContract = web3 ? new web3.eth.Contract(ABI, ADDRESS) : null;

const getDelegationType = (key: number) => {
  const types = ['NONE', 'ALL', 'CONTRACT', 'TOKEN'];
  return types[key] || 'NONE';
};

// READS
export const checkDelegateForAll = async (delegate: string, vault: string): Promise<boolean> => {
  return await delegationContract.methods.checkDelegateForAll(delegate, vault).call();
};

export const checkDelegateForContract = async (delegate: string, vault: string, contract: string): Promise<boolean> => {
  return await delegationContract.methods.checkDelegateForContract(delegate, vault, contract).call();
};

export const checkDelegateForToken = async (
  delegate: string,
  vault: string,
  contract: string,
  tokenId: number,
): Promise<boolean> => {
  return await delegationContract.methods.checkDelegateForToken(delegate, vault, contract, tokenId).call();
};

export const getContractLevelDelegations = async (vault: string): Promise<{ contract: string; delegate: string }[]> => {
  const delegations = await delegationContract.methods.getContractLevelDelegations(vault).call();
  return delegations.map((d) => {
    return {
      contract: d[0],
      delegate: d[1],
    };
  });
};

export const getDelegatesForAll = async (vault: string): Promise<string[]> => {
  return await delegationContract.methods.getDelegatesForAll(vault).call();
};

export const getDelegatesForContract = async (vault: string, contract: string): Promise<string[]> => {
  return await delegationContract.methods.getDelegatesForContract(vault, contract).call();
};

export const getDelegatesForToken = async (vault: string, contract: string, tokenId: number): Promise<string[]> => {
  return await delegationContract.methods.getDelegatesForToken(vault, contract, tokenId).call();
};

export const getDelegationsByDelegate = async (
  delegate: string,
): Promise<
  { type: 'NONE' | 'ALL' | 'CONTRACT' | 'TOKEN'; vault: string; delegate: string; contract: string; tokenId: number }[]
> => {
  const delegations = await delegationContract.methods.getDelegationsByDelegate(delegate).call();
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
  const delegations = await delegationContract.methods.getTokenLevelDelegations(vault).call();
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
export const delegateForAll = async (from: string, delegate: string, value: boolean) => {
  return await delegationContract.methods.delegateForAll(delegate, value).send({ from, ...gasFix });
};

export const delegateForContract = async (from: string, delegate: string, contract: string, value: boolean) => {
  return await delegationContract.methods.delegateForContract(delegate, contract, value).send({ from, ...gasFix });
};

export const delegateForToken = async (
  from: string,
  delegate: string,
  contract: string,
  tokenId: number,
  value: boolean,
) => {
  return await delegationContract.methods
    .delegateForToken(delegate, contract, tokenId, value)
    .send({ from, ...gasFix });
};

export const revokeDelegate = async (from: string, delegate: string) => {
  return await delegationContract.methods.revokeDelegate(delegate).send({ from, ...gasFix });
};
