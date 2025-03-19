import { LoadUser } from "@/app/profile/_actions/load-user";
import { EditProfileForm } from "@/app/profile/_components/edit-profile.form";
import UploadAvatarForm from "@/app/profile/_components/upload-avatar.form";
import { Container } from "@/components/layouts/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/format-date";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "production"
      ? "https://phamngochung.id.vn"
      : "http://localhost",
  ),
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await LoadUser();

  if ("statusCode" in user) throw new Error("Something went wrong!");
  const firstLetter = user.username.charAt(0).toUpperCase();

  return (
    <Container className="px-4 py-6 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start sm:gap-0">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-6 sm:space-y-0">
              {/* UPLOAD AVATAR */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="relative h-24 w-24 sm:h-28 sm:w-28">
                    <Image
                      className="cursor-pointer rounded-full border-2 border-primary object-cover hover:opacity-75"
                      src={
                        user.avatar ||
                        `https://placehold.co/200?text=${firstLetter}`
                      }
                      alt={user.username}
                      fill
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>
                </DialogTrigger>

                <DialogContent className="w-[90vw] max-w-md sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Upload avatar</DialogTitle>
                    <DialogDescription>
                      Click input below to upload a new avatar.
                    </DialogDescription>
                  </DialogHeader>
                  <UploadAvatarForm />
                </DialogContent>
              </Dialog>

              <div className="text-center sm:text-left">
                <CardTitle className="text-xl sm:text-2xl">
                  @{user.username}
                </CardTitle>
                <Badge variant="outline" className="mt-2">
                  {user.role}
                </Badge>
              </div>
            </div>

            {/* EDIT PROFILE */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full px-4 py-2 text-sm sm:w-auto sm:text-base"
                >
                  Edit profile
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[90vw] max-w-md sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <EditProfileForm user={user} />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <hr />

            <h3 className="flex items-center gap-2 text-sm sm:text-base">
              <span className="font-medium">Email:</span>
              <span className="break-all">{user.email}</span>
              {user.isEmailVerified ? (
                <Badge variant="outline">verified</Badge>
              ) : (
                <Badge variant="destructive">not verified</Badge>
              )}
            </h3>

            <h3 className="text-sm sm:text-base">
              <span className="font-medium">Bio:</span>{" "}
              {user.bio || "No bio provided"}
            </h3>

            <h3 className="text-sm sm:text-base">
              <span className="font-medium">Account created:</span>{" "}
              <time>{formatDate(user.createdAt)}</time>
            </h3>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
