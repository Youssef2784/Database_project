import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@mui/material";
import { TableHeader } from "../components/ui/TableHeader";
import { supabase } from '../App';
import {StatCard} from '../components/ui/card';
import { Users, DollarSign, Briefcase } from "lucide-react";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    paymentterms: "",
    bankaccountdetails: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from('supplier')
        .select(`
          supplierid,
          paymentterms,
          bankaccountdetails,
          party:partyid (
            email,
            phonenumber,
            address
          ),
          purchaseorders:purchaseorder (
            purchaseorderlines:purchaseorderline (
              product:productid (
                productname,
                category,
                unitprice
              )
            )
          )
        `);

      console.log(data);
      if (error) {
        console.error('Error fetching suppliers:', error);
      } else {
        setSuppliers(data);
      }
    };

    fetchSuppliers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };

  const addSupplier = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('supplier')
      .insert([
        {
          paymentterms: newSupplier.paymentterms,
          bankaccountdetails: newSupplier.bankaccountdetails,
          party: {
            email: newSupplier.email,
            phonenumber: newSupplier.phonenumber,
            address: newSupplier.address,
          }
        }
      ])
      .select();

    if (error) {
      console.error('Error adding supplier:', error);
    } else {
      setSuppliers([...suppliers, data[0]]);
      setNewSupplier({
        name: "",
        email: "",
        phonenumber: "",
        address: "",
        paymentterms: "",
        bankaccountdetails: "",
      });
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
          <h1 className="text-4xl font-bold tracking-tight dark:text-white">Suppliers</h1>
          <p className="text-muted-foreground dark:text-white">Manage your supplier relationships</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Total Suppliers" value={suppliers.length} change={3} icon={<Users />} />
          <StatCard title="Unique Payment Terms" value={new Set(suppliers.map(s => s.paymentterms)).size} change={2} icon={<DollarSign />} />
          <StatCard title="Total Bank Accounts" value={suppliers.filter(s => s.bankaccountdetails).length} change={1} icon={<Briefcase />} />
        </div>

        <Card className="p-6 dark:text-white">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Supplier Directory</h2>
          <Table>
            <TableHeader headers={['Supplier ID', 'Email', 'Phone Number', 'Address', 'Payment Terms', 'Bank Account Details', 'Product Name', 'Product Category']} />
            <TableBody>
              {suppliers && suppliers.length > 0 ? (
                suppliers.map((supplier) => {
                  const firstOrder = supplier.purchaseorders?.[0];
                  const firstLine = firstOrder?.purchaseorderlines?.[0];
                  const firstProduct = firstLine?.product;

                  return (
                    <TableRow key={supplier.supplierid}>
                      <TableCell className="font-medium dark:text-white">{supplier.supplierid}</TableCell>
                      <TableCell className="dark:text-white">{supplier.party?.email || 'N/A'}</TableCell>
                      <TableCell className="dark:text-white">{supplier.party?.phonenumber || 'N/A'}</TableCell>
                      <TableCell className="dark:text-white">{supplier.party?.address || 'N/A'}</TableCell>
                      <TableCell className="dark:text-white">{supplier.paymentterms || 'N/A'}</TableCell>
                      <TableCell className="dark:text-white">{supplier.bankaccountdetails || 'N/A'}</TableCell>
                      <TableCell className="dark:text-white">{firstProduct?.productname || 'No product'}</TableCell>
                      <TableCell className="dark:text-white">{firstProduct?.category || 'No category'}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center dark:text-white">
                    No suppliers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Layout>
  );
};

export default Suppliers;