import { ReactNode, useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { Sidebar } from '@app/components/ui/Sidebar';
import { Topbar } from '@app/components/ui/Topbar';
import { Drawer } from '@app/components/ui/Drawer';
import { Button } from '@app/components/ui/Button';
import { useAuth } from '@core/auth/useAuth';
import { moduleRegistry } from '@app/utils/moduleRegistry';
import { RouteMeta, RouteObjectWithMeta } from '@app/contracts/types.contract';
import * as LucideIcons from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

interface MenuItemData {
  path: string;
  meta: RouteMeta;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const menuItems = useMemo(() => {
    const items: MenuItemData[] = [];
    const allRoutes = moduleRegistry.getAllRoutes();

    const extractMenuItems = (routes: RouteObjectWithMeta[], basePath = ''): void => {
      routes.forEach((route) => {
        const fullPath = basePath + (route.path || '');
        const meta = route.meta;

        if (meta && meta.showInMenu && meta.requiresAuth) {
          items.push({ path: fullPath, meta });
        }

        if (route.children) {
          extractMenuItems(route.children, fullPath);
        }
      });
    };

    extractMenuItems(allRoutes);

    return items.sort((a, b) => a.meta.order - b.meta.order);
  }, []);

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const renderMenuItems = (onItemClick?: () => void) => (
    <nav className="flex-1 p-4 space-y-1">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors min-h-[44px] ${
              isActive
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {renderIcon(item.meta.icon)}
            <span>{item.meta.title}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar>
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-900">Melrose</h1>
          {user && (
            <p className="text-sm text-gray-600 mt-1 truncate">{user.email}</p>
          )}
        </div>

        {renderMenuItems()}

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            fullWidth
            onClick={logout}
            className="justify-start"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </Sidebar>

      <Topbar>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Melrose</h1>
        <button
          onClick={logout}
          className="ml-auto p-2 hover:bg-gray-100 rounded-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </Topbar>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Menu"
      >
        {renderMenuItems(() => setIsDrawerOpen(false))}
        <div className="p-4 border-t">
          {user && (
            <p className="text-sm text-gray-600 mb-4 truncate">{user.email}</p>
          )}
          <Button
            variant="ghost"
            fullWidth
            onClick={() => {
              setIsDrawerOpen(false);
              logout();
            }}
            className="justify-start"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </Drawer>

      <main className="md:ml-64 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
};
