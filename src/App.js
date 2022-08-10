import 'antd/dist/antd.min.css';
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { getToken } from "../src/utils/getToken";
import './App.css';
import CandidatePage from './containers/CandidatePage/CandidatePage';
import AddCandidatePage from './containers/CandidatePage/AddCandidatePage'
import EditCandidatePage from './containers/CandidatePage/EditCandidatePage'
import ErrorPage from './containers/ErrorPage/ErrorPage';
import LoginPage from './containers/LoginPage/LoginPage';

function App() {
  const [token, setToken] = useState(getToken());
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token])

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CandidatePage />} />
        <Route path="/candidates" element={<CandidatePage />} />
        <Route path="/candidates-add" element={<AddCandidatePage />} />
        <Route path="/candidates-edit/:id" element={<EditCandidatePage />} />
        <Route path="/login" element={token?.length > 0 ? (<Navigate to='/candidates' />) : <LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
