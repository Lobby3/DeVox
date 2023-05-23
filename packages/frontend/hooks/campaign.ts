// 5 mock campaigns
const mockData = [
  {
    id: "mock-id-1",
    baalAddress: "0x123",
    shamanAddress: "0x456",
    tokenAddress: "0x789",
    name: "Test Campaign 1",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    target: 5000,
    total: 2000,
  },
  {
    id: "mock-id-2",
    baalAddress: "0x123",
    shamanAddress: "0x456",
    tokenAddress: "0x789",
    name: "Test Campaign 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    target: 5000,
    total: 2000,
  },
  {
    id: "mock-id-3",
    baalAddress: "0x123",
    shamanAddress: "0x456",
    tokenAddress: "0x789",
    name: "Test Campaign 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    target: 5000,
    total: 2000,
  },
  {
    id: "mock-id-4",
    baalAddress: "0x123",

    shamanAddress: "0x456",
    tokenAddress: "0x789",
    name: "Test Campaign 4",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    target: 5000,
    total: 2000,
  },
  {
    id: "mock-id-5",
    baalAddress: "0x123",
    shamanAddress: "0x456",
    tokenAddress: "0x789",
    name: "Test Campaign 5",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    target: 5000,
    total: 2000,
  },
];

export const useCampaignInfo = (campaignId: string) => {
  console.log("campaignId", campaignId);
  return mockData[0];
};
