import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { DictionaryPage } from "@/pages/DictionaryPage";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { RegisterPage } from "@/pages/RegisterPage";
import { TranslatePage } from "@/pages/TranslatePage";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>

        <Route path="login" element={<LoginPage />}></Route>
        <Route path="register" element={<RegisterPage />}></Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />}></Route>
          <Route path="/translate" element={<TranslatePage />}></Route>
          <Route path="/dictionary" element={<DictionaryPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Route>

        <Route
          path="/app"
          element={<Navigate to="/dashboard" replace />}
        ></Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
