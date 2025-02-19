import { Container } from "@/components/layouts/container";
import { isAuthenticated } from "@/lib/is-authenticated";
import { Welcome } from "./welcome";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/clients/login-form";
import { RegisterForm } from "@/components/clients/register-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

enum TabValues {
  MY_SETS = "my sets",
  SAVED_SETS = "saved sets", // TODO: Implement this
  EXPLORE = "explore",
}

export default async function Home() {
  const isAuth = await isAuthenticated();

  return (
    <Container>
      {isAuth ? (
        <Tabs defaultValue={TabValues.MY_SETS}>
          <TabsList className="mb-1 grid w-full grid-cols-3 rounded-md">
            <TabsTrigger value={TabValues.MY_SETS}>My sets</TabsTrigger>
            <TabsTrigger value={TabValues.SAVED_SETS}>Saved</TabsTrigger>
            <TabsTrigger value={TabValues.EXPLORE}>Explore</TabsTrigger>
          </TabsList>

          <TabsContent value={TabValues.MY_SETS}>
            <Card className="flex flex-col gap-4 rounded-md">
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

          <TabsContent value={TabValues.SAVED_SETS}>
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

          <TabsContent value={TabValues.EXPLORE}>
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
      ) : (
        <Welcome />
      )}
    </Container>
  );
}
