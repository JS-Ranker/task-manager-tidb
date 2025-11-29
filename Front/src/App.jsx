import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskService } from './services/taskService';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Cargar tareas al iniciar
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (err) {
            setError('Error al cargar las tareas. Asegúrate de que el servidor esté corriendo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (taskData) => {
        const newTask = await taskService.createTask(taskData);
        setTasks([newTask, ...tasks]);
    };

    const handleToggleTask = async (id) => {
        const updatedTask = await taskService.toggleTask(id);
        setTasks(tasks.map(task =>
            task.id === id ? updatedTask : task
        ));
    };

    const handleDeleteTask = async (id) => {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <h1>🚀 Gestión de Tareas</h1>
                    <p className="subtitle">Powered by TiDB Cloud + React + Node.js</p>
                </div>
            </header>

            <main className="app-main">
                <div className="container">
                    {error && (
                        <div className="alert alert-error">
                            ⚠️ {error}
                            <button onClick={loadTasks} className="btn-retry">
                                🔄 Reintentar
                            </button>
                        </div>
                    )}

                    <TaskForm onTaskCreated={handleCreateTask} />

                    {loading ? (
                        <div className="loading">
                            <div className="spinner"></div>
                            <p>Cargando tareas...</p>
                        </div>
                    ) : (
                        <TaskList
                            tasks={tasks}
                            filter={filter}
                            onFilterChange={setFilter}
                            onToggle={handleToggleTask}
                            onDelete={handleDeleteTask}
                        />
                    )}
                </div>
            </main>

            <footer className="app-footer">
                <p>Desarrollado con ❤️ usando React, Node.js y TiDB Cloud</p>
            </footer>
        </div>
    );
}

export default App;
