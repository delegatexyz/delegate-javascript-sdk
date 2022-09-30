# delegation-registry

This is a minimalist frontend implemtation the delegation registry. Every function has a 1:1 name of the contract ABI.

> Please note that this repository is current in beta. Right now, we built a very simple concept that doesn't require dependencies but will eventually include implementations for Ethers.js as well. Types and functions may change as we get feedback from builders. Watch out for breaking updates in the future.

Read more about the contract here: https://github.com/0xfoobar/delegation-registry

## Installation

You can either install it in two ways:

**via npm / yarn**:

```
npm: npm install web3
yarn: yarn add web3
```

via cdn

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/web3/1.8.0/web3.min.js" integrity="sha512-bSQ2kf76XufUYS/4XinoHLp5S4lNOyRv0/x5UJACiOMy8ueqTNwRFfUZWmWpwnczjRp9SjiF1jrXbGEim7Y0Xg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```

## How to use

```
import { checkDelegateForAll } from "delegation-registry/web3js";
```
