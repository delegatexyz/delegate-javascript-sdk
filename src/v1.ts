import {
  PublicClient,
  Account,
  Address,
  createPublicClient,
  WalletClient,
  createWalletClient,
  Chain,
  Transport,
  http,
  encodeFunctionData,
} from 'viem';
import { mainnet } from 'viem/chains';
import { ADDRESS, ABI } from './contracts/v1.js';
import { getV1DelegationType } from './utils.js';

export type V1Delegation = {
  type: string;
  vault: `0x${string}`;
  delegate: `0x${string}`;
  contract: `0x${string}`;
  tokenId: number;
};

export const DelegateV1 = class {
  publicClient: PublicClient;
  walletClient: WalletClient;
  account?: Account | Address;
  contractConfig = {
    address: ADDRESS,
    abi: ABI,
  };

  constructor(chain: Chain = mainnet, userTransport: Transport = http(), account?: Account | Address) {
    this.publicClient = createPublicClient({
      chain,
      transport: userTransport,
    });
    this.walletClient = createWalletClient({
      account,
      chain,
      transport: userTransport,
    });
    this.account = account;
  }

  // READS
  checkDelegateForAll = async (delegate: `0x${string}`, vault: `0x${string}`): Promise<boolean> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForAll',
      args: [delegate, vault],
    })) as boolean;
  };

  checkDelegateForContract = async (
    delegate: `0x${string}`,
    vault: `0x${string}`,
    contract: `0x${string}`,
  ): Promise<boolean> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForContract',
      args: [delegate, vault, contract],
    })) as boolean;
  };

  checkDelegateForToken = async (
    delegate: `0x${string}`,
    vault: `0x${string}`,
    contract: `0x${string}`,
    tokenId: number,
  ): Promise<boolean> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForToken',
      args: [delegate, vault, contract, BigInt(tokenId)],
    })) as boolean;
  };

  getContractLevelDelegations = async (
    vault: `0x${string}`,
  ): Promise<{ contract: `0x${string}`; delegate: `0x${string}` }[]> => {
    const delegations = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getContractLevelDelegations',
      args: [vault],
    });
    return delegations.map((d) => {
      return {
        contract: d.contract_,
        delegate: d.delegate,
      };
    });
  };

  getDelegatesForAll = async (vault: `0x${string}`): Promise<`0x${string}`[]> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getDelegatesForAll',
      args: [vault],
    })) as `0x${string}`[];
  };

  getDelegatesForContract = async (vault: `0x${string}`, contract: `0x${string}`): Promise<`0x${string}`[]> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getDelegatesForContract',
      args: [vault, contract],
    })) as `0x${string}`[];
  };

  getDelegatesForToken = async (
    vault: `0x${string}`,
    contract: `0x${string}`,
    tokenId: number,
  ): Promise<`0x${string}`[]> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getDelegatesForToken',
      args: [vault, contract, BigInt(tokenId)],
    })) as `0x${string}`[];
  };

  getDelegationsByDelegate = async (delegate: `0x${string}`): Promise<V1Delegation[]> => {
    const delegations = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getDelegationsByDelegate',
      args: [delegate],
    });
    return delegations.map((d) => {
      return {
        type: getV1DelegationType(d.type_),
        vault: d.vault,
        delegate: d.delegate,
        contract: d.contract_,
        tokenId: Number(d.tokenId),
      };
    });
  };

  getTokenLevelDelegations = async (
    vault: `0x${string}`,
  ): Promise<{ contract: `0x${string}`; tokenId: number; delegate: `0x${string}` }[]> => {
    const delegations = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getTokenLevelDelegations',
      args: [vault],
    });
    return delegations.map((d) => {
      return {
        contract: d.contract_,
        tokenId: Number(d.tokenId),
        delegate: d.delegate,
      };
    });
  };

  //////

  // WRITES
  delegateForAll = async (delegate: `0x${string}`, value: boolean) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateForAll',
      args: [delegate, value],
    });
    return await this.walletClient.writeContract(request);
  };

  delegateForContract = async (delegate: `0x${string}`, contract: `0x${string}`, value: boolean) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateForContract',
      args: [delegate, contract, value],
    });
    return await this.walletClient.writeContract(request);
  };

  delegateForToken = async (delegate: `0x${string}`, contract: `0x${string}`, tokenId: number, value: boolean) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateForToken',
      args: [delegate, contract, BigInt(tokenId), value],
    });
    return await this.walletClient.writeContract(request);
  };

  revokeAllDelegates = async () => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'revokeAllDelegates',
    });
    return await this.walletClient.writeContract(request);
  };

  revokeDelegate = async (delegate: `0x${string}`) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'revokeDelegate',
      args: [delegate],
    });
    return await this.walletClient.writeContract(request);
  };

  revokeSelf = async (vault: `0x${string}`) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'revokeSelf',
      args: [vault],
    });
    return await this.walletClient.writeContract(request);
  };
};

export const rawDelegateForAll = (delegate: `0x${string}`, value: boolean) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateForAll',
    args: [delegate, !!value],
  });
};

export const rawDelegateForContract = (delegate: `0x${string}`, contract: `0x${string}`, value: boolean) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateForContract',
    args: [delegate, contract, !!value],
  });
};

export const rawDelegateForToken = (
  delegate: `0x${string}`,
  contract: `0x${string}`,
  tokenId: number,
  value: boolean,
) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateForToken',
    args: [delegate, contract, BigInt(tokenId), !!value],
  });
};

export const rawRevokeAllDelegates = () => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'revokeAllDelegates',
  });
};

export const rawRevokeDelegate = (delegate: `0x${string}`) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'revokeDelegate',
    args: [delegate],
  });
};
