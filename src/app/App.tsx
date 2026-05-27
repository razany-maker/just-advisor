import { RouterProvider } from 'react-router';
import { router } from './routes';
import '@xyflow/react/dist/style.css';

export default function App() {
  return <RouterProvider router={router} />;
}
