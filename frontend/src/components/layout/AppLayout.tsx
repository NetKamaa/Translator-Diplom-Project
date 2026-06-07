import { Link, Outlet, useNavigate } from "react-router";

import { useProfile } from "@/features/profile/context/use-profile";
import type { TUserProfile } from "@/features/profile/types/profile.types";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getUserInitials(profile: TUserProfile | null) {
  if (!profile) {
    return "U";
  }

  if (profile.nickname) {
    return profile.nickname.slice(0, 2).toUpperCase();
  }

  return profile.email.slice(0, 2).toUpperCase();
}

export function AppLayout() {
  const navigate = useNavigate();

  const { profile, clearProfile } = useProfile();

  function handleLogout() {
    localStorage.removeItem("accessToken");
    clearProfile();
    navigate("/login");
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/dashboard" className="text-lg font-semibold">
            Translator App
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-muted-foreground">
              Dashboard
            </Link>

            <Link to="/translate" className="text-sm text-muted-foreground">
              Translate
            </Link>

            <Link to="/dictionary" className="text-sm text-muted-foreground">
              Dictionary
            </Link>

            <Link to="/flashcards" className="text-sm text-muted-foreground">
              Flashcards
            </Link>

            <Link
              to="/flashcards/practice"
              className="text-sm text-muted-foreground"
            >
              Practice
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                  <Avatar>
                    <AvatarImage src={profile?.avatarUrl ?? undefined} />
                    <AvatarFallback>{getUserInitials(profile)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">
                    {profile?.nickname ?? "User"}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {profile?.email ?? "Profile"}
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
