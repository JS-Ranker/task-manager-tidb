function TaskItem({ task, onToggle, onDelete }) {
    const handleToggle = async () => {
        try {
            await onToggle(task.id);
        } catch (error) {
            console.error('Error al cambiar estado:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('¿Estás seguro de eliminar esta tarea?')) {
            try {
                await onDelete(task.id);
            } catch (error) {
                console.error('Error al eliminar:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-checkbox">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggle}
                    id={`task-${task.id}`}
                />
                <label htmlFor={`task-${task.id}`}></label>
            </div>

            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
                <div className="task-meta">
                    <span className="task-date">📅 {formatDate(task.created_at)}</span>
                    {task.completed && (
                        <span className="task-badge">✅ Completada</span>
                    )}
                </div>
            </div>

            <button
                onClick={handleDelete}
                className="btn-delete"
                title="Eliminar tarea"
            >
                🗑️
            </button>
        </div>
    );
}

export default TaskItem;
