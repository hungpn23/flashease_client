import { LoginForm } from "@/components/clients/login-form";
import { RegisterForm } from "@/components/clients/register-form";
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
    <main className="flex w-full items-center justify-center">
      <div className="w-full max-w-sm">
        <Tabs defaultValue="login">
          <TabsList className="mb-1">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            {/* Login form */}
            <Card className="flex flex-col gap-4">
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

          <TabsContent value="register">
            {/* Register form */}
            <Card className="flex flex-col gap-4">
              <CardHeader>
                <CardTitle className="text-2xl">Register</CardTitle>
                <CardDescription>
                  Enter your email, password and confirm password.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
