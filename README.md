# [@delegatexyz/sdk](https://delegate.xyz) &middot; ![NPM](https://img.shields.io/npm/l/@delegatexyz/sdk?registry_uri=https%3A%2F%2Fregistry.npmjs.com) ![npm (tag)](https://img.shields.io/npm/v/@delegatexyz/sdk/latest) ![npm bundle size](https://img.shields.io/bundlephobia/min/@delegatexyz/sdk) [![Twitter URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2Fdelegatedotxyz)](https://twitter.com/delegatedotxyz)

This is a minimalist frontend implementation of the delegation v1 and v2 registry. Every function has a 1:1 name of the contract ABI.

Read more about the [delegate.xyz](https://delegate.xyz) via our [documentation](https://docs.delegate.xyz)

## Installation

```
npm install @delegatexyz/sdk viem
```

## Usage

The v1 or v2 SDK require the same parameters:

- **transport**: a valid viem [Transport](https://viem.sh/docs/clients/intro.html#transports).
- **chain**: [chain](https://viem.sh/docs/glossary/terms.html#chain) from `viem/chains` (or [define your own](https://viem.sh/docs/clients/chains.html#custom-chains))
- **isZkSync (optional)**: boolean to indicate if the chain is zkSync (v2 only, defaults to false)
- **account (optional)**: A [wallet client](https://viem.sh/docs/clients/wallet.html)

_`account` is only required to use the write functions_.

### Read Example

```ts
import { http } from 'viem';
import { DelegateV1, DelegateV2 } from '@delegatexyz/sdk';

const RPC_URL = 'https://ethereum-rpc.publicnode.com';
const v1 = new DelegateV1(http(RPC_URL));
const v2 = new DelegateV2({ userTransport: http(RPC_URL) });

console.log(
  await v1.checkDelegateForAll(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  ),
);

console.log(
  await v2.checkDelegateForAll(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  ),
);
```

### Write Example

To write transactions, you'll need to pass a [wallet client](https://viem.sh/docs/clients/wallet.html).

```ts
import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { DelegateV1, DelegateV2 } from '@delegatexyz/sdk';

const account = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const RPC_URL = 'https://ethereum-rpc.publicnode.com';
const v1 = new DelegateV1(http(), mainnet, account);
const v2 = new DelegateV2({ userTransport: http(RPC_URL), chain: mainnet, account });

console.log(
  await v1.delegateForAll('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'),
);

console.log(
  await v2.delegateAll(
    '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    true,
  ),
);
```

## API

### v2

#### View Functions

- checkDelegateForAll(to, from, rights)
- checkDelegateForContract(to, from, contract, rights)
- checkDelegateForERC1155(to, from, contract, tokenId, rights)
- checkDelegateForERC20(to, from, contract, rights)
- checkDelegateForERC721(to, from, contract, tokenId, rights)
- getIncomingDelegations(to)
- getOutgoingDelegations(from)

#### Write Functions

- delegateAll(to, right, enable)
- delegateContract(to, contract, rights, enable)
- delegateERC1155(to, contract, tokenId, rights, amount)
- delegateERC20(to, contract, rights, enable)
- delegateERC721(to, contract, tokenId, rights, enable)
- multicall(calls)

#### Raw Functions

These function calls will return back the encoded function data.

- rawDelegateAll(to, right, enable)
- rawDelegateContract(to, contract, rights, enable)
- rawDelegateERC1155(to, contract, tokenId, rights, amount)
- rawDelegateERC20(to, contract, rights, enable)
- rawDelegateERC721(to, contract, tokenId, rights, enable)
- rawMulticall(calls)

### v1

#### View Functions

- checkDelegateForAll(delegate, vault)
- checkDelegateForContract(delegate, vault, contract)
- checkDelegateForToken(delegate, vault, contract, tokenId)
- getContractLevelDelegations(vault)
- getDelegatesForAll(vault)
- getDelegatesForContract(vault, contract)
- getDelegatesForToken(vault, contract, tokenId)
- getDelegationsByDelegate(delegate)
- getTokenLevelDelegations(vault)

#### Write Functions

- delegateForAll(delegate, value)
- delegateForContract(delegate, contract, value)
- delegateForToken(delegate, contract, tokenId, value)
- revokeAllDelegates()
- revokeDelegate(delegate)
- revokeSelf(vault)

#### Raw Functions

These function calls will return back the encoded function data.

- rawDelegateForAll(delegate, value)
- rawDelegateForContract(delegate, contract, value)
- rawDelegateForToken(delegate, contract, tokenId, value)
- rawRevokeAllDelegates()
- rawRevokeDelegate(delegate)
