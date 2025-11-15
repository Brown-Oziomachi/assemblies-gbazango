import { redirect } from "next/navigation";

export const metadata = {
  title: "Assemblies of God Church Gbazango",
  description:
    "Welcome to Assemblies of God Church Gbazango — a place of worship, spiritual growth, and community. Join us to experience God's presence and grow in faith together.",
  referrer: "origin-when-cross-origin",
};

export default async function Page() {
  redirect("/AG");
}
