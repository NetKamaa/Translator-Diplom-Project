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
import { getProfile, updateProfile } from "@/features/profile/api/profile.api";
import type { TUserProfile } from "@/features/profile/types/profile.types";
import { useEffect, useState, type FormEvent } from "react";

export function ProfilePage() {
  const [profile, setProfile] = useState<TUserProfile | null>();

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
    setIsSaving(true);

    try {
      const updatedProfile = await updateProfile({
        nickname: nickname || undefined,
        avatarUrl: avatarUrl || undefined,
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
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className=" text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Update your nickname and avatar URL.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Email</Label>

              <Input value={profile?.email ?? ""} disabled />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>

              <Input
                id="nickname"
                value={nickname}
                placeholder="Your nickname"
                onChange={(event) => setNickname(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>

              <Input
                id="avatarUrl"
                value={avatarUrl}
                placeholder="https://example.com/avatar.png"
                onChange={(event) => setAvatarUrl(event.target.value)}
              />
            </div>

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
