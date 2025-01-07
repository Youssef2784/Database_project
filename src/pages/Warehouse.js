import React, { useState, useEffect } from "react";
import { Warehouse, Truck, Box } from "lucide-react";
import { Card } from "../components/ui/card";
import Layout from "../components/Layout";
import { supabase } from "../App";

const Warehouses = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });
  const [warehouses, setWarehouses] = useState([]);
  const [stats, setStats] = useState({
    totalWarehouses: 0,
    totalCapacity: 0,
    activeShipments: 0,
  });

  useEffect(() => {
    const fetchWarehouses = async () => {
      const { data, error } = await supabase
        .from('warehouse')
        .select('warehouseid, warehousename, location, capacity');

      if (error) {
        console.error('Error fetching warehouses:', error);
      } else {
        setWarehouses(data);
        calculateStats(data);
      }
    };

    const calculateStats = (warehouses) => {
      const totalCapacity = warehouses.reduce((acc, warehouse) => acc + warehouse.capacity, 0);
      setStats({
        totalWarehouses: warehouses.length,
        totalCapacity,
        activeShipments: 42, // Example value, replace with actual logic if needed
      });
    };

    fetchWarehouses();
  }, []);


  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight dark:text-white">Warehouses</h1>
          <p className="text-muted-foreground dark:text-white">
            Monitor warehouse capacity and operations
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="stat-card dark:text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-white">
                  Total Warehouses
                </p>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stats.totalWarehouses}</p>
              </div>
              <div className="h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center">
                <Warehouse className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">
                +1
              </span>
              <span className="text-sm text-muted-foreground ml-1 dark:text-white">
                vs last month
              </span>
            </div>
          </Card>

          <Card className="stat-card dark:text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-white">
                  Total Capacity
                </p>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stats.totalCapacity}</p>
              </div>
              <div className="h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center">
                <Box className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">
                +15%
              </span>
              <span className="text-sm text-muted-foreground ml-1 dark:text-white">
                vs last month
              </span>
            </div>
          </Card>

          <Card className="stat-card dark:text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground dark:text-white">
                  Active Shipments
                </p>
                <p className="text-2xl font-bold mt-1 dark:text-white">{stats.activeShipments}</p>
              </div>
              <div className="h-12 w-12 bg-primary/5 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">
                +8%
              </span>
              <span className="text-sm text-muted-foreground ml-1 dark:text-white">
                vs last month
              </span>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.warehouseid} className="p-6 dark:text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold dark:text-white">{warehouse.warehousename}</h3>
                  <p className="text-sm text-muted-foreground dark:text-white">
                    {warehouse.location}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">
                  Operational
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="dark:text-white">Capacity</span>
                  <span className="font-medium dark:text-white">{warehouse.capacity} units</span>
                </div>
                {/* Add utilization logic if needed */}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Warehouses;