import { useState } from 'react';
import { auth } from './api';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const nav = useNavigate();
    
    const submit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await auth.login(email, password);
            onLogin(res.user);
            nav('/');
        } catch (err) {
            setError( (err.error) || 'Invalid email or password');
        }
    };

    return (
        <div className="card p-4 mx-auto" style={{ maxWidth: '480px' }}>
            <h4>Login</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;