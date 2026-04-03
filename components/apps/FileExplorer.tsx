
import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, Search, LayoutGrid, List, HardDrive, Clock, Star, Download, Image, Music, Video, Trash2 } from 'lucide-react';
import { MOCK_FILES } from '../../constants';
import { cn } from '../../src/lib/utils';

const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(['Este Equipo', 'Disco Local (C:)', 'Usuarios', 'Papa']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiles = MOCK_FILES.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-white text-slate-800 font-sans">
      {/* Toolbar */}
      <div className="h-14 border-b border-slate-200 flex items-center px-4 gap-6 bg-slate-50 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-slate-200 rounded-md text-slate-500 transition-colors">
              <ChevronRight size={18} className="rotate-180" />
            </button>
            <button className="p-2 hover:bg-slate-200 rounded-md text-slate-500 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
          <button className="p-2 hover:bg-slate-200 rounded-md text-slate-500 transition-colors">
            <ChevronRight size={18} className="-rotate-90" />
          </button>
        </div>

        {/* Breadcrumbs */}
        <div className="flex-1 flex items-center bg-white border border-slate-200 rounded-md px-3 py-1.5 gap-2 text-sm">
          <Folder size={16} className="text-amber-500" />
          {currentPath.map((p, i) => (
            <React.Fragment key={p}>
              <span className="hover:bg-slate-100 px-1 rounded cursor-pointer transition-colors">{p}</span>
              {i < currentPath.length - 1 && <ChevronRight size={14} className="text-slate-400" />}
            </React.Fragment>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            className="w-full bg-white border border-slate-200 rounded-md py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            placeholder="Buscar en Papa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-slate-200 p-4 space-y-6 overflow-y-auto bg-slate-50 shrink-0">
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Acceso Rápido</h3>
            {[
              { icon: <Star size={16} />, label: 'Favoritos', color: 'text-yellow-500' },
              { icon: <Clock size={16} />, label: 'Recientes', color: 'text-blue-500' },
              { icon: <Download size={16} />, label: 'Descargas', color: 'text-green-500' },
              { icon: <Image size={16} />, label: 'Imágenes', color: 'text-purple-500' },
            ].map(item => (
              <div key={item.label} className="px-3 py-2 rounded-md text-sm cursor-pointer flex items-center gap-3 hover:bg-slate-200 transition-colors text-slate-700">
                <span className={item.color}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">Este Equipo</h3>
            {[
              { icon: <HardDrive size={16} />, label: 'Disco Local (C:)', color: 'text-slate-500' },
              { icon: <Folder size={16} />, label: 'Documentos', color: 'text-amber-500' },
              { icon: <Music size={16} />, label: 'Música', color: 'text-pink-500' },
              { icon: <Video size={16} />, label: 'Videos', color: 'text-indigo-500' },
              { icon: <Trash2 size={16} />, label: 'Papelera', color: 'text-slate-400' },
            ].map(item => (
              <div key={item.label} className="px-3 py-2 rounded-md text-sm cursor-pointer flex items-center gap-3 hover:bg-slate-200 transition-colors text-slate-700">
                <span className={item.color}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Archivos de Papa</h2>
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 rounded transition-all", viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600')}
              >
                <LayoutGrid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 rounded transition-all", viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400 hover:text-slate-600')}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {filteredFiles.map((file, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer p-4 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200">
                  <div className={cn(
                    "w-20 h-20 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm",
                    file.type === 'folder' ? 'bg-amber-100 text-amber-500' : 'bg-blue-100 text-blue-500'
                  )}>
                    {file.type === 'folder' ? <Folder size={40} /> : <FileText size={40} />}
                  </div>
                  <span className="mt-4 text-xs font-bold text-slate-700 text-center truncate w-full px-2">
                    {file.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-tighter">
                    {file.type === 'folder' ? 'Carpeta' : 'Archivo'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="text-slate-400 border-b border-slate-100 uppercase tracking-wider text-[10px] font-black">
                  <th className="pb-3 font-bold">Nombre</th>
                  <th className="pb-3 font-bold">Fecha de Modificación</th>
                  <th className="pb-3 font-bold">Tamaño</th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                {filteredFiles.map((file, i) => (
                  <tr key={i} className="hover:bg-slate-50 border-b border-slate-50 group transition-colors cursor-pointer">
                    <td className="py-4 flex items-center gap-4 font-medium text-slate-800">
                      {file.type === 'folder' ? <Folder size={20} className="text-amber-500" /> : <FileText size={20} className="text-blue-500" />}
                      {file.name}
                    </td>
                    <td className="py-4 text-slate-400">{file.modified}</td>
                    <td className="py-4 text-slate-400">{file.size || '--'}</td>
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
