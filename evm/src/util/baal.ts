import { BytesLike } from "ethers";
import { ethers } from "hardhat";

import { fetchTransactionLog } from ".";
import { Baal } from "../../src";
import { PromiseOrValue } from "../types/common";

export const PROPOSAL_STATE = {
  UNBORN: 0,
  SUBMITTED: 1,
  VOTING: 2,
  CANCELLED: 3,
  GRACE: 4,
  READY: 5,
  PROCESSED: 6,
  DEFEATED: 7,
};

async function blockTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

async function moveForwardPeriods(
  periods: number,
  votingPeriod: number,
  extra?: number
) {
  const goToTime =
    (await blockTime()) + votingPeriod * periods + (extra ? extra : 0);
  await ethers.provider.send("evm_mine", [goToTime]);
  return true;
}

async function getProposalId(txHash: string) {
  const submitProposalLog = await fetchTransactionLog(
    txHash,
    `event SubmitProposal(
      uint256 indexed proposal,
      bytes32 indexed proposalDataHash,
      uint256 votingPeriod,
      bytes proposalData,
      uint256 expiration,
      uint256 baalGas,
      bool selfSponsor,
      uint256 timestamp,
      string details)`
  );
  const { proposal } = submitProposalLog.args;
  return proposal;
}

export async function submitAndProcessProposal(
  encodedAction: PromiseOrValue<BytesLike>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  proposal: { [key: string]: any },
  baal: Baal
) {
  const result = await baal.submitProposal(
    encodedAction,
    proposal.expiration,
    proposal.baalGas,
    ethers.utils.id(proposal.details)
  );

  const proposalId = await getProposalId(result.hash);
  await baal.submitVote(proposalId, true);

  const votingPeriod = await baal.votingPeriod();
  await moveForwardPeriods(2, votingPeriod);

  return await baal.processProposal(proposalId, encodedAction);
}
