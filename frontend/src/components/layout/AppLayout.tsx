import { Link, Outlet, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

export function AppLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("accessToken");
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

            <Link to="/profile" className="text-sm text-muted-foreground">
              Profile
            </Link>

            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
