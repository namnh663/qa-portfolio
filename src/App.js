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
            <Route path="/resources" element={<Resources />} />  {/* Add route for Resources */}
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;