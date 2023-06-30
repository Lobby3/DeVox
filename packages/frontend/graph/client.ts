import { GraphQLClient } from "graphql-request";

const API_URL = `https://api.thegraph.com/subgraphs/name/seanmgonzalez/devox`;

export const graphQLClient = new GraphQLClient(API_URL, {
  headers: {},
});
