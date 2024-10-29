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
import { Plus, MoreVertical, Pencil, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';
import type { Supplier } from '@/types';

export function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const supplierData = {
      name: formData.get('name') as string,
      cnpj: formData.get('cnpj') as string,
      contact: formData.get('contact') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };

    try {
      if (selectedSupplier) {
        // Update existing supplier
        toast.success('Supplier updated successfully');
      } else {
        // Create new supplier
        toast.success('Supplier created successfully');
      }
      setIsDialogOpen(false);
      setSelectedSupplier(null);
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (supplierId: string) => {
    try {
      // Delete supplier logic here
      toast.success('Supplier deleted successfully');
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase()) ||
    supplier.cnpj.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suppliers</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Supplier
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedSupplier ? 'Edit Supplier' : 'Add Supplier'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={selectedSupplier?.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  name="cnpj"
                  defaultValue={selectedSupplier?.cnpj}
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
                    defaultValue={selectedSupplier?.email}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    defaultValue={selectedSupplier?.phone}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={selectedSupplier?.address}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {selectedSupplier ? 'Update' : 'Create'} Supplier
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
            placeholder="Search by name or CNPJ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSuppliers.map((supplier) => (
          <Card key={supplier.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    CNPJ: {supplier.cnpj}
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {supplier.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Phone:</span> {supplier.phone}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Address:</span>{' '}
                      {supplier.address}
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
                        setSelectedSupplier(supplier);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(supplier.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No suppliers found.</p>
        </div>
      )}
    </div>
  );
}