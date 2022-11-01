# [delegatecash](https://delegate.cash) &middot; ![NPM](https://img.shields.io/npm/l/delegatecash?registry_uri=https%3A%2F%2Fregistry.npmjs.com) ![npm (tag)](https://img.shields.io/npm/v/delegatecash/latest) ![npm bundle size](https://img.shields.io/bundlephobia/min/delegatecash) [![Twitter URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2Fdelegatecash)](https://twitter.com/delegatecash)

This is a minimalist frontend implemtation the delegation registry. Every function has a 1:1 name of the contract ABI.

Read more about the [delegate.cash](https://delegate.cash) via our [documentation].(https://docs.delegate.cash)

## Installation

```
npm install delegatecash
```

## View Functions

- checkDelegateForAll(delegate, vault)
- checkDelegateForContract(delegate, vault, contract)
- checkDelegateForToken(delegate, vault, contract, tokenId)
- getContractLevelDelegations(vault)
- getDelegatesForAll(vault)
- getDelegatesForContract(vault, contract)
- getDelegatesForToken(vault, contract, tokenId)
- getDelegationsByDelegate(delegate)
- getTokenLevelDelegations(vault)

## Write Functions

- delegateForAll(delegate, value)
- delegateForContract(delegate, contract, value)
- delegateForToken(delegate, contract, tokenId, value)
- revokeAllDelegates()
- revokeDelegate(delegate)
- revokeSelf(vault)

## Raw Functions

These function calls will return back the encoded function data.

- rawDelegateForAll(delegate, value)
- rawDelegateForContract(delegate, contract, value)
- rawDelegateForToken(delegate, contract, tokenId, value)
- rawRevokeAllDelegates()
- rawRevokeDelegate(delegate)
