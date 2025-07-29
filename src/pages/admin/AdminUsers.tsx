import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { faker } from '@faker-js/faker';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2 } from 'lucide-react';

const AdminUsers: React.FC = () => {
    const { state, dispatch } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const openModal = (user: User | null = null) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentUser(null);
        setIsModalOpen(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
            dispatch({ type: 'DELETE_USER', payload: id });
        }
    };

    const UserModal = ({ user, onClose }: { user: User | null, onClose: () => void }) => {
        const [formData, setFormData] = useState({
            id: user?.id || faker.string.uuid(),
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            role: user?.role || 'user',
            joinDate: user?.joinDate || new Date().toISOString(),
            avatar: user?.avatar || faker.image.avatar(),
        });

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (user) {
                dispatch({ type: 'EDIT_USER', payload: { ...user, ...formData } });
            } else {
                dispatch({ type: 'ADD_USER', payload: { ...formData, password: faker.internet.password() } as User });
            }
            onClose();
        };

        return (
            <motion.div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                    className="glass-card w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
                    <h2 className="text-xl font-bold mb-4">{user ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Nama" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded"/>
                        <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded"/>
                        <input type="text" placeholder="Telepon" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded"/>
                        <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value as 'admin' | 'user'})} className="w-full p-2 bg-slate-800 border border-slate-700 rounded">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-600 rounded">Batal</button>
                            <button type="submit" className="px-4 py-2 bg-primary-600 rounded">Simpan</button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-100">Manajemen Pengguna</h1>
                <button onClick={() => openModal()} className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                    <Plus /><span>Tambah Pengguna</span>
                </button>
            </div>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="p-3">Nama</th><th className="p-3">Email</th><th className="p-3">Peran</th><th className="p-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.users.map(user => (
                                <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                    <td className="p-3 flex items-center space-x-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                        <span>{user.name}</span>
                                    </td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'admin' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>{user.role}</span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => openModal(user)} className="p-2 hover:bg-slate-700 rounded"><Edit className="w-4 h-4" /></button>
                                        <button onClick={() => handleDelete(user.id)} className="p-2 hover:bg-slate-700 rounded text-red-400"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <AnimatePresence>
                {isModalOpen && <UserModal user={currentUser} onClose={closeModal} />}
            </AnimatePresence>
        </div>
    );
};

export default AdminUsers;
