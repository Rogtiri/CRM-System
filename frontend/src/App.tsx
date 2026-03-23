import { Routes, Route } from 'react-router-dom';
import { LoginPage, RegisterPage } from "./page's/auth/auth"
import { PrivacyPolicy } from "./page's/privacyPolice/privacyPolisy";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        </Routes>
    </div>
  )
}

export default App
