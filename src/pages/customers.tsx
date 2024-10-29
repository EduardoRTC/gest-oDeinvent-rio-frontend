import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Plus, MoreVertical, Pencil, Ban, Search } from 'lucide-react';
import { toast } from 'sonner';
import type { Customer } from '@/types';

export function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customerData = {
      name: formData.get('name') as string,
      cpfCnpj: formData.get('cpfCnpj') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };

    try {
      if (selectedCustomer) {
        // Update existing customer
        toast.success('Customer updated successfully');
      } else {
        // Create new customer
        toast.success('Customer created successfully');
      }
      setIsDialogOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleToggleStatus = async (customerId: string, isActive: boolean) => {
    try {
      // Toggle customer status logic here
      toast.success(
        `Customer ${isActive ? 'deactivated' : 'activated'} successfully`
      );
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.cpfCnpj.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedCustomer ? 'Edit Customer' : 'Add Customer'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedCustomer?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                <Input
                  id="cpfCnpj"
                  name="cpfCnpj"
                  defaultValue={selectedCustomer?.cpfCnpj}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={selectedCustomer?.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={selectedCustomer?.phone}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={selectedCustomer?.address}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {selectedCustomer ? 'Update' : 'Create'} Customer
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name or CPF/CNPJ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{customer.name}</h3>
                    {!customer.isActive && (
                      <span className="px-2 py-1 text-xs font-medium bg-destructive/10 text-destructive rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    CPF/CNPJ: {customer.cpfCnpj}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {customer.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {customer.phone}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Address:</span>{' '}
                      {customer.address}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCustomer(customer);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {customer.hasTransactions ? (
                      <DropdownMenuItem
                        onClick={() =>
                          handleToggleStatus(customer.id, customer.isActive)
                        }
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        {customer.isActive ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          handleToggleStatus(customer.id, customer.isActive)
                        }
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No customers found.</p>
        </div>
      )}
    </div>
  );
}