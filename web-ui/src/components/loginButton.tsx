import { getSignInUrl } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

type LoginButtonProps = {
  className?: string;
};

export default async function LoginButton({
  className = "",
}: LoginButtonProps) {
  const signingUrl = await getSignInUrl();

  return <Link href={signingUrl}>Sign in</Link>;
}
