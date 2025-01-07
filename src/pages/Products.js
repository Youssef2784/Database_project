import React, { useState, useEffect } from "react";
import { Package, Tag, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import Layout from "../components/Layout";
import { supabase } from '../App';
import { StatCard } from '../components/ui/card';

// const initialProducts = [
//   {
//     id: 1,
//     name: "Product A",
//     sku: "SKU001",
//     stock: 150,
//     price: "$99.99",
//     status: "In Stock",
//   },
//   {
//     id: 2,
//     name: "Product B",
//     sku: "SKU002",
//     stock: 50,
//     price: "$149.99",
//     status: "Low Stock",
//   },
//   {
//     id: 3,
//     name: "Product C",
//     sku: "SKU003",
//     stock: 0,
//     price: "$199.99",
//     status: "Out of Stock",
//   },
// ];


const Products = () => {
  const [products, setProducts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });  
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    unitPrice: "",
    reorderquantity: "",
    reorderlevel: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('product')
        .select(`
          *,
          stocklevel (
            quantityinstock
          )
        `);

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        console.log('Fetched data:', data); 
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('product')
      .insert([
        { 
          productid: products.length + 1,
          productname: newProduct.name,
          category: newProduct.category,
          unitprice: parseFloat(newProduct.unitPrice),
          reorderquantity: parseInt(newProduct.reorderquantity, 10),
          reorderlevel: parseInt(newProduct.reorderlevel, 10)
        }
      ])
      .select();

    if (error) {
      console.error('Error adding product:', error);
    } else {
      setProducts([...products, data[0]]);
      setNewProduct({
        name: "",
        category: "", 
        unitPrice: "",
        reorderquantity: "",
        reorderlevel: "",
      });
      setSuccessMessage("Product added successfully!");
    }
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
          <h1 className="text-4xl font-bold tracking-tight dark:text-white">Products</h1>
          <p className="text-muted-foreground dark:text-white">
            Manage your product inventory and stock levels
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Products" value={products.length} change={5} icon={<Package />} />
          <StatCard title="Total Stock" value={products.reduce((acc, product) => acc + (product.stocklevel?.[0]?.quantityinstock || 0), 0)} change={10} icon={<Tag />} />
          <StatCard title="Active Orders" value={42} change={8} icon={<ShoppingCart />} />
        </div>

        <Card className="p-6 dark:text-white">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Product List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 dark:text-white">Product Name</th>
                  <th className="text-left py-3 px-4 dark:text-white">Category</th>
                  <th className="text-left py-3 px-4 dark:text-white">Unit Price</th>
                  <th className="text-left py-3 px-4 dark:text-white">Reorder Quantity</th>
                  <th className="text-left py-3 px-4 dark:text-white">Reorder Level</th>
                  <th className="text-left py-3 px-4 dark:text-white">Stock Level</th>
                </tr>
              </thead>
              <tbody>
                {products && products.map((product) => (
                  <tr key={product.productid} className="border-b last:border-0">
                    <td className="py-3 px-4 dark:text-white">{product.productname}</td>
                    <td className="py-3 px-4 dark:text-white">{product.category}</td>
                    <td className="py-3 px-4 dark:text-white">{product.unitprice}</td>
                    <td className="py-3 px-4 dark:text-white">{product.reorderquantity}</td>
                    <td className="py-3 px-4 dark:text-white">{product.reorderlevel}</td>
                    <td className="py-3 px-4 dark:text-white">
                      {product.stocklevel && product.stocklevel.length > 0 
                        ? product.stocklevel[0].quantityinstock 
                        : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Products; 