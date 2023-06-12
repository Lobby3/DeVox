// 5 mock campaigns
import { Campaign } from "../types/Campaign";

const mockCampaignData: Campaign[] = [
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
    imageUrl:
      "https://randomwordgenerator.com/img/picture-generator/57e8dc4a4250a814f1dc8460962e33791c3ad6e04e50744172287ed3944ec5_640.jpg",
    numberOfSigners: 252,
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
    imageUrl:
      "https://randomwordgenerator.com/img/picture-generator/53e4d2424d53aa14f1dc8460962e33791c3ad6e04e507440722d7cd3924cc2_640.jpg",
    numberOfSigners: 252,
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
    imageUrl:
      "https://randomwordgenerator.com/img/picture-generator/57e9d04b4a5aaf14f1dc8460962e33791c3ad6e04e507440722d72d09245c7_640.jpg",
    numberOfSigners: 252,
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
    imageUrl:
      "https://randomwordgenerator.com/img/picture-generator/57e9d247435bac14f1dc8460962e33791c3ad6e04e507440742a7ed09244c2_640.jpg",
    numberOfSigners: 252,
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
    imageUrl:
      "https://randomwordgenerator.com/img/picture-generator/57e7dc4b4c5ba914f1dc8460962e33791c3ad6e04e5074417c2f7dd5904cc0_640.jpg",
    numberOfSigners: 252,
  },
];

export const useCampaignInfo = (campaignId: string) => {
  return mockCampaignData.find((campaign) => campaign.id === campaignId);
};

export const useListCampaigns = () => {
  return mockCampaignData;
};
