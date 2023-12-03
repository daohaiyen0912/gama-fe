import React from 'react';
import { useEffect } from 'react';

export default function LogOutPage() {
  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }, []);
  return <div>Loging Out</div>;
}
