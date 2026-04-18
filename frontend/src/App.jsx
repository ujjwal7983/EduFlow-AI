import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CurrencyProvider } from './context/CurrencyContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AuthProvider>
          <Router>
            <div className="app-container">
              <AppRoutes />
            </div>
          </Router>
        </AuthProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
