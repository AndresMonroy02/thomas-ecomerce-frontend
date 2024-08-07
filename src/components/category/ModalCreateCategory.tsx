import { useState } from 'react';

export const ModalCreateCategory: React.FC<{ onClose: () => void, onCreate: (name: string) => void }> = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');

    const handleSubmit = () => {
        if (name.trim()) {
            onCreate(name);
            setName('');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-xl font-bold mb-4">Crear Nueva Categoria</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre de la categoria"
                    className="border p-2 mb-4 w-full"
                />
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-lime-500 rounded-full hover:bg-lime-600 transition-all duration-200"
                    >
                        Crear
                    </button>
                </div>
            </div>
        </div>
    );
};
