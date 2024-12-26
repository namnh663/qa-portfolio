import { useState, useEffect } from 'react';
import ReactJson from '@microlink/react-json-view';
import { JSONPath } from 'jsonpath-plus';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Footer from '../components/common/Footer';

const JsonViewer = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [jsonPathQuery, setJsonPathQuery] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      if (jsonInput) {
        const parsed = JSON.parse(jsonInput);
        setParsedJson(parsed);
        setError(null);
      } else {
        setParsedJson(null);
      }
    } catch (e) {
      setError('Invalid JSON');
      setParsedJson(null);
    }
  }, [jsonInput]);

  const handleJsonPathQuery = () => {
    if (parsedJson && jsonPathQuery) {
      try {
        const result = JSONPath({ path: jsonPathQuery, json: parsedJson });
        setQueryResult(result);
        setError(null);
      } catch (e) {
        setError('Invalid JSONPath query');
        setQueryResult(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto p-4 space-y-4 px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">JSONPath Query Tool</h1>
        <Card>
          <Card.Header>
            <Card.Title>JSON Input</Card.Title>
          </Card.Header>
          <Card.Content>
            <Textarea
              placeholder="Paste your JSON here"
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={10}
              className="w-full p-2 border rounded"
            />
          </Card.Content>
        </Card>

        {error && <p className="text-red-500">{error}</p>}

        {parsedJson && (
          <Card>
            <Card.Header>
              <Card.Title>Formatted JSON</Card.Title>
            </Card.Header>
            <Card.Content>
              <ReactJson src={parsedJson} theme="ashes" />
            </Card.Content>
          </Card>
        )}

        <Card>
          <Card.Header>
            <Card.Title>JSONPath Query</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-2">
            <Input
              type="text"
              placeholder="Enter JSONPath query (e.g., $.store.book[*].author)"
              value={jsonPathQuery}
              onChange={(e) => setJsonPathQuery(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="mt-4">
              <Button onClick={handleJsonPathQuery}>Execute Query</Button>
            </div>
          </Card.Content>
        </Card>

        {queryResult && (
          <Card>
            <Card.Header>
              <Card.Title>Query Result</Card.Title>
            </Card.Header>
            <Card.Content>
              <ReactJson src={queryResult} theme="ashes" />
            </Card.Content>
          </Card>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default JsonViewer;