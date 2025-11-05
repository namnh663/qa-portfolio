import { useState, useEffect } from 'react';
import ReactJson from '@microlink/react-json-view';
import { JSONPath } from 'jsonpath-plus';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Footer from '../components/common/Footer';

// A small, local component for our tabs
const TabButton = ({ children, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`pb-2 px-1 text-sm font-semibold transition-colors
      ${isActive
        ? 'text-blue-600 border-b-2 border-blue-600'
        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
      }`}
  >
    {children}
  </button>
);

const JsonViewer = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [jsonPathQuery, setJsonPathQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null); // { type: 'json' | 'query', message: string }
  
  // 1. Added state for the output tabs
  const [activeTab, setActiveTab] = useState('formatted');

  useEffect(() => {
    try {
      if (jsonInput) {
        const parsed = JSON.parse(jsonInput);
        setParsedJson(parsed);
        setError(null);
        setActiveTab('formatted'); // 2. Auto-switch to formatted view on new input
      } else {
        setParsedJson(null);
        setError(null);
      }
    } catch (e) {
      setError({ type: 'json', message: 'Invalid JSON format' });
      setParsedJson(null);
    }
  }, [jsonInput]);

  const handleJsonPathQuery = () => {
    if (parsedJson && jsonPathQuery) {
      try {
        const result = JSONPath({ path: jsonPathQuery, json: parsedJson });
        setQueryResult(result);
        setError(null);
        setActiveTab('result'); // 3. Auto-switch to results tab on success
      } catch (e) {
        setError({ type: 'query', message: 'Invalid JSONPath query' });
        setQueryResult(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto p-4 px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">JSONPath Query Tool</h1>

        {/* 4. Two-Column Layout 
              - Stacks on mobile (space-y-6)
              - Becomes 2-col grid on desktop (lg:grid)
        */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">

          {/* === LEFT COLUMN: INPUTS === */}
          <Card className="flex flex-col">
            <Card.Header>
              <Card.Title>Input</Card.Title>
            </Card.Header>
            {/* 5. Grouped inputs for better workflow */}
            <Card.Content className="flex-grow space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">JSON</label>
                <Textarea
                  placeholder="Paste your JSON here"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  rows={15} // Taller for better tool-feel
                  className="w-full"
                />
                {error && error.type === 'json' && (
                  <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">JSONPath Query</label>
                <Input
                  type="text"
                  placeholder="e.g., $.store.book[*].author"
                  value={jsonPathQuery}
                  onChange={(e) => setJsonPathQuery(e.target.value)}
                  className="w-full"
                />
                {error && error.type === 'query' && (
                  <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
              </div>
            </Card.Content>
            {/* 6. Button is in the footer, a clear final action */}
            <Card.Footer className="text-right">
              <Button onClick={handleJsonPathQuery}>Execute Query</Button>
            </Card.Footer>
          </Card>

          {/* === RIGHT COLUMN: OUTPUTS === */}
          <Card className="flex flex-col min-h-[500px]">
            {/* 7. Using Tabs in the Header */}
            <Card.Header className="space-x-4 border-b-0 -mb-px">
              <TabButton 
                isActive={activeTab === 'formatted'} 
                onClick={() => setActiveTab('formatted')}
              >
                Formatted JSON
              </TabButton>
              <TabButton 
                isActive={activeTab === 'result'}
                onClick={() => setActiveTab('result')}
              >
                Query Result
              </TabButton>
            </Card.Header>
            <Card.Content className="flex-grow">
              {/* 8. Conditional content based on active tab */}
              {activeTab === 'formatted' && (
                parsedJson ? (
                  <ReactJson src={parsedJson} theme="ashes" name={false} />
                ) : (
                  <p className="text-gray-500">Waiting for valid JSON input...</p>
                )
              )}
              {activeTab === 'result' && (
                queryResult ? (
                  <ReactJson src={queryResult} theme="ashes" name={false} />
                ) : (
                  <p className="text-gray-500">Execute a query to see results...</p>
                )
              )}
            </Card.Content>
          </Card>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JsonViewer;