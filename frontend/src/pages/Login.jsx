import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await auth.login(data); // mutateAsync
      navigate('/dashboard');
    } catch (err) {
      // display error
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label><br/>
          <input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} />
          {errors.email && <div style={{ color: 'red' }}>{errors.email.message}</div>}
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label><br/>
          <input type="password" {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })} />
          {errors.password && <div style={{ color: 'red' }}>{errors.password.message}</div>}
        </div>

        <button type="submit" disabled={auth.loginState.isLoading}>{auth.loginState.isLoading ? 'Logging...' : 'Login'}</button>
      </form>
      <div style={{ marginTop: 8 }}>
        <small>Demo credentials: user@example.com / password123</small>
      </div>
    </div>
  );
}
