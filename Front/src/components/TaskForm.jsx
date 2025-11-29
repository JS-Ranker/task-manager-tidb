import { useState } from 'react';

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('El título es requerido');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            await onTaskCreated({ title, description });
            setTitle('');
            setDescription('');
        } catch (err) {
            setError(err.message || 'Error al crear la tarea');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="task-form-container">
            <h2>➕ Nueva Tarea</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Título de la tarea *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isSubmitting}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="Descripción (opcional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isSubmitting}
                        className="form-textarea"
                        rows="3"
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                >
                    {isSubmitting ? '⏳ Creando...' : '✅ Crear Tarea'}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
