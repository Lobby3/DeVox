import { pageTitle } from "../../utils/formatting";
import SummonPage from "./summon-page";

export async function generateMetadata() {
  return {
    title: pageTitle("Summon"),
  };
}

export default async function Index() {
  return <SummonPage />;
}
