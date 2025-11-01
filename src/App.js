import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Page/HomePage';
import Header from './Components/Header';
import Login from './Page/Login';
import Register from './Page/Register';
import Footer from './Components/Footer';
import { AuthProvider } from './Context/Context';
function App() {
  useEffect(() => {
    initMockData();
  }, []);
  return (
    <AuthProvider>
      <div className="App">
        <Header/>
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
            </Routes>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
