import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import Footer from '../components/common/Footer';

const CharacterCounter = () => {
  const [textInput, setTextInput] = useState('');
  const [stats, setStats] = useState({
    chars: 0,
    words: 0,
    lines: 0,
    noSpaces: 0,
    bytes: 0,
  });

  // 1. Real-time calculation effect
  useEffect(() => {
    const trimmed = textInput.trim();
    
    // Calculate Byte size (UTF-8)
    const getByteSize = (str) => new Blob([str]).size;

    setStats({
      chars: textInput.length,
      words: trimmed === '' ? 0 : trimmed.split(/\s+/).length,
      lines: textInput.length === 0 ? 0 : textInput.split(/\n/).length,
      noSpaces: textInput.replace(/\s/g, '').length,
      bytes: getByteSize(textInput),
    });
  }, [textInput]);

  // 2. Text Manipulation Tools for Testers
  const handleTransform = (type) => {
    let newText = textInput;
    switch (type) {
      case 'upper':
        newText = textInput.toUpperCase();
        break;
      case 'lower':
        newText = textInput.toLowerCase();
        break;
      case 'clean':
        // Replaces multiple spaces with single space, trims lines
        newText = textInput.replace(/\s+/g, ' ').trim();
        break;
      case 'clear':
        newText = '';
        break;
      default:
        break;
    }
    setTextInput(newText);
  };

  const copyToClipboard = () => {
    if (textInput) {
      navigator.clipboard.writeText(textInput);
      // Optional: Add a toast notification here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto p-4 px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Character Counter & Cleaner</h1>

        {/* Two-Column Layout matching your JsonViewer */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">

          {/* === LEFT COLUMN: INPUT === */}
          <Card className="flex flex-col h-full">
            <Card.Header className="flex justify-between items-center">
              <Card.Title>Text Input</Card.Title>
              {textInput && (
                <button 
                  onClick={() => handleTransform('clear')}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold"
                >
                  Clear Text
                </button>
              )}
            </Card.Header>
            <Card.Content className="flex-grow">
              <Textarea
                placeholder="Type or paste text here to analyze..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                rows={20}
                className="w-full h-full resize-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </Card.Content>
            <Card.Footer className="flex justify-between items-center text-sm text-gray-500">
              <span>Ready to process</span>
              <Button onClick={copyToClipboard} variant="outline" size="sm">
                Copy Text
              </Button>
            </Card.Footer>
          </Card>

          {/* === RIGHT COLUMN: STATS & TOOLS === */}
          <div className="space-y-6">
            
            {/* 1. Primary Stats Card (Google Style Big Numbers) */}
            <Card>
              <Card.Header>
                <Card.Title>Statistics</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {stats.chars}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide mt-1">
                      Characters
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                      {stats.words}
                    </div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide mt-1">
                      Words
                    </div>
                  </div>
                </div>

                {/* Detailed Stats List */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Sentences (Lines)</span>
                    <span className="font-mono font-semibold">{stats.lines}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Characters (No Spaces)</span>
                    <span className="font-mono font-semibold">{stats.noSpaces}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Size (Bytes)</span>
                    <span className="font-mono font-semibold">{stats.bytes} B</span>
                  </div>
                </div>
              </Card.Content>
            </Card>

            {/* 2. Tools Card - For Data Normalization */}
            <Card>
              <Card.Header>
                <Card.Title>Manipulation Tools</Card.Title>
              </Card.Header>
              <Card.Content className="space-y-3">
                <p className="text-sm text-gray-500 mb-2">
                  Quickly format text for test cases.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => handleTransform('upper')}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                  >
                    UPPERCASE
                  </Button>
                  <Button 
                    onClick={() => handleTransform('lower')}
                    className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                  >
                    lowercase
                  </Button>
                  <Button 
                    onClick={() => handleTransform('clean')}
                    className="col-span-2 bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                  >
                    Remove Extra Whitespace
                  </Button>
                </div>
              </Card.Content>
            </Card>
            
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CharacterCounter;