import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function NotFoundPage() {
  const hasAccessToken = Boolean(localStorage.getItem("accessToken"));

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl">404</CardTitle>
          <CardDescription>
            The page you are looking for does not exist.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild>
            <Link to={hasAccessToken ? "/dashboard" : "/"}>
              {hasAccessToken ? "Go to dashboard" : "Go to home"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
