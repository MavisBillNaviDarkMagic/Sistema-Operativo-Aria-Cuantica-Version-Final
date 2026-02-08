
import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, Search, LayoutGrid, List } from 'lucide-react';
import { MOCK_FILES } from '../../constants';

const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(['Home']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = MOCK_FILES.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-slate-950/60">
      {/* Navbar */}
      <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 shrink-0 bg-white/5">
        <div className="flex items-center gap-1 text-xs text-white/50">
          {currentPath.map((p, i) => (
            <React.Fragment key={p}>
              <span className="hover:text-white cursor-pointer">{p}</span>
              {i < currentPath.length - 1 && <ChevronRight size={12} />}
            </React.Fragment>
          ))}
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input 
              className="w-full bg-white/5 rounded-md py-1 pl-8 pr-2 text-xs border border-white/10 focus:outline-none focus:border-indigo-500/50"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40'}`}
          >
            <LayoutGrid size={16} />
          </button>
          <button 
             onClick={() => setViewMode('list')}
             className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-48 border-r border-white/5 p-4 space-y-2 hidden md:block bg-black/20">
          <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-2 mb-4">Locations</h3>
          <div className="space-y-1">
            {['Home', 'Desktop', 'Documents', 'Downloads', 'Images', 'System'].map(loc => (
              <div key={loc} className={`px-2 py-1.5 rounded-md text-xs cursor-pointer flex items-center gap-2 ${loc === 'Home' ? 'bg-indigo-500/20 text-indigo-300' : 'text-white/60 hover:bg-white/5'}`}>
                {loc === 'Home' ? <LayoutGrid size={14} /> : <Folder size={14} />}
                {loc}
              </div>
            ))}
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 p-6 overflow-y-auto">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredFiles.map((file, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] ${file.type === 'folder' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {file.type === 'folder' ? <Folder size={32} /> : <FileText size={32} />}
                  </div>
                  <span className="mt-3 text-[11px] font-medium text-white/80 text-center truncate w-full px-2">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="text-white/30 border-b border-white/5 uppercase tracking-wider">
                  <th className="pb-2 font-semibold">Name</th>
                  <th className="pb-2 font-semibold">Modified</th>
                  <th className="pb-2 font-semibold">Size</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                {filteredFiles.map((file, i) => (
                  <tr key={i} className="hover:bg-white/5 border-b border-white/5 group transition-colors">
                    <td className="py-3 flex items-center gap-3">
                      {file.type === 'folder' ? <Folder size={16} className="text-amber-400" /> : <FileText size={16} className="text-blue-400" />}
                      {file.name}
                    </td>
                    <td className="py-3">{file.modified}</td>
                    <td className="py-3">{file.size || '--'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
