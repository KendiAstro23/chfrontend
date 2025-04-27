import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'; 
import Home from './pages/Home';
import Services from './pages/Services';
import ClientProfile from './pages/ClientProfile';
import ClientList from './pages/ClientList';
import AppointmentsPage from './pages/AppointmentsPage'; 
import BookProgramPage from './pages/BookProgramPage';
import Footer from './components/Footer'; 

function App() {
  return (
    <div>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/clients/:id" element={<ClientProfile />} />
        <Route path="/book-program/:id" element={<BookProgramPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
}

export default App;
