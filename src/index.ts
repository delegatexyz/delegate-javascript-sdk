import { ethers } from 'ethers';
import { ADDRESS, ABI } from './constants.js';
import { getDefaultProvider, getDelegationType } from './utils.js';

const delegationInterface = new ethers.utils.Interface(ABI);

function getSigner(provider: any): ethers.Signer | null {
  try {
    return provider.getSigner();
  } catch {
    return null;
  }
}

export const DelegateCash = class {
  provider: ethers.providers.Provider;
  signer: ethers.Signer;
  delegationContract: ethers.Contract;

  constructor(
    provider: ethers.providers.Provider | ethers.providers.ExternalProvider = null,
    providerType: 'ethers' | 'web3' = 'ethers',
  ) {
    this.provider = getDefaultProvider();
    this.signer = getSigner(this.provider);

    if (provider) {
      if (providerType === 'ethers') this.provider = provider as ethers.providers.Provider;
      if (providerType === 'web3')
        this.provider = new ethers.providers.Web3Provider(provider as ethers.providers.ExternalProvider);
      this.signer = getSigner(provider);
    }

    this.delegationContract = new ethers.Contract(ADDRESS, ABI, this.provider);
  }

  // READS
  checkDelegateForAll = async (delegate: string, vault: string): Promise<boolean> => {
    return await this.delegationContract.callStatic.checkDelegateForAll(delegate, vault);
  };

  checkDelegateForContract = async (delegate: string, vault: string, contract: string): Promise<boolean> => {
    return await this.delegationContract.callStatic.checkDelegateForContract(delegate, vault, contract);
  };

  checkDelegateForToken = async (
    delegate: string,
    vault: string,
    contract: string,
    tokenId: number,
  ): Promise<boolean> => {
    return await this.delegationContract.callStatic.checkDelegateForToken(delegate, vault, contract, tokenId);
  };

  getContractLevelDelegations = async (vault: string): Promise<{ contract: string; delegate: string }[]> => {
    const delegations = await this.delegationContract.callStatic.getContractLevelDelegations(vault);
    return delegations.map((d) => {
      return {
        contract: d[0],
        delegate: d[1],
      };
    });
  };

  getDelegatesForAll = async (vault: string): Promise<string[]> => {
    return await this.delegationContract.callStatic.getDelegatesForAll(vault);
  };

  getDelegatesForContract = async (vault: string, contract: string): Promise<string[]> => {
    return await this.delegationContract.callStatic.getDelegatesForContract(vault, contract);
  };

  getDelegatesForToken = async (vault: string, contract: string, tokenId: number): Promise<string[]> => {
    return await this.delegationContract.callStatic.getDelegatesForToken(vault, contract, tokenId);
  };

  getDelegationsByDelegate = async (
    delegate: string,
  ): Promise<
    {
      type: 'NONE' | 'ALL' | 'CONTRACT' | 'TOKEN';
      vault: string;
      delegate: string;
      contract: string;
      tokenId: number;
    }[]
  > => {
    const delegations = await this.delegationContract.callStatic.getDelegationsByDelegate(delegate);
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

  getTokenLevelDelegations = async (
    vault: string,
  ): Promise<{ contract: string; tokenId: number; delegate: string }[]> => {
    const delegations = await this.delegationContract.callStatic.getTokenLevelDelegations(vault);
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
  delegateForAll = async (delegate: string, value: boolean) => {
    return await this.delegationContract.connect(this.signer).delegateForAll(delegate, value);
  };

  delegateForContract = async (delegate: string, contract: string, value: boolean) => {
    return await this.delegationContract.connect(this.signer).delegateForContract(delegate, contract, value);
  };

  delegateForToken = async (delegate: string, contract: string, tokenId: number, value: boolean) => {
    return await this.delegationContract.connect(this.signer).delegateForToken(delegate, contract, tokenId, value);
  };

  revokeAllDelegates = async () => {
    return await this.delegationContract.connect(this.signer).revokeAllDelegates();
  };

  revokeDelegate = async (delegate: string) => {
    return await this.delegationContract.connect(this.signer).revokeDelegate(delegate);
  };

  revokeSelf = async (vault: string) => {
    return await this.delegationContract.connect(this.signer).revokeSelf(vault);
  };
};

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
