import AdminShell from '@/components/admin/AdminShell';
import AdminHeader from '@/components/admin/AdminHeader';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      <AdminHeader />
      {children}
    </AdminShell>
  );
}
