import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export function LandingPage() {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold">
            Translator App
          </Link>

          <nav className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>

            <Button asChild>
              <Link to="/register">Get started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100svh-73px)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-medium text-muted-foreground">
            AI-powered vocabulary learning platform
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Translate, save words and learn them with flashcards
          </h1>

          <p className="text-lg text-muted-foreground">
            Build your personal dictionary, keep translation history and turn
            useful phrases into flashcards.
          </p>

          <div className="flex justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/register">Start learning</Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link to="/login">I already have an account</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
