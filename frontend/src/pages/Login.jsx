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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
            />
            {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email.message}</div>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              {...register('password', { required: 'Password required', minLength: { value: 6, message: 'Min 6 chars' } })}
            />
            {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password.message}</div>}
          </div>

          <div>
            <button
              type="submit"
              disabled={auth.loginState.isLoading}
              className="w-full inline-flex justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md disabled:opacity-60"
            >
              {auth.loginState.isLoading ? 'Logging...' : 'Login'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-sm text-gray-500 text-center">
          <small>Demo credentials: <span className="font-medium text-gray-700">Email: user@example.com</span> - <span className="font-medium text-gray-700">Password: user123</span></small>
        </div>
      </div>
    </div>
  );
}
