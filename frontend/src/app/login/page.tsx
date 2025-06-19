import { LoginForm } from "@/components/login-form";

/**
 * Function that represents the login page.
 *
 * @return the content of the login page.
 */
export default function LoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm
          title="Login to your account"
          description="Enter your email below to login to your account"
          buttonOne="Login"
          buttonTwo="Login with Google"
          footer="Don't have an account?"
          footerButton="Sign up"
        />
      </div>
    </div>
  );
}
