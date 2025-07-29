import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Gamepad2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const AdminLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm sm:text-base ${
      isActive
        ? 'bg-primary-500/20 text-primary-300'
        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
    }`;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="glass-card p-4 md:sticky md:top-24">
              {/* Header + Toggle di mobile */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">Admin Panel</h2>
                <button
                  className="md:hidden text-slate-300 hover:text-white"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label="Toggle Menu"
                >
                  ☰
                </button>
              </div>

              {/* Menu links */}
              <nav
                className={`space-y-2 md:block ${
                  menuOpen ? 'block' : 'hidden'
                }`}
              >
                <NavLink to="/admin" end className={navLinkClass}>
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin/users" className={navLinkClass}>
                  <Users className="h-5 w-5" />
                  <span>Users</span>
                </NavLink>
                <NavLink to="/admin/games" className={navLinkClass}>
                  <Gamepad2 className="h-5 w-5" />
                  <span>Games</span>
                </NavLink>

                <div className="pt-3 border-t border-slate-700 mt-3">
                  <NavLink
                    to="/"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Kembali ke Situs</span>
                  </NavLink>
                </div>
              </nav>
            </div>
          </aside>

          {/* Konten utama */}
          <main className="md:col-span-3">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
