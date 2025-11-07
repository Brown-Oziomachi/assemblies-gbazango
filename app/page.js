import { redirect } from "next/navigation";

export const metadata = {
  title: "Tupskills | Learning & Growth Platform",
  description:
    "Join Tupskills — the social learning platform that connects learners, creators, and mentors. Build skills, share knowledge, and grow together in a community designed for success.",
  referrer: "origin-when-cross-origin",
};

export default async function Page() {
  redirect("/AG");
}
