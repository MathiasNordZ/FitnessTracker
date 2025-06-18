import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


interface LoginFormProps {
  className?: string
  title: string
  description: string
  buttonOne: string
  buttonTwo: string
  footer: string
  footerButton: string
}

/**
 * Renders a login form with customizable title, description, buttons, and footer.
 *
 * @param className - Additional CSS classes to apply to the root container.
 * @param title - The title displayed at the top of the form.
 * @param description - A description or subtitle shown below the title.
 * @param buttonOne - The label for the primary submit button.
 * @param buttonTwo - The label for the secondary button (e.g., alternative login).
 * @param footer - Text displayed in the footer section below the form.
 * @param footerButton - The label for the footer action link (e.g., "Sign up").
 * @param props - Additional props passed to the root div element.
 *
 * @remarks
 * This component uses a card layout and includes fields for email and password.
 * It also provides a "Forgot your password?" link and supports custom footer content.
 *
 * @example
 * ```tsx
 * <LoginForm
 *   title="Sign in"
 *   description="Enter your credentials to access your account."
 *   buttonOne="Login"
 *   buttonTwo="Login with Google"
 *   footer="Don't have an account?"
 *   footerButton="Sign up"
 * />
 * ```
 */
export function LoginForm({
  className,
  title,
  description,
  buttonOne,
  buttonTwo,
  footer,
  footerButton,
  ...props
}: React.ComponentProps<"div"> & LoginFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {buttonOne}
                </Button>
                <Button variant="outline" className="w-full">
                  {buttonTwo}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {footer}{" "}
              <a href="#" className="underline underline-offset-4">
                {footerButton}
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
