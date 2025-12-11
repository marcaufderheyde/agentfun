"use client";

import { useState } from 'react';
import Card from './Card';
import { Plus, Trash2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TodoList() {
    const [todos, setTodos] = useState<{ id: number, text: string, done: boolean }[]>([
        { id: 1, text: "Review new designs", done: false },
        { id: 2, text: "Email the team", done: true },
    ]);
    const [newTodo, setNewTodo] = useState('');

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
        setNewTodo('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    return (
        <Card className="h-full flex flex-col overflow-hidden !p-0">
            <div className="p-6 pb-2 border-b border-white/10 bg-white/5">
                <h3 className="font-bold text-lg mb-4 text-slate-200">Tasks</h3>
                <form onSubmit={addTodo} className="relative">
                    <input
                        type="text"
                        placeholder="Add a new task..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 pr-10 outline-none focus:border-indigo-500 transition-colors text-sm"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-500 rounded-lg hover:bg-indigo-400 transition-colors">
                        <Plus className="w-4 h-4 text-white" />
                    </button>
                </form>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                <AnimatePresence initial={false}>
                    {todos.map(todo => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`group flex items-center justify-between p-3 rounded-xl transition-all ${todo.done ? 'bg-indigo-500/10' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <button
                                    onClick={() => toggleTodo(todo.id)}
                                    className={`flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${todo.done ? 'bg-indigo-500 border-indigo-500' : 'border-slate-500 hover:border-indigo-400'}`}
                                >
                                    {todo.done && <Check className="w-3 h-3 text-white" />}
                                </button>
                                <span className={`truncate text-sm ${todo.done ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                    {todo.text}
                                </span>
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-400 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {todos.length === 0 && (
                    <div className="text-center text-slate-500 py-8 text-sm">No remaining tasks</div>
                )}
            </div>
        </Card>
    );
}
