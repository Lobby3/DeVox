import { pageTitle } from "../utils/formatting";
import HomePage from "./home";

export async function generateMetadata() {
  return {
    title: pageTitle("Home"),
  };
}

export default async function Index() {
  return <HomePage />;
}
