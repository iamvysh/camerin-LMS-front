
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const LibrarianLogin = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === import.meta.env.VITE_LIBRARIAN_USERNAME && password === import.meta.env.VITE_LIBRARIAN_PASSWORD) {
      nav('/librariandashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
       
      }}
    >
        <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ width: '300px' }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
      {error && <div>{error}</div>}
    </Box>
  );
};

export default LibrarianLogin;