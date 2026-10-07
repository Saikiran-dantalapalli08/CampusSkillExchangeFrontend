import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExploreSkills from './pages/ExploreSkills';
import Matches from './pages/Matches';
import Profile from './pages/Profile';
import Requests from './pages/Requests';
import Sessions from './pages/Sessions';
import MyProfile from './pages/MyProfile';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Navbar />
        <main className="page-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<ExploreSkills />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
