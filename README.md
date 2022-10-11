# delegation-registry

This is a minimalist frontend implemtation the delegation registry. Every function has a 1:1 name of the contract ABI.

> Please note that this repository is current in beta and open to contributions.

Read more about the contract here: https://github.com/0xfoobar/delegation-registry

## Installation

You can either install it in two ways:

**via npm / yarn**:

```
npm: npm install delegation-registry
yarn: yarn add delegation-registry
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
- revokeSelf()

## Raw Functions

- rawDelegateForAll(delegate, value)
- rawDelegateForContract(delegate, contract, value)
- rawDelegateForToken(delegate, contract, tokenId, value)
- rawRevokeAllDelegates()
- rawRevokeDelegate(delegate)
