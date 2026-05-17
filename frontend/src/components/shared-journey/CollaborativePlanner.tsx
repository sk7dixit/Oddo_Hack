import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, MoreVertical, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CollaborativePlanner = ({ tasks }: { tasks: any[] }) => {
  const columns = [
    { id: 'pending', name: 'Pending', color: 'text-slate-400' },
    { id: 'in-progress', name: 'In Progress', color: 'text-blue-400' },
    { id: 'completed', name: 'Completed', color: 'text-emerald-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold text-white tracking-tight">Shared Planner</h2>
        <button className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="space-y-4">
              <div className="flex items-center justify-between px-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className={cn("h-2 w-2 rounded-full", col.id === 'pending' ? 'bg-slate-500' : col.id === 'in-progress' ? 'bg-blue-500' : 'bg-emerald-500')} />
                  <h3 className={cn("text-xs font-bold uppercase tracking-widest", col.color)}>{col.name}</h3>
                </div>
                <span className="text-[10px] font-bold text-slate-500">{colTasks.length}</span>
              </div>

              <div className="space-y-4">
                {colTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 group cursor-pointer hover:border-white/20 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        {task.status === 'completed' ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 text-slate-600 shrink-0" />
                        )}
                        <h4 className={cn(
                          "text-sm font-bold tracking-tight",
                          task.status === 'completed' ? "text-slate-500 line-through" : "text-white"
                        )}>{task.title}</h4>
                      </div>
                      <button className="text-slate-600 hover:text-white transition-colors">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
                          className="h-6 w-6 rounded-full border border-white/10" 
                          alt="user"
                        />
                        <span className="text-[10px] font-bold text-slate-500">{task.assignedTo}</span>
                      </div>
                      {task.status === 'in-progress' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400">
                          <Clock className="h-3 w-3" />
                          2h
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
