import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404 — Page not found</h1>
      <p>
        The page you are looking for does not exist. <Link to="/">Go home</Link>.
      </p>
    </div>
  );
}
