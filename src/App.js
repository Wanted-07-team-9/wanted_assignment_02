import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Header from './components/Header';
import DetailPage from './pages/DetailPage';
import MainPage from './pages/MainPage';
import GlobalStyle from './GlobalStyle';
function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/detail/:number" element={<DetailPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
