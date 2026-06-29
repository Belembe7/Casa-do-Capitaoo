'use client';

import { Toaster } from 'react-hot-toast';

export default function AppToaster() {
  return (
    <Toaster
      position="top-center"
      containerClassName="!top-24"
      toastOptions={{
        className: '',
        duration: 5000,
      }}
    />
  );
}
