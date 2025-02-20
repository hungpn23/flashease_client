import { LoginForm } from "@/components/clients/login-form";
import { RegisterForm } from "@/components/clients/register-form";
import { Container } from "@/components/layouts/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum TabValues {
  LOGIN = "login",
  REGISTER = "register",
}

export default function Auth() {
  return (
    <Container className="max-w-md">
      <Tabs defaultValue={TabValues.LOGIN}>
        <TabsList className="mb-1 grid w-full grid-cols-2 rounded-md">
          <TabsTrigger value={TabValues.LOGIN}>Login</TabsTrigger>
          <TabsTrigger value={TabValues.REGISTER}>Register</TabsTrigger>
        </TabsList>

        <TabsContent value={TabValues.LOGIN}>
          {/* Login form */}
          <Card className="flex flex-col gap-4 rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email and password.</CardDescription>
            </CardHeader>

            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={TabValues.REGISTER}>
          {/* Register form */}
          <Card className="flex flex-col gap-4 rounded-md">
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
    </Container>
  );
}
