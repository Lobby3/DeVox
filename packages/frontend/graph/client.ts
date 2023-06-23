import { GraphQLClient } from "graphql-request";

const API_URL = `https://api.thegraph.com/subgraphs/name/moconnell/lobby3-devox`;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {},
});
