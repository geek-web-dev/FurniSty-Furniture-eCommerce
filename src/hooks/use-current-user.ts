import { useSession } from "next-auth/react";
// this hook used in client components
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
