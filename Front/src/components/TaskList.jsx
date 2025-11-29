import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, filter, onFilterChange }) {
    const filterButtons = [
        { value: 'all', label: '📋 Todas', emoji: '📋' },
        { value: 'pending', label: '⏳ Pendientes', emoji: '⏳' },
        { value: 'completed', label: '✅ Completadas', emoji: '✅' }
    ];

    const getFilteredTasks = () => {
        if (filter === 'completed') {
            return tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            return tasks.filter(task => !task.completed);
        }
        return tasks;
    };

    const filteredTasks = getFilteredTasks();
    const completedCount = tasks.filter(t => t.completed).length;
    const pendingCount = tasks.filter(t => !t.completed).length;

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h2>📝 Mis Tareas</h2>
                <div className="task-stats">
                    <span className="stat">Total: {tasks.length}</span>
                    <span className="stat pending">Pendientes: {pendingCount}</span>
                    <span className="stat completed">Completadas: {completedCount}</span>
                </div>
            </div>

            <div className="filter-buttons">
                {filterButtons.map(btn => (
                    <button
                        key={btn.value}
                        onClick={() => onFilterChange(btn.value)}
                        className={`filter-btn ${filter === btn.value ? 'active' : ''}`}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>

            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    <p className="empty-icon">📭</p>
                    <p className="empty-text">
                        {filter === 'all' && 'No hay tareas. ¡Crea tu primera tarea!'}
                        {filter === 'pending' && 'No hay tareas pendientes'}
                        {filter === 'completed' && 'No hay tareas completadas'}
                    </p>
                </div>
            ) : (
                <div className="task-list">
                    {filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default TaskList;
