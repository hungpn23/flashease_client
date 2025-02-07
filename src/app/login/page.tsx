import { LoginForm } from "@/components/clients/login-form";
import { SignUpForm } from "@/components/clients/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginPage() {
  return (
    <main className="mt-12 flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="login">
          <TabsList className="mb-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {/* Login form */}
            <Card className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email and password.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            {/* Signup form */}
            <Card className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Enter your email and password.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SignUpForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
