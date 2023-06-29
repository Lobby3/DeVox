import { pageTitle } from "../../utils/formatting";
import MyDonationsPage from "./my-donations-page";

export async function generateMetadata() {
  return {
    title: pageTitle("My Donations"),
  };
}

export default async function Index() {
  return <MyDonationsPage />;
}
