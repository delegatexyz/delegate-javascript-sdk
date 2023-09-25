# [delegatecash](https://delegate.cash) &middot; ![NPM](https://img.shields.io/npm/l/delegatecash?registry_uri=https%3A%2F%2Fregistry.npmjs.com) ![npm (tag)](https://img.shields.io/npm/v/delegatecash/latest) ![npm bundle size](https://img.shields.io/bundlephobia/min/delegatecash) [![Twitter URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2Fdelegatecash)](https://twitter.com/delegatecash)

This is a minimalist frontend implementation of the delegation v1 and v2 registry. Every function has a 1:1 name of the contract ABI.

Read more about the [delegate.cash](https://delegate.cash) via our [documentation](https://docs.delegate.cash)

## Installation

```
npm install delegatecash viem
```

## Usage

The v1 or v2 SDK require the same parameters:

- **transport**: a valid viem [Transport](https://viem.sh/docs/clients/intro.html#transports).
- **chain (optional)**: [chain](https://viem.sh/docs/glossary/terms.html#chain) from `viem/chains` (or [define your own](https://viem.sh/docs/clients/chains.html#custom-chains)). Defaults to `mainnet`
- **account (optional)**: A [wallet client](https://viem.sh/docs/clients/wallet.html)

_`account` is only required to use the write functions_.

### Read Example

```
import { http } from "viem"
import { DelegateV1, DelegateV2 } from "delegatecash";

const v1 = new DelegateV1(http())
const v2 = new DelegateV2(http())

console.log(await v1.checkDelegateForAll("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"))

console.log(await v2.checkDelegateForAll("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"))

```

### Write Example

To write transactions, you'll need to pass a [wallet client](https://viem.sh/docs/clients/wallet.html).

```
import { http } from "viem"
import { mainnet } from "viem/chains";
import { DelegateV1, DelegateV2 } from "delegatecash";

const account = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum)
})

const v1 = new DelegateV1(http(), mainnet, account)
const v2 = new DelegateV2(http(), mainnet, account)

console.log(await v1.delegateForAll("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"))

console.log(await v2.delegateAll("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", true))

```

## API

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
