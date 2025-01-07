import React, { useState , useEffect} from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { TableHeader } from "../components/ui/TableHeader";

const initialOrders = [
  { id: "ORD001", customer: "Alice", status: "Completed", items: 3, total: "$150", date: "2023-01-15" },
  { id: "ORD002", customer: "Bob", status: "Pending", items: 2, total: "$100", date: "2023-02-20" },
];

const Orders = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });
  const [orders, setOrders] = useState(initialOrders);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    status: "Pending",
    items: "",
    total: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const addOrder = (e) => {
    e.preventDefault();
    setOrders([
      ...orders,
      { ...newOrder, id: `ORD${orders.length + 1}` },
    ]);
    setNewOrder({
      customer: "",
      status: "Pending",
      items: "",
      total: "",
      date: "",
    });
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

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
          <h1 className="text-4xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage your orders</p>
        </header>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Order</h2>
          <form onSubmit={addOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="customer"
                value={newOrder.customer}
                onChange={handleInputChange}
                placeholder="Customer Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="items"
                value={newOrder.items}
                onChange={handleInputChange}
                placeholder="Items"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="total"
                value={newOrder.total}
                onChange={handleInputChange}
                placeholder="Total"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="date"
                value={newOrder.date}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <select
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="bg-primary text-white p-2 rounded">
              Add Order
            </button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order List</h2>
          <Table>
            <TableHeader headers={['Order ID', 'Customer', 'Status', 'Items', 'Total', 'Date', 'Actions']} />
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <button onClick={() => deleteOrder(order.id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default Orders;