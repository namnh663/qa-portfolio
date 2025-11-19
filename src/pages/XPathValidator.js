import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import Footer from '../components/common/Footer';

// --- 1. Static Data: XPath Knowledge Base ---
const xpathReference = [
  {
    category: "Basic Selection",
    items: [
      { label: "Document Root", code: "/" },
      { label: "Select Tag (Recursive)", code: "//div" },
      { label: "Direct Child", code: "/html/body/div" },
      { label: "Specific Attribute", code: "@href" },
      { label: "Parent Node", code: ".." },
    ]
  },
  {
    category: "Predicates & Logic",
    items: [
      { label: "By ID", code: "//div[@id='main']" },
      { label: "Exact Text", code: "//button[text()='Submit']" },
      { label: "Multiple Attributes", code: "//input[@type='text' and @name='user']" },
      { label: "Not Condition", code: "//input[not(@disabled)]" },
      { label: "Index (1-based)", code: "(//ul/li)[1]" },
    ]
  },
  {
    category: "String Functions",
    items: [
      { label: "Contains (Partial)", code: "//div[contains(@class, 'error')]" },
      { label: "Starts With", code: "//a[starts-with(@href, 'https')]" },
      { label: "String Length", code: "//input[string-length(@value) > 5]" },
      { label: "Normalize Spaces", code: "//h1[normalize-space()='Welcome']" },
    ]
  },
  {
    category: "Axes (Relationships)",
    items: [
      { label: "Following Sibling", code: "//h2/following-sibling::p" },
      { label: "Preceding Sibling", code: "//td/preceding-sibling::td" },
      { label: "Ancestor (Up tree)", code: "//span/ancestor::div" },
      { label: "Descendant (Down tree)", code: "//div/descendant::img" },
    ]
  }
];

// --- 2. Main Component ---
const XPathValidator = () => {
  // -- State --
  const [xmlInput, setXmlInput] = useState('');
  const [xpathQuery, setXpathQuery] = useState('');
  const [results, setResults] = useState([]);
  const [matchCount, setMatchCount] = useState(0);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]); // Recent queries
  const [copyFeedback, setCopyFeedback] = useState(null); // Small toast state

  // -- Helper: Load Example Data --
  const loadExample = () => {
    const exampleXML = `<?xml version="1.0" encoding="UTF-8"?>
<inventory>
  <item id="101" category="electronics">
    <name>Wireless Mouse</name>
    <price currency="USD">25.99</price>
    <stock>50</stock>
  </item>
  <item id="102" category="office">
    <name>Mechanical Keyboard</name>
    <price currency="USD">120.00</price>
    <stock>15</stock>
  </item>
  <item id="103" category="electronics">
    <name>USB-C Hub</name>
    <price currency="EUR">45.50</price>
    <stock>0</stock>
  </item>
</inventory>`;
    setXmlInput(exampleXML);
    setXpathQuery('//item[@category="electronics"]/name');
  };

  // -- Effect: Real-time Evaluation --
  useEffect(() => {
    if (!xmlInput || !xpathQuery) {
      setResults([]);
      setMatchCount(0);
      setError(null);
      return;
    }

    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, "text/xml");

      // Check for XML Parse Errors
      const parseError = xmlDoc.getElementsByTagName("parsererror");
      if (parseError.length > 0) {
        // Usually the parser error text is inside the tag
        throw new Error("Invalid XML Structure");
      }

      const evaluator = new XPathEvaluator();
      const result = evaluator.evaluate(
        xpathQuery,
        xmlDoc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );

      const matches = [];
      for (let i = 0; i < result.snapshotLength; i++) {
        const node = result.snapshotItem(i);
        // Handle different node types (Attribute vs Element vs Text)
        if (node.nodeType === 2) { // Attribute
           matches.push(`${node.name}="${node.value}"`);
        } else if (node.nodeType === 3) { // Text
           matches.push(node.nodeValue);
        } else {
           matches.push(node.outerHTML || node.textContent);
        }
      }

      setResults(matches);
      setMatchCount(result.snapshotLength);
      setError(null);

    } catch (err) {
      setResults([]);
      setMatchCount(0);
      setError(err.message);
    }
  }, [xmlInput, xpathQuery]);

  // -- Logic: History Management --
  const saveToHistory = () => {
    if (xpathQuery && !error && matchCount > 0) {
      setHistory(prev => {
        // Prevent duplicates and limit to last 5
        const newHistory = [xpathQuery, ...prev.filter(h => h !== xpathQuery)];
        return newHistory.slice(0, 5);
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveToHistory();
    }
  };

  // -- Logic: Clipboard with Feedback --
  const handleCopy = (text, label = "Copied") => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans flex flex-col">
      <main className="container mx-auto p-4 px-6 py-8 flex-grow">
        
        {/* HEADER */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">XPath Validator</h1>
          </div>
          <Button onClick={loadExample} variant="outline" size="sm">
            Load Example Data
          </Button>
        </div>

        {/* MAIN WORKSPACE: 2 COLUMNS */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">

          {/* --- LEFT COLUMN: SOURCE XML --- */}
          <Card className="flex flex-col h-[600px]">
            <Card.Header className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 py-3">
              <Card.Title className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">Source Code</Card.Title>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleCopy(xmlInput, "XML Copied")}
                  className="text-xs text-blue-500 hover:text-blue-700 font-medium"
                >
                  Copy
                </button>
                <button 
                  onClick={() => setXmlInput('')}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              </div>
            </Card.Header>
            <Card.Content className="flex-grow p-0 relative">
              <Textarea
                placeholder="<Paste your XML or HTML here>"
                value={xmlInput}
                onChange={(e) => setXmlInput(e.target.value)}
                className="w-full h-full resize-none border-0 focus:ring-0 p-4 font-mono text-xs leading-relaxed bg-transparent text-gray-700 dark:text-gray-300"
                spellCheck="false"
              />
            </Card.Content>
          </Card>

          {/* --- RIGHT COLUMN: QUERY & RESULTS --- */}
          <div className="flex flex-col h-[600px] space-y-4">
            
            {/* 1. Query Input (Google Search Style) */}
            <Card className="overflow-visible z-10">
              <div className="p-4">
                <label className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                  <span>XPath Expression</span>
                  {copyFeedback && <span className="text-green-600 animate-pulse">{copyFeedback}</span>}
                </label>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     {/* Search Icon */}
                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                     </svg>
                  </div>
                  <input
                    type="text"
                    value={xpathQuery}
                    onChange={(e) => setXpathQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={saveToHistory} // Auto-save on blur
                    placeholder="//tagname[@attribute='value']"
                    className={`w-full pl-10 pr-24 py-3 rounded-lg border-2 outline-none font-mono text-sm shadow-sm transition-all
                      ${error 
                        ? 'border-red-300 focus:border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900' 
                        : 'border-gray-200 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white'
                      }`}
                  />
                  
                  {/* Match Badge (Absolute Positioned inside Input) */}
                  {!error && matchCount > 0 && (
                    <div className="absolute right-2 top-2.5 px-2.5 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full text-xs font-bold">
                      {matchCount} matches
                    </div>
                  )}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mt-2 text-xs text-red-500 flex items-center font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {error}
                  </div>
                )}

                {/* History Pills (Google Style "Recent") */}
                {history.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="text-xs text-gray-400 self-center mr-1">History:</span>
                    {history.map((hist, idx) => (
                      <button
                        key={idx}
                        onClick={() => setXpathQuery(hist)}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md text-gray-600 dark:text-gray-300 font-mono transition-colors truncate max-w-[150px]"
                        title={hist}
                      >
                        {hist}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* 2. Results Output */}
            <Card className="flex-grow flex flex-col overflow-hidden">
              <Card.Header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 py-3 px-4">
                <Card.Title className="text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300">Evaluation Results</Card.Title>
              </Card.Header>
              
              <Card.Content className="flex-grow overflow-y-auto p-0 bg-gray-50 dark:bg-gray-900/50">
                {results.length > 0 ? (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {results.map((match, index) => (
                      <li key={index} className="group relative p-4 hover:bg-white dark:hover:bg-gray-800 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div className="font-mono text-sm text-gray-700 dark:text-gray-300 break-all whitespace-pre-wrap">
                            {match}
                          </div>
                          <button 
                            onClick={() => handleCopy(match)}
                            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 transition-opacity p-1"
                            title="Copy this result"
                          >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 012 2v0a2 2 0 01-2 2h-8a2 2 0 01-2-2v-2a2 2 0 012-2z"></path></svg>
                          </button>
                        </div>
                        <span className="absolute top-2 right-2 text-[10px] text-gray-300 font-mono select-none">
                          #{index + 1}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                    {/* Empty State Illustration (Simple SVG) */}
                    <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="text-center">
                       {xpathQuery && !error ? (
                         <p className="text-sm">No matches found in the source XML.</p>
                       ) : (
                         <>
                           <p className="font-medium text-gray-500">Ready to evaluate</p>
                           <p className="text-xs opacity-60 mt-1">Enter an XPath query to see results.</p>
                         </>
                       )}
                    </div>
                  </div>
                )}
              </Card.Content>
            </Card>
          </div>
          
        </div>

        {/* --- BOTTOM SECTION: KNOWLEDGE BASE --- */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 19.128 5.754 19.625 7.5 19.625s3.332-.497 4.5-1.273m0-12.102A4.967 4.967 0 007.5 5a4.967 4.967 0 01-4.5 1.25m0-6.5C10.832 19.128 9.246 19.625 7.5 19.625s-3.332-.497-4.5-1.273m0 0L3 20m11-1.375c1.168.776 2.754 1.273 4.5 1.273s3.332-.497 4.5-1.273v-13c-1.168-.776-2.754-1.273-4.5-1.273-1.746 0-3.332.477-4.5 1.253"></path></svg>
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              Cheat Sheet
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
            {xpathReference.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest border-b border-blue-100 dark:border-blue-900 pb-2">
                  {section.category}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="group">
                      <div className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase mb-1">
                        {item.label}
                      </div>
                      <button
                        onClick={() => {
                          setXpathQuery(item.code);
                          handleCopy(item.code, "Code Copied");
                        }}
                        className="w-full flex justify-between items-center text-left font-mono text-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-gray-700 dark:text-gray-200 hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all"
                      >
                        <span className="truncate mr-2">{item.code}</span>
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default XPathValidator;