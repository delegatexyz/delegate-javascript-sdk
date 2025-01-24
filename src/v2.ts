import {
  PublicClient,
  Account,
  Address,
  createPublicClient,
  WalletClient,
  createWalletClient,
  Chain,
  Transport,
  encodeFunctionData,
} from 'viem';
import { mainnet } from 'viem/chains';
import { ADDRESS, ADDRESS_ZKSYNC, ABI } from './contracts/v2.js';
import { getV2DelegationType, EMPTY_RIGHTS } from './utils.js';

export type V2Delegation = {
  type: string;
  to: `0x${string}`;
  from: `0x${string}`;
  contract: `0x${string}`;
  rights: `0x${string}`;
  tokenId: number;
  amount?: number;
};

export const DelegateV2 = class {
  publicClient: PublicClient;
  walletClient: WalletClient;
  account?: Account | Address;
  contractConfig = {
    address: ADDRESS,
    abi: ABI,
  };

  constructor({
    userTransport,
    chain = mainnet,
    isZkSync = false,
    account,
  }: {
    userTransport: Transport;
    chain?: Chain;
    isZkSync?: boolean;
    account?: Account | Address;
  }) {
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
    this.contractConfig.address = isZkSync ? ADDRESS_ZKSYNC : ADDRESS;
  }

  // READS
  checkDelegateForAll = async (
    to: `0x${string}`,
    from: `0x${string}`,
    rights: `0x${string}` = EMPTY_RIGHTS,
  ): Promise<boolean> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForAll',
      args: [to, from, rights],
    })) as boolean;
  };

  checkDelegateForContract = async (
    to: `0x${string}`,
    from: `0x${string}`,
    contract: `0x${string}`,
    rights: `0x${string}` = EMPTY_RIGHTS,
  ): Promise<boolean> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForContract',
      args: [to, from, contract, rights],
    })) as boolean;
  };

  checkDelegateForERC1155 = async (
    to: `0x${string}`,
    from: `0x${string}`,
    contract: `0x${string}`,
    tokenId: number,
    rights: `0x${string}` = EMPTY_RIGHTS,
  ): Promise<number> => {
    const amount = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForERC1155',
      args: [to, from, contract, BigInt(tokenId), rights],
    });
    return Number(amount);
  };

  checkDelegateForERC20 = async (
    to: `0x${string}`,
    from: `0x${string}`,
    contract: `0x${string}`,
    rights: `0x${string}` = EMPTY_RIGHTS,
  ): Promise<number> => {
    const amount = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForERC20',
      args: [to, from, contract, rights],
    });
    return Number(amount);
  };

  checkDelegateForERC721 = async (
    to: `0x${string}`,
    from: `0x${string}`,
    contract: `0x${string}`,
    tokenId: number,
    rights: `0x${string}` = EMPTY_RIGHTS,
  ): Promise<boolean> => {
    return (await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'checkDelegateForERC721',
      args: [to, from, contract, BigInt(tokenId), rights],
    })) as boolean;
  };

  getIncomingDelegations = async (to: `0x${string}`): Promise<V2Delegation[]> => {
    const delegations = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getIncomingDelegations',
      args: [to],
    });
    return delegations.map((d) => {
      return {
        type: getV2DelegationType(d.type_),
        to: d.to,
        from: d.from,
        contract: d.contract_,
        rights: d.rights,
        tokenId: Number(d.tokenId),
        amount: Number(d.amount),
      };
    });
  };

  getOutgoingDelegations = async (from: `0x${string}`): Promise<V2Delegation[]> => {
    const delegations = await this.publicClient.readContract({
      ...this.contractConfig,
      functionName: 'getOutgoingDelegations',
      args: [from],
    });
    return delegations.map((d) => {
      return {
        type: getV2DelegationType(d.type_),
        to: d.to,
        from: d.from,
        contract: d.contract_,
        rights: d.rights,
        tokenId: Number(d.tokenId),
        amount: Number(d.amount),
      };
    });
  };

  //////

  // WRITES
  delegateAll = async (to: `0x${string}`, rights: `0x${string}` = EMPTY_RIGHTS, enable: boolean) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateAll',
      args: [to, rights, enable],
    });
    return await this.walletClient.writeContract(request);
  };

  delegateContract = async (
    to: `0x${string}`,
    contract: `0x${string}`,
    rights: `0x${string}` = EMPTY_RIGHTS,
    enable: boolean,
  ) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateContract',
      args: [to, contract, rights, enable],
    });
    return await this.walletClient.writeContract(request);
  };

  delegateERC1155 = async (
    to: `0x${string}`,
    contract: `0x${string}`,
    tokenId: number,
    rights: `0x${string}` = EMPTY_RIGHTS,
    amount: number,
  ) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateERC1155',
      args: [to, contract, BigInt(tokenId), rights, BigInt(amount)],
    });
    return await this.walletClient.writeContract(request);
  };

  delegateERC20 = async (
    to: `0x${string}`,
    contract: `0x${string}`,
    rights: `0x${string}` = EMPTY_RIGHTS,
    amount: number,
  ) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateERC20',
      args: [to, contract, rights, BigInt(amount)],
    });
    return await this.walletClient.writeContract(request);
  };

  delegateERC721 = async (
    to: `0x${string}`,
    contract: `0x${string}`,
    tokenId: number,
    rights: `0x${string}` = EMPTY_RIGHTS,
    enable: boolean,
  ) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'delegateERC721',
      args: [to, contract, BigInt(tokenId), rights, enable],
    });
    return await this.walletClient.writeContract(request);
  };

  multicall = async (data: `0x${string}`[]) => {
    if (!this.account) {
      throw new Error('No account provided');
    }
    const { request } = await this.publicClient.simulateContract({
      ...this.contractConfig,
      account: this.account,
      functionName: 'multicall',
      args: [data],
    });
    return await this.walletClient.writeContract(request);
  };
};

export const rawDelegateAll = (to: `0x${string}`, rights: `0x${string}` = EMPTY_RIGHTS, enable: boolean) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateAll',
    args: [to, rights, enable],
  });
};

export const rawDelegateContract = (
  to: `0x${string}`,
  contract: `0x${string}`,
  rights: `0x${string}` = EMPTY_RIGHTS,
  enable: boolean,
) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateContract',
    args: [to, contract, rights, enable],
  });
};

export const rawDelegateERC1155 = (
  to: `0x${string}`,
  contract: `0x${string}`,
  tokenId: number,
  rights: `0x${string}` = EMPTY_RIGHTS,
  amount: number,
) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateERC1155',
    args: [to, contract, BigInt(tokenId), rights, BigInt(amount)],
  });
};

export const rawDelegateERC20 = (
  to: `0x${string}`,
  contract: `0x${string}`,
  rights: `0x${string}` = EMPTY_RIGHTS,
  amount: number,
) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateERC20',
    args: [to, contract, rights, BigInt(amount)],
  });
};

export const rawDelegateERC721 = (
  to: `0x${string}`,
  contract: `0x${string}`,
  tokenId: number,
  rights: `0x${string}` = EMPTY_RIGHTS,
  enable: boolean,
) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'delegateERC721',
    args: [to, contract, BigInt(tokenId), rights, enable],
  });
};

export const rawMulticall = (data: `0x${string}`[]) => {
  return encodeFunctionData({
    abi: ABI,
    functionName: 'multicall',
    args: [data],
  });
};
