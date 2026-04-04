
import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, Search, LayoutGrid, List, HardDrive, Clock, Star, Download, Image, Music, Video, Trash2 } from 'lucide-react';
import { MOCK_FILES } from '../../constants';
import { cn } from '../../src/lib/utils';

const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(['/', 'home', 'aria']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = MOCK_FILES.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-[#2c001e] text-white font-sans">
      {/* Toolbar */}
      <div className="h-14 border-b border-white/10 flex items-center px-4 gap-6 bg-[#3d0029] shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/10 rounded-md text-white/60 transition-colors">
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-md text-white/60 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Breadcrumbs */}
        <div className="flex-1 flex items-center bg-black/20 border border-white/10 rounded-md px-3 py-1.5 gap-2 text-sm">
          <Folder size={16} className="text-[#E95420]" />
          {currentPath.map((p, i) => (
            <React.Fragment key={p}>
              <span className="hover:bg-white/10 px-1 rounded cursor-pointer transition-colors">{p}</span>
              {i < currentPath.length - 1 && <ChevronRight size={14} className="text-white/20" />}
            </React.Fragment>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input 
            className="w-full bg-black/20 border border-white/10 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95420]/50 transition-all"
            placeholder="Buscar en aria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-white/10 p-4 space-y-6 overflow-y-auto bg-[#3d0029] shrink-0">
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-2 mb-2">Lugares</h3>
            {[
              { icon: <Folder size={16} />, label: 'Carpeta Personal', color: 'text-[#E95420]' },
              { icon: <Download size={16} />, label: 'Descargas', color: 'text-green-500' },
              { icon: <Image size={16} />, label: 'Imágenes', color: 'text-purple-500' },
              { icon: <Video size={16} />, label: 'Videos', color: 'text-indigo-500' },
            ].map(item => (
              <div key={item.label} className="px-3 py-2 rounded-md text-sm cursor-pointer flex items-center gap-3 hover:bg-white/10 transition-colors text-white/80">
                <span className={item.color}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-widest px-2 mb-2">Sistema</h3>
            {[
              { icon: <HardDrive size={16} />, label: 'Sistema de Archivos', color: 'text-slate-400' },
              { icon: <Trash2 size={16} />, label: 'Papelera', color: 'text-slate-400' },
            ].map(item => (
              <div key={item.label} className="px-3 py-2 rounded-md text-sm cursor-pointer flex items-center gap-3 hover:bg-white/10 transition-colors text-white/80">
                <span className={item.color}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#2c001e]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">aria</h2>
            <div className="flex items-center gap-2 bg-black/20 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 rounded transition-all", viewMode === 'grid' ? 'bg-white/10 shadow-sm text-[#E95420]' : 'text-white/40 hover:text-white/60')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 rounded transition-all", viewMode === 'list' ? 'bg-white/10 shadow-sm text-[#E95420]' : 'text-white/40 hover:text-white/60')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredFiles.map((file, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer p-4 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                    file.type === 'folder' ? 'bg-[#E95420]/20 text-[#E95420]' : 'bg-white/10 text-white/60'
                  )}>
                    {file.type === 'folder' ? <Folder size={40} /> : <FileText size={40} />}
                  </div>
                  <span className="mt-4 text-xs font-bold text-white/80 text-center truncate w-full px-2">
                    {file.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-white/40 border-b border-white/10 uppercase tracking-wider text-[10px] font-black">
                  <th className="pb-3 font-bold">Nombre</th>
                  <th className="pb-3 font-bold">Fecha</th>
                  <th className="pb-3 font-bold">Tamaño</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                {filteredFiles.map((file, i) => (
                  <tr key={i} className="hover:bg-white/5 border-b border-white/5 group transition-colors cursor-pointer">
                    <td className="py-4 flex items-center gap-4 font-medium text-white/80">
                      {file.type === 'folder' ? <Folder size={20} className="text-[#E95420]" /> : <FileText size={20} className="text-white/40" />}
                      {file.name}
                    </td>
                    <td className="py-4 text-white/40">{file.modified}</td>
                    <td className="py-4 text-white/40">{file.size || '--'}</td>
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
