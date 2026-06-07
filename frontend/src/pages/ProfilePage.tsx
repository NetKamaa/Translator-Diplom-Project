import { useEffect, useState, type FormEvent } from "react";

import { getProfile, updateProfile } from "@/features/profile/api/profile.api";
import type { TUserProfile } from "@/features/profile/types/profile.types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function getProfileInitials(profile: TUserProfile | null) {
  if (!profile) {
    return "U";
  }

  if (profile.nickname) {
    return profile.nickname.slice(0, 2).toUpperCase();
  }

  return profile.email.slice(0, 2).toUpperCase();
}

export function ProfilePage() {
  const [profile, setProfile] = useState<TUserProfile | null>(null);

  const [nickname, setNickname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        setError("");

        const data = await getProfile();

        setProfile(data);
        setNickname(data.nickname ?? "");
        setAvatarUrl(data.avatarUrl ?? "");
      } catch {
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setIsSaving(true);

    try {
      const updatedProfile = await updateProfile({
        nickname: nickname.trim() || undefined,
        avatarUrl: avatarUrl.trim() || undefined,
      });

      setProfile(updatedProfile);
      setNickname(updatedProfile.nickname ?? "");
      setAvatarUrl(updatedProfile.avatarUrl ?? "");

      setSuccessMessage("Profile updated");
    } catch {
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <p className="text-muted-foreground">Loading profile...</p>;
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 pt-8 text-center">
          <Avatar className="h-28 w-28">
            <AvatarImage src={profile?.avatarUrl ?? undefined} />
            <AvatarFallback className="text-3xl">
              {getProfileInitials(profile)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold">
              {profile?.nickname || "Your profile"}
            </h1>

            <p className="text-sm text-muted-foreground">{profile?.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account settings</CardTitle>
          <CardDescription>
            Update your nickname and avatar URL.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                value={profile?.email ?? ""}
                readOnly
                className="bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>

              <Input
                id="nickname"
                value={nickname}
                placeholder="Your nickname"
                onChange={(event) => {
                  setNickname(event.target.value);
                  setSuccessMessage("");
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>

              <Input
                id="avatarUrl"
                value={avatarUrl}
                placeholder="https://example.com/avatar.png"
                onChange={(event) => {
                  setAvatarUrl(event.target.value);
                  setSuccessMessage("");
                }}
              />
            </div>

            {avatarUrl ? (
              <div className="flex items-center gap-3 rounded-xl border p-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={avatarUrl} />
                  <AvatarFallback>{getProfileInitials(profile)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-sm font-medium">Avatar preview</p>
                  <p className="text-xs text-muted-foreground">
                    This image will be shown in your profile and navigation.
                  </p>
                </div>
              </div>
            ) : null}

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            {successMessage ? (
              <p className="text-sm text-muted-foreground">{successMessage}</p>
            ) : null}

            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
