import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


import { AuthProvider } from './context/auth';
// import AuthRoute from './utils/AuthRoute';

import MenuBar from './Components/MenuBar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
