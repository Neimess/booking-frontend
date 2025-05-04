import React from 'react';
import { useForm } from '../hooks/useForm';
import { useAuth } from '../hooks/useAuth';

export default function RegisterPage() {
  const { register, error } = useAuth();
  const { values, errors, handleChange, handleSubmit } = useForm(
    { username: '', password: '', name: '', lastName: '' },
    (vals) => {
      const errs = {};
      if (!vals.username) errs.username = 'Required';
      if (!vals.password) errs.password = 'Required';
      return errs;
    }
  );

  const onSubmit = async (vals) => {
    try {
      await register(vals);
      // редирект на защищённую страницу
    } catch {
      // ошибка через error контекст
    }
  };

  return (
    <div className="register-page">
      <h1>Register</h1>
      <form onSubmit={e => handleSubmit(e, onSubmit)}>
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
          placeholder="Username"
        />
        {errors.username && <p className="error">{errors.username}</p>}

        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <input
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="First Name"
        />

        <input
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          placeholder="Last Name"
        />

        <button type="submit">Sign Up</button>
        {error && <p className="error">{error.message}</p>}
      </form>
    </div>
  );
}