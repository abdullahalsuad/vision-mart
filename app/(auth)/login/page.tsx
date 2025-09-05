import { auth } from "@/auth";
import AuthLayout from "@/components/auth/AuthLayout";
import Logout from "@/components/auth/Logout";

const logInPage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <Logout />
      <AuthLayout pageType="login" />
    </>
  );
};

export default logInPage;
