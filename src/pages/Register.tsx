import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faker } from '@faker-js/faker';
import AuthForm from '../components/Common/AuthForm';
import { useApp } from '../context/AppContext';
import { users as mockUsers } from '../data/users';
import { User } from '../types';

const Register: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();

  const handleRegister = (formData: any) => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      const existingUser = mockUsers.find((u) => u.email === formData.email);

      if (existingUser) {
        setError('Email sudah terdaftar. Silakan gunakan email lain.');
        setLoading(false);
      } else {
        const newUser: User = {
          id: faker.string.uuid(),
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: faker.phone.number(),
          avatar: faker.image.avatar(),
          joinDate: new Date().toISOString(),
          role: 'user',
        };
        
        // In a real app, you'd send this to the backend.
        // Here we'll just add it to our mock data and log the user in.
        mockUsers.push(newUser);
        dispatch({ type: 'REGISTER', payload: newUser });
        setLoading(false);
        navigate('/');
      }
    }, 1000);
  };

  return <AuthForm type="register" onSubmit={handleRegister} error={error} loading={loading} />;
};

export default Register;
