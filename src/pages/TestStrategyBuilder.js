import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Textarea from '../components/ui/Textarea';
import Footer from '../components/common/Footer';

// --- ICONS ---
const Icons = {
  Scope: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  Approach: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Env: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
  Gov: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>,
  Magic: () => <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Check: () => <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
  Info: () => <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Plus: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>,
  X: () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
};

// --- DATA: Guide Content ---
const GUIDE_CONTENT = {
  scope: {
    title: "Defining Scope",
    description: "Clearly defining what is tested prevents 'scope creep' and sets expectations.",
    tips: [
      "In Scope: List specific modules, user roles, or browsers.",
      "Out of Scope: Be explicit about what you won't test.",
      "Pro Tip: If you don't list it here, stakeholders might assume it's being tested."
    ]
  },
  approach: {
    title: "Test Approach",
    description: "How will testing be performed? This aligns the technical team on tools and layers.",
    tips: [
      "Test Levels: Do we need unit tests? Or just E2E?",
      "Tools: List specific versions if necessary (e.g., 'Cypress v10+')."
    ]
  },
  governance: {
    title: "Governance & Deliverables",
    description: "The rules of engagement. When do we start, and when are we finished?",
    tips: [
      "Entry Criteria: Don't start testing until these are met.",
      "Exit Criteria: The definition of 'Done'.",
      "Deliverables: The physical evidence you will hand over."
    ]
  }
};

const COMMON_DELIVERABLES = [
  "Test Plan Document",
  "Test Case Suite",
  "Defect Report",
  "RTM (Traceability Matrix)",
  "Test Summary Report",
  "Release Notes",
  "Automated Test Scripts"
];

const TestStrategyBuilder = () => {
  const [activeSection, setActiveSection] = useState('scope');
  const [showGuide, setShowGuide] = useState(true);
  const [saveStatus, setSaveStatus] = useState('All changes saved');
  const [customDeliverable, setCustomDeliverable] = useState('');
  const [showFileMenu, setShowFileMenu] = useState(false);
  
  const [formData, setFormData] = useState({
    meta: { project: 'Project Name', version: '1.0', author: 'QA Lead' },
    scope: { inScope: '', outScope: '' },
    approach: { levels: ['Unit Testing'], types: ['Functional'], tools: '' },
    governance: { 
      entryCriteria: '', 
      exitCriteria: '', 
      deliverables: ['Test Plan Document', 'Test Case Suite', 'Defect Report'] 
    }
  });

  // Auto-save effect
  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => setSaveStatus('All changes saved'), 800);
    return () => clearTimeout(timer);
  }, [formData]);

  // --- HELPERS ---
  const updateField = (section, field, value) => {
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateMeta = (field, value) => {
    setFormData(prev => ({ 
      ...prev, 
      meta: { ...prev.meta, [field]: value } 
    }));
  };

  const toggleArrayItem = (section, field, item) => {
    const list = formData[section][field];
    const newList = list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    updateField(section, field, newList);
  };

  const addDeliverable = () => {
    if (customDeliverable && !formData.governance.deliverables.includes(customDeliverable)) {
      updateField('governance', 'deliverables', [...formData.governance.deliverables, customDeliverable]);
      setCustomDeliverable('');
    }
  };

  const handlePrint = () => {
    window.print();
    setShowFileMenu(false);
  };

  const handleReset = () => {
    if(window.confirm('Reset all fields?')) {
        window.location.reload(); 
    }
  };

  // --- UI COMPONENTS ---
  const SectionButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border ${
        activeSection === id 
          ? 'bg-white border-blue-200 text-blue-700 shadow-sm dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' 
          : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800'
      }`}
    >
      <Icon />
      {label}
    </button>
  );

  const Label = ({ children, required }) => (
    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2.5 ml-1 tracking-wide">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0F19] font-sans text-gray-900 dark:text-gray-100 flex flex-col print:bg-white">
      
      {/* Print Styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #document-preview, #document-preview * { visibility: visible; }
          #document-preview { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; }
          .tool-header, .sidebar, .editor-column, footer { display: none; }
        }
      `}</style>

      {/* === TOOL HEADER (Replaces the fixed header) === */}
      {/* This now sits INSIDE the page flow, perfect for embedding under your main navbar */}
      <div className="tool-header bg-white dark:bg-[#151b2b] border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-5 max-w-[1600px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            
            {/* Left: Branding & Title */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-2.5 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <div className="flex-grow">
                <input 
                  value={formData.meta.project}
                  onChange={(e) => updateMeta('project', e.target.value)}
                  className="text-xl md:text-2xl font-bold bg-transparent border-none p-0 focus:ring-0 w-full text-gray-800 dark:text-gray-100 placeholder-gray-300"
                  placeholder="Untitled Strategy"
                />
                <div className="flex gap-4 text-xs font-medium text-gray-500 mt-1 relative">
                  <div className="relative">
                    <button 
                      onClick={() => setShowFileMenu(!showFileMenu)} 
                      className="hover:text-blue-600 transition-colors flex items-center gap-1"
                    >
                      File <span className="text-[10px] opacity-50">▼</span>
                    </button>
                    {showFileMenu && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-50">
                        <button onClick={handleReset} className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 text-xs">Reset Data</button>
                        <button onClick={handlePrint} className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs">Print / PDF</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
               <span className="text-xs text-gray-400 hidden md:flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                 {saveStatus === 'Saving...' ? <span className="animate-pulse">Saving...</span> : <><Icons.Check /> Auto-Saved</>}
               </span>
               <Button onClick={handlePrint} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-6 shadow-lg shadow-blue-500/20 transition-transform active:scale-95">
                  <Icons.Download /> Export PDF
               </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto p-6 max-w-[1600px] flex flex-col lg:flex-row gap-8">
        
        {/* === LEFT SIDEBAR (Sticky Navigation) === */}
        <aside className="sidebar w-full lg:w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-6 space-y-2">
            <div className="px-4 mb-2 text-xs font-extrabold text-gray-400 uppercase tracking-widest">Builder Steps</div>
            <SectionButton id="scope" label="1. Scope & Objective" icon={Icons.Scope} />
            <SectionButton id="approach" label="2. Test Approach" icon={Icons.Approach} />
            <SectionButton id="governance" label="3. Governance" icon={Icons.Gov} />
            
            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 px-4">
               <p className="text-xs text-gray-400 leading-relaxed">
                 Use this tool to generate a standardized IEEE-829 compatible strategy document.
               </p>
            </div>
          </div>
        </aside>

        {/* === MOBILE NAV (Visible only on small screens) === */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-2 mb-2 sidebar">
            <SectionButton id="scope" label="Scope" icon={Icons.Scope} />
            <SectionButton id="approach" label="Approach" icon={Icons.Approach} />
            <SectionButton id="governance" label="Governance" icon={Icons.Gov} />
        </div>

        {/* === CENTER: EDITOR === */}
        <div className="editor-column w-full lg:w-[520px] flex-shrink-0 space-y-6">
          
          {/* Contextual Guide */}
          {showGuide && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-5 relative animate-fadeIn shadow-sm">
              <button 
                onClick={() => setShowGuide(false)}
                className="absolute top-3 right-3 text-blue-400 hover:text-blue-600 transition-colors"
              >
                <Icons.X />
              </button>
              <div className="flex gap-4">
                <div className="mt-1 bg-white dark:bg-blue-800 p-1.5 rounded-full shadow-sm text-blue-600"><Icons.Info /></div>
                <div>
                  <h4 className="font-bold text-sm text-blue-900 dark:text-blue-100 mb-1">{GUIDE_CONTENT[activeSection].title}</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mb-2 leading-relaxed opacity-90">
                    {GUIDE_CONTENT[activeSection].description}
                  </p>
                  <ul className="list-disc list-inside text-xs text-blue-600 dark:text-blue-400 space-y-1">
                    {GUIDE_CONTENT[activeSection].tips.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <Card className="h-full border-0 shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-[#151b2b]">
            <div className="bg-white dark:bg-[#151b2b] px-8 py-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center rounded-t-xl sticky top-0 z-10">
               <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                 {activeSection.replace(/([A-Z])/g, ' $1').trim()}
               </h2>
               <button onClick={() => setShowGuide(!showGuide)} className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                 {showGuide ? 'Hide Tips' : 'Show Tips'}
               </button>
            </div>

            <Card.Content className="p-8 space-y-8">
              
              {/* SECTION 1: SCOPE */}
              {activeSection === 'scope' && (
                <div className="animate-fadeIn space-y-8">
                  <div>
                    <Label required>In Scope</Label>
                    <Textarea 
                      rows={6} 
                      value={formData.scope.inScope}
                      onChange={(e) => updateField('scope', 'inScope', e.target.value)}
                      placeholder="e.g., Login, Payments..."
                    />
                     <p className="text-xs text-gray-400 mt-2 ml-1">Describe clearly what must be validated.</p>
                  </div>
                  <div>
                    <Label>Out of Scope</Label>
                    <Textarea 
                      rows={4} 
                      value={formData.scope.outScope}
                      onChange={(e) => updateField('scope', 'outScope', e.target.value)}
                      placeholder="e.g., Legacy modules..."
                      className="bg-gray-50/50 dark:bg-gray-800/50"
                    />
                  </div>
                </div>
              )}

              {/* SECTION 2: APPROACH */}
              {activeSection === 'approach' && (
                <div className="animate-fadeIn space-y-8">
                  <div>
                    <Label>Test Levels</Label>
                    <div className="flex flex-wrap gap-2.5">
                      {['Unit Testing', 'Integration', 'System', 'E2E', 'UAT'].map((level) => (
                        <button
                          key={level}
                          onClick={() => toggleArrayItem('approach', 'levels', level)}
                          className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-200 ${
                            formData.approach.levels.includes(level)
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                              : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Tools Ecosystem</Label>
                    <Textarea 
                      rows={5} 
                      value={formData.approach.tools}
                      onChange={(e) => updateField('approach', 'tools', e.target.value)}
                      placeholder="e.g. JIRA (Defects), Cypress (E2E)..."
                    />
                  </div>
                </div>
              )}

              {/* SECTION 3: GOVERNANCE */}
              {activeSection === 'governance' && (
                <div className="animate-fadeIn space-y-8">
                  <div>
                    <Label required>Entry Criteria</Label>
                    <Textarea 
                      rows={3} 
                      value={formData.governance.entryCriteria}
                      onChange={(e) => updateField('governance', 'entryCriteria', e.target.value)}
                      className="border-l-4 border-l-green-400 rounded-l-none" 
                      placeholder="Prerequisites..."
                    />
                  </div>

                  <div>
                    <Label required>Exit Criteria</Label>
                    <Textarea 
                      rows={3} 
                      value={formData.governance.exitCriteria}
                      onChange={(e) => updateField('governance', 'exitCriteria', e.target.value)}
                      className="border-l-4 border-l-blue-400 rounded-l-none"
                      placeholder="Completion rules..."
                    />
                  </div>

                  {/* --- DELIVERABLES UI --- */}
                  <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Label>Key Deliverables</Label>
                    
                    {/* Active Chips */}
                    <div className="flex flex-wrap gap-2 mb-4">
                       {formData.governance.deliverables.map((item, idx) => (
                         <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                           {item}
                           <button onClick={() => toggleArrayItem('governance', 'deliverables', item)} className="hover:text-blue-600">
                             <Icons.X />
                           </button>
                         </span>
                       ))}
                       {formData.governance.deliverables.length === 0 && <span className="text-xs text-gray-400 italic">No deliverables added yet.</span>}
                    </div>

                    {/* Selector Area */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                       <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Quick Add</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {COMMON_DELIVERABLES.filter(d => !formData.governance.deliverables.includes(d)).map((item) => (
                          <button 
                            key={item}
                            onClick={() => toggleArrayItem('governance', 'deliverables', item)}
                            className="px-3 py-1.5 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 transition-all shadow-sm flex items-center gap-1"
                          >
                            <Icons.Plus /> {item}
                          </button>
                        ))}
                      </div>
                      
                      {/* Add Custom */}
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={customDeliverable}
                          onChange={(e) => setCustomDeliverable(e.target.value)}
                          placeholder="Add custom item..."
                          className="flex-grow text-xs px-3 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                          onKeyPress={(e) => e.key === 'Enter' && addDeliverable()}
                        />
                        <button 
                          onClick={addDeliverable}
                          className="text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg font-medium"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </Card.Content>
          </Card>
        </div>

        {/* === RIGHT: PREVIEW === */}
        <div className="flex-grow flex justify-center bg-gray-200/50 dark:bg-[#0f1218] rounded-xl overflow-hidden py-4 overflow-y-auto print:bg-white print:overflow-visible sticky top-6 h-[calc(100vh-140px)]">
          <div id="document-preview" className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl print:shadow-none p-[20mm] text-[11pt] leading-relaxed scale-[0.85] lg:scale-95 origin-top transition-transform duration-300">
            
            {/* DOC HEADER */}
            <div className="border-b-4 border-black pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-extrabold uppercase tracking-tighter mb-1 text-gray-900">Test Strategy</h1>
                <p className="text-gray-500 font-serif italic text-lg">{formData.meta.project || 'Project Name'}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p><strong>Version:</strong> {formData.meta.version}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* SECTIONS */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b border-gray-300 mb-4 pb-1">1. Scope & Objective</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-900 mb-2">In Scope</h4>
                  <div className="whitespace-pre-line text-sm text-gray-800 pl-2 border-l-2 border-green-500">{formData.scope.inScope || 'N/A'}</div>
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Out of Scope</h4>
                  <div className="whitespace-pre-line text-sm text-gray-500 italic pl-2 border-l-2 border-red-200">{formData.scope.outScope || 'None'}</div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b border-gray-300 mb-4 pb-1">2. Approach & Tools</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                 {formData.approach.levels.map(l => <span key={l} className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-300">{l}</span>)}
              </div>
              <div className="bg-slate-50 p-5 border border-slate-200 rounded-lg whitespace-pre-line text-sm font-mono">
                {formData.approach.tools || 'Tools TBD'}
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-blue-800 border-b border-gray-300 mb-4 pb-1">3. Governance</h3>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-3 rounded">
                   <h4 className="text-xs font-bold uppercase mb-2">Entry Criteria</h4>
                   <p className="text-sm whitespace-pre-line">{formData.governance.entryCriteria || 'Standard Entry'}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                   <h4 className="text-xs font-bold uppercase mb-2">Exit Criteria</h4>
                   <p className="text-sm whitespace-pre-line">{formData.governance.exitCriteria || 'Standard Exit'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold text-xs uppercase text-gray-500 mb-2">Key Deliverables</h4>
                <ul className="grid grid-cols-2 gap-2">
                  {formData.governance.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
             {/* Footer Signoff */}
             <div className="mt-12 pt-8 border-t border-gray-300 flex justify-between items-center text-xs text-gray-500">
               <div>Approved By: ___________________________</div>
               <div>Date: ________________</div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TestStrategyBuilder;