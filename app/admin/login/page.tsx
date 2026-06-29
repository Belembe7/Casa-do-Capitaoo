'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { createClient, isSupabaseConfigured } from '@/lib/supabase/client';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError('');

    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (authError) {
        setError('Credenciais inválidas');
        toast.error('Credenciais inválidas');
        return;
      }
      toast.success('Bem-vindo!');
      router.push('/admin/dashboard');
      router.refresh();
      return;
    }

    const res = await fetch('/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      sessionStorage.setItem('admin-auth', 'true');
      toast.success('Bem-vindo!');
      router.push('/admin/dashboard');
    } else {
      setError('Credenciais inválidas');
      toast.error('Credenciais inválidas');
    }
  };

  return (
    <div className="admin-root min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--admin-sidebar)' }}>
      <Toaster position="top-center" />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Casa do Capitão"
            width={280}
            height={186}
            className="mx-auto h-auto w-[min(320px,85vw)]"
            priority
          />
          <p className="text-[var(--admin-sidebar-text)] text-sm mt-4 tracking-widest uppercase">
            Painel de Administração
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="admin-card p-8 space-y-5 shadow-xl">
          <h1 className="font-display text-xl text-center text-[var(--admin-text)]">Entrar</h1>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="admin-input"
              placeholder="admin@casadocapitao.co.mz"
            />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="admin-input"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={isSubmitting} className="admin-btn-primary w-full py-3">
            {isSubmitting ? 'A entrar...' : 'Entrar'}
          </button>
          {!isSupabaseConfigured() && (
            <p className="text-xs text-center text-[var(--admin-text-muted)]">
              Modo local — configure Supabase em .env.local para auth completa
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
