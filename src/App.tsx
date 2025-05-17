import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import Home from './pages/Home';
import ReadMovie from './pages/ReadMovie';
import CreateMovie from './pages/CreateMovie';
import UpdateMovie from './pages/UpdateMovie';
import DeleteMovie from './pages/DeleteMovie';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<ReadMovie />} />
          <Route path="/create" element={<CreateMovie />} />
          <Route path="/update" element={<UpdateMovie />} />
          <Route path="/delete" element={<DeleteMovie />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
