import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Home from "./pages/Home";

import AuthProvider from "./context/userAuth";

import AccountLevel from "./pages/AccountLevel";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/account-level" element={<AccountLevel />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/messenger" element={<Messenger />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
