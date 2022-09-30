let web3: any;
// @ts-ignore
if (window.ethereum) {
  // @ts-ignore
  web3 = new window.Web3(window.ethereum);
  // @ts-ignore
} else if (window.web3) {
  // @ts-ignore
  web3 = new window.Web3(window.web3.currentProvider);
}

export const getWeb3 = () => web3;

// metamask has issues reporting on gas, so this is a fix for that
export const gasFix = { maxPriorityFeePerGas: null, maxFeePerGas: null };
