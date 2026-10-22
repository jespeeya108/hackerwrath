
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Timetable from "./pages/Timetable";
import Examinations from "./pages/Examinations";
import Academics from "./pages/Academics";
import Documents from "./pages/Documents";
import Fees from "./pages/Fees";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="timetable" element={<Timetable />} />
            <Route path="examinations" element={<Examinations />} />
            <Route path="academics" element={<Academics />} />
            <Route path="documents" element={<Documents />} />
            <Route path="fees" element={<Fees />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
