import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import CreateTaskPage from "./pages/CreateTaskPage";
import ManageTaskPage from "./pages/ManageTaskPage";
import DashboardPage from "./pages/DashboardPage";
import SubtaskPage from "./pages/SubtaskPage";
import WishListPage from "./pages/WishListPage";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/otp-verification/:email"
        element={<OtpVerificationPage />}
      />
      <Route path="/password/forgot" element={<ForgotPasswordPage />} />
      <Route path="/password/reset/:token" element={<ResetPasswordPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="create-task" element={<CreateTaskPage />} />
        <Route path="manage-tasks" element={<ManageTaskPage />} />
        <Route path="wishlist" element={<WishListPage />} />
        <Route path="manage-tasks/subtask/:taskId" element={<SubtaskPage />} />
      </Route>
    </Routes>
  );
};

export default App;
