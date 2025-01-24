import { http } from 'viem';
import { DelegateV1, DelegateV2 } from '../lib/index';

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
