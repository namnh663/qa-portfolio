import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import Learning from './pages/Learning';
import LearningPost from './pages/LearningPost';
import Airport from './pages/Airport';
import CharacterCounter from './pages/CharacterCounter';
import JsonViewer from './pages/JsonViewer';
import XPathValidator from './pages/XPathValidator';
import Interview from './pages/Interview';
import UserManagement from './pages/UserManagement';

function App() {
  const [hasError, setHasError] = useState(false);

  const resetError = () => setHasError(false);

  return (
    <div className="App">
      <Router>
        <Navbar />
        {hasError ? (
          <Error reset={resetError} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/:id" element={<LearningPost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/airport-calculator" element={<Airport />} />
            <Route path="/character-counter" element={<CharacterCounter />} />
            <Route path="/json-viewer" element={<JsonViewer />} />
            <Route path="/xpath-validator" element={<XPathValidator />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;