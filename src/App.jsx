// src/App.jsx

import AppRoutes from './router/AppRoutes';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div >
        <main>
          <ThemeToggle/>
          <AppRoutes /> 
        </main>
    </div>
  );
}

export default App;
