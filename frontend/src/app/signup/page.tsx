import { LoginForm } from "@/components/login-form"

/**
 * Function that represents the sign up page.
 * 
 * @return the content of the page.
 */
export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm title = "Create new account" description = "Enter your email below to create a new account" buttonOne = "Sign Up" buttonTwo = "Sign Up with Google" footer = "Already have an account?" footerButton = "Log in" />
      </div>
    </div>
  )
}