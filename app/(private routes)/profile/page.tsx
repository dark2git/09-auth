import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Your Profile – Notes App",
  description:
    "View and manage your personal profile, settings, and saved notes.",
  openGraph: {
    title: "Your Profile – Notes App",
    description:
      "Access your account details, update settings, and explore your saved notes.",
    url: "https://08-zustand-mu-seven.vercel.app/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Illustration of personal notes and profile settings",
      },
    ],
  },
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username ? user.username : "No username"};</p>
          <p>Email: {user?.email}</p>
        </div>
      </div>
    </main>
  );
}
