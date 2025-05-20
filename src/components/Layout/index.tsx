import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

export default function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className="flex-1 pt-14 p-4 flex justify-center">
        <div className="w-[70vw] max-w-4xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}