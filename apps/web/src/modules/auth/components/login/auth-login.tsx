import React from 'react';
import AuthLoginForm from './auth-login-form';

const AuthLogin: React.FC = () => {
  return (
    <div className="bg-foreground rounded-lg shadow-lg border container max-w-md p-4">
      <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-neutral-50">Login</h1>
      <AuthLoginForm />
    </div>
  );
};

export default AuthLogin;
