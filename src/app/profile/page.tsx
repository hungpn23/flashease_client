import { LoadUser } from "@/actions/user/load-user";
import { EditProfileForm } from "@/components/clients/edit-profile-form";
import UploadAvatarForm from "@/components/clients/upload-avatar-form";
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
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await LoadUser();

  if ("statusCode" in user) throw new Error("Something went wrong!");
  const firstLetter = user.username.charAt(0).toUpperCase();

  return (
    <Container>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Image
                    className="cursor-pointer rounded-full border-2 border-primary hover:opacity-75"
                    src={
                      user.avatar ||
                      `https://placehold.co/200?text=${firstLetter}`
                    }
                    alt={user.username}
                    height={100}
                    width={100}
                  />
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Upload avatar</DialogTitle>

                    <DialogDescription>
                      Click input below to upload a new avatar.
                    </DialogDescription>
                  </DialogHeader>

                  <UploadAvatarForm />
                </DialogContent>
              </Dialog>

              <div>
                <CardTitle className="text-2xl">@{user.username}</CardTitle>
                <Badge variant="outline">{user.role}</Badge>
              </div>
            </div>

            {/* edit profile button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit profile</Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-2xl">
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
          <div className="space-y-2">
            <hr />

            <h3>
              <span className="mr-2">Email: {user.email}</span>

              {user.isEmailVerified ? (
                <Badge variant="outline">verified</Badge>
              ) : (
                <Badge variant="destructive">not verified</Badge>
              )}
            </h3>

            <h3>Bio: {user.bio || "No bio provided"}</h3>

            <h3>
              <time>Account created: {formatDate(user.createdAt)}</time>
            </h3>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
