import { Card } from "../components/ui/card";
import { Package, Warehouse, ShoppingCart, Users } from "lucide-react";
import Layout from "../components/Layout";
import { supabase } from "../App";
import { useEffect, useState } from "react";


const Index = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        activeOrders: 0,
        totalWarehouses: 0,
        staffMembers: 0,
      });
    
      const [lowStockProducts, setLowStockProducts] = useState([]);
      const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('isDarkMode') === 'true';
      });
    
      useEffect(() => {
        const fetchStats = async () => {
          const { data: products, error: productsError } = await supabase
            .from('product')
            .select('productid');
          
          const { data: orders, error: ordersError } = await supabase
            .from('purchaseorder')
            .select('purchaseorderid');
          
          const { data: warehouses, error: warehousesError } = await supabase
            .from('warehouse')
            .select('warehouseid');
          
          const { data: staff, error: staffError } = await supabase
            .from('staff')
            .select('staffid');
    
          if (productsError || ordersError || warehousesError || staffError) {
            console.error('Error fetching stats:', productsError || ordersError || warehousesError || staffError);
          } else {
            setStats({
              totalProducts: products.length,
              activeOrders: orders.length,
              totalWarehouses: warehouses.length,
              staffMembers: staff.length,
            });
          }
    
          // Fetch low stock items
          const { data: lowStockItems, error: lowStockError } = await supabase
            .from('stocklevel')
            .select('productid, quantityinstock')
            .order('quantityinstock', { ascending: true })
            .limit(3);
    
          if (lowStockError) {
            console.error('Error fetching low stock items:', lowStockError);
          } else {
            const productIds = lowStockItems.map(item => item.productid);
            const { data: products, error: productError } = await supabase
              .from('product')
              .select('productid, productname')
              .in('productid', productIds);
    
            if (productError) {
              console.error('Error fetching product names:', productError);
            } else {
              const lowStockProducts = lowStockItems.map(item => ({
                ...item,
                productname: products.find(product => product.productid === item.productid)?.productname,
              }));
    
              setLowStockProducts(lowStockProducts);
            }
          }
        };
    
        fetchStats();
      }, []);

      useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
        localStorage.setItem('isDarkMode', isDarkMode);
      }, [isDarkMode]);

      const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
      };

      const getIcon = (key) => {
        switch (key) {
          case 'totalProducts':
            return <Package className="h-6 w-6 text-primary" />;
          case 'activeOrders':
            return <ShoppingCart className="h-6 w-6 text-primary" />;
          case 'totalWarehouses':
            return <Warehouse className="h-6 w-6 text-primary" />;
          case 'staffMembers':
            return <Users className="h-6 w-6 text-primary" />;
          default:
            return null;
        }
      };

  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your inventory management system
          </p>

        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(stats).map(([key, value]) => (
            <Card key={key} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {key}
                  </p>
                  <p className="text-2xl font-bold mt-1">{value}</p>
                </div>
                <div className="h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center">
                {getIcon(key)}
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-600">
                  {key === 'totalProducts' && '+18%'}
                  {key === 'activeOrders' && '+7%'}
                  {key === 'totalWarehouses' && '+1%'} 
                  {key === 'staffMembers' && '-2%'}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  vs last month
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">Order #{i}234</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                      Completed
                    </span>
                    <span className="font-medium">$1,234</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Least Stock Items</h2>
            <div className="space-y-4">
              {lowStockProducts.map((item) => (
                <div
                  key={item.productid}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.productname}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantityinstock} units remaining
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">
                      Low Stock
                    </span>
                    <button className="text-sm text-primary hover:underline">
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;