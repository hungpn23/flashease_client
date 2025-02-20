import { Container } from "@/components/layouts/container";
import { isAuthCached } from "@/lib/is-authenticated";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SearchParams } from "nuqs/server";
import { searchParamsCache } from "@/lib/search-params";
import { findPublicSets } from "@/actions/fetch-data.action";

export enum TabValues {
  MY_SETS = "my-sets",
  SAVED_SETS = "saved-sets",
  EXPLORE = "explore",
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const isAuth = await isAuthCached();

  const { page, take, order } = searchParamsCache.parse(await searchParams);

  const publicSets = await findPublicSets(page, take, order);

  if ("statusCode" in publicSets) throw new Error("failed to fetch data");

  return (
    <Container>
      <Tabs defaultValue={TabValues.MY_SETS}>
        <TabsList className="mb-1 grid w-full grid-cols-3 rounded-md">
          <TabsTrigger value={TabValues.MY_SETS}>My sets</TabsTrigger>
          <TabsTrigger value={TabValues.SAVED_SETS}>Saved sets</TabsTrigger>
          <TabsTrigger value={TabValues.EXPLORE}>Explore</TabsTrigger>
        </TabsList>

        <TabsContent value={TabValues.MY_SETS}>
          <Card className="flex flex-col gap-4 rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl">My sets</CardTitle>
              <CardDescription>
                View all your sets, create new sets, and edit existing sets.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div>my sets</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={TabValues.SAVED_SETS}>
          <Card className="flex flex-col gap-4 rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl">Saved sets</CardTitle>
              <CardDescription>View all your saved sets.</CardDescription>
            </CardHeader>

            <CardContent>
              <div>saved sets</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value={TabValues.EXPLORE}>
          <Card className="flex flex-col gap-4 rounded-md">
            <CardHeader>
              <CardTitle className="text-2xl">Explore</CardTitle>
              <CardDescription>
                View all public sets created by other users.
              </CardDescription>
            </CardHeader>

            <CardContent>{JSON.stringify(publicSets)}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
