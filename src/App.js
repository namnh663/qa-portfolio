import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Topic from './pages/Topic';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import Error from './pages/Error';
import Learning from './pages/Learning';
import LearningPost from './pages/LearningPost';
import Airport from './pages/Airport';
import JsonViewer from './pages/JsonViewer';

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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/topics/:topic" element={<Topic />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/learning/:id" element={<LearningPost />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/airport" element={<Airport />} />
            <Route path="/json-viewer" element={<JsonViewer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;