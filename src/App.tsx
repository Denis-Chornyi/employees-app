import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './header/Header';
import Main from './main/Main';
import WorkerInfo from './worker-info/WorkerInfo';

const App: React.FC = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);

  const toggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleWorkerSelect = (id: string) => {
    setSelectedWorker(id);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header toggleSort={toggleSort} setSearchTerm={setSearchTerm} />
              <Main
                toggleSort={toggleSort}
                isSortOpen={isSortOpen}
                searchTerm={searchTerm}
                setSelectedWorker={handleWorkerSelect}
              />
            </>
          }
        />
        <Route
          path="/worker/:workerId"
          element={<WorkerInfo onClose={() => setSelectedWorker(null)} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
