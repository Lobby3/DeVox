import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { Approval } from "../generated/BaalV1/BaalV1"
import { handleApproval } from "../src/baal-v-1"
import { createApprovalEvent } from "./baal-v-1-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Baal", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let spender = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let newApprovalEvent = createApprovalEvent(owner, spender, amount)
    handleApproval(newApprovalEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  // test("ExampleEntity created and stored", () => {
    // assert.entityCount("ExampleEntity", 1)

    // // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    // assert.fieldEquals(
    //   "ExampleEntity",
    //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    //   "owner",
    //   "0x0000000000000000000000000000000000000001"
    // )
    // assert.fieldEquals(
    //   "ExampleEntity",
    //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    //   "spender",
    //   "0x0000000000000000000000000000000000000001"
    // )
    // assert.fieldEquals(
    //   "ExampleEntity",
    //   "0xa16081f360e3847006db660bae1c6d1b2e17ec2a",
    //   "amount",
    //   "234"
    // )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  // })
})
