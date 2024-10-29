import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ProductsPage } from '@/pages/products';
import { SuppliersPage } from '@/pages/suppliers';
import { CustomersPage } from '@/pages/customers';
import { useState } from 'react';
import { LucideIcon, Package, Users, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = {
  id: string;
  label: string;
  icon: LucideIcon;
  component: () => JSX.Element;
};

const tabs: Tab[] = [
  { id: 'products', label: 'Products', icon: Package, component: ProductsPage },
  { id: 'suppliers', label: 'Suppliers', icon: Truck, component: SuppliersPage },
  { id: 'customers', label: 'Customers', icon: Users, component: CustomersPage },
];

function App() {
  const [activeTab, setActiveTab] = useState('products');

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || ProductsPage;

  return (
    <ThemeProvider defaultTheme="light" storageKey="inventory-theme">
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex space-x-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <ActiveComponent />
        </main>

        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;