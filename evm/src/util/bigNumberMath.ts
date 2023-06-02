import { ethers } from "ethers";

const ONE = ethers.BigNumber.from(1);
const TWO = ethers.BigNumber.from(2);

export function sqrt(value: any) {
  const x = ethers.BigNumber.from(value);
  let z = x.add(ONE).div(TWO);
  let y = x;
  while (z.sub(y).isNegative()) {
    y = z;
    z = x.div(z).add(z).div(TWO);
  }
  return y;
}
