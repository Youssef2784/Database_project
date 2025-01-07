import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
// If you prefer using createClient in a separate file, you can do so:
import { supabase } from "../App";
import { Card  , Label , Input } from "../components/ui/card";
import { Button } from "@mui/material";

export default function Admin() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [partyEmail, setPartyEmail] = useState("");
  const [partyPhone, setPartyPhone] = useState("");
  const [partyAddress, setPartyAddress] = useState("");

  const [staffPartyId, setStaffPartyId] = useState("");
  const [staffPosition, setStaffPosition] = useState("");
  const [staffSalary, setStaffSalary] = useState("");
  const [staffHireDate, setStaffHireDate] = useState("");

  const [supplierPartyId, setSupplierPartyId] = useState("");
  const [supplierPaymentTerms, setSupplierPaymentTerms] = useState("");
  const [supplierBankAccount, setSupplierBankAccount] = useState("");

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productUnitPrice, setProductUnitPrice] = useState("");
  const [productReorderLevel, setProductReorderLevel] = useState("");
  const [productReorderQuantity, setProductReorderQuantity] = useState("");

  const [warehouseName, setWarehouseName] = useState("");
  const [warehouseLocation, setWarehouseLocation] = useState("");
  const [warehouseCapacity, setWarehouseCapacity] = useState("");

  const [poStaffId, setPoStaffId] = useState("");
  const [poSupplierId, setPoSupplierId] = useState("");
  const [poOrderDate, setPoOrderDate] = useState("");
  const [poTotalAmount, setPoTotalAmount] = useState("");
  const [poExpectedDelivery, setPoExpectedDelivery] = useState("");
  const [poStatus, setPoStatus] = useState("");

  const [polPurchaseOrderId, setPolPurchaseOrderId] = useState("");
  const [polProductId, setPolProductId] = useState("");
  const [polQuantityOrdered, setPolQuantityOrdered] = useState("");
  const [polUnitPrice, setPolUnitPrice] = useState("");

  const [stockProductId, setStockProductId] = useState("");
  const [stockWarehouseId, setStockWarehouseId] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockLastRestockDate, setStockLastRestockDate] = useState("");

  // --------------------------
  // State for foreign-key dropdowns
  // --------------------------
  const [parties, setParties] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [warehouses, setWarehouses] = useState([]);


  const correctPassword = "admin1"; // Set your password here

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    fetchParties();
    fetchStaff();
    fetchSuppliers();
    fetchPurchaseOrders();
    fetchProducts();
    fetchWarehouses();
  }, []);
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Please enter your password to continue
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter admin password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // --------------------------
  // State for form fields
  // --------------------------

  // --------------------------
  // Fetch relevant data for dropdowns
  // --------------------------


  async function fetchParties() {
    const { data, error } = await supabase.from("party").select("*");
    if (error) console.error(error);
    else setParties(data);
  }

  async function fetchStaff() {
    const { data, error } = await supabase.from("staff").select("*");
    if (error) console.error(error);
    else setStaffList(data);
  }

  async function fetchSuppliers() {
    const { data, error } = await supabase.from("supplier").select("*");
    if (error) console.error(error);
    else setSupplierList(data);
  }

  async function fetchPurchaseOrders() {
    const { data, error } = await supabase.from("purchaseorder").select("*");
    if (error) console.error(error);
    else setPurchaseOrders(data);
  }

  async function fetchProducts() {
    const { data, error } = await supabase.from("product").select("*");
    if (error) console.error(error);
    else setProducts(data);
  }

  async function fetchWarehouses() {
    const { data, error } = await supabase.from("warehouse").select("*");
    if (error) console.error(error);
    else setWarehouses(data);
  }

  async function fetchStockLevels() {
    const { data, error } = await supabase.from("stocklevel").select("*");
    if (error) {
      console.error("Error fetching stock levels:", error);
    } else {
      // Handle the fetched data as needed
      console.log("Fetched stock levels:", data);
      // You might want to set this data to a state if needed
      // setStockLevels(data);
    }
  }

  // --------------------------
  // 1) Add Party
  // --------------------------
  async function handleAddParty(e) {
    e.preventDefault();

    // Fetch the current max partyid to generate a new one
    const { data: maxPartyIdData, error: maxPartyIdError } = await supabase
      .from("party")
      .select("partyid")
      .order("partyid", { ascending: false })
      .limit(1);

    if (maxPartyIdError) {
      alert("Error fetching max party ID: " + maxPartyIdError.message);
      return;
    }

    const newPartyId = maxPartyIdData.length > 0 ? maxPartyIdData[0].partyid + 1 : 1;

    const { error } = await supabase.from("party").insert([
      {
        partyid: newPartyId,
        email: partyEmail,
        phonenumber: partyPhone,
        address: partyAddress,
      },
    ]);

    if (error) {
      alert("Error adding party: " + error.message);
    } else {
      alert("Party added successfully!");
      setPartyEmail("");
      setPartyPhone("");
      setPartyAddress("");
      fetchParties(); // refresh dropdown
    }
  }

  // --------------------------
  // 2) Add Staff
  // --------------------------
  async function handleAddStaff(e) {
    e.preventDefault();
    if (!staffPartyId) {
      alert("Please select a Party for the Staff record.");
      return;
    }

    const salary = Number(staffSalary);
    if (isNaN(salary) || salary <= 0 || salary > 1000000) {
      alert("Please enter a valid salary amount.");
      return;
    }

    const { error } = await supabase.from("staff").insert([
      {
        staffid: Number(staffPartyId),
        partyid: Number(staffPartyId),
        position: staffPosition,
        salary: salary,
        hiredate: staffHireDate || null,
        status: "Active",
      },
    ]);

    if (error) {
      alert("Error adding staff: " + error.message);
    } else {
      alert("Staff added successfully!");
      setStaffPartyId("");
      setStaffPosition("");
      setStaffSalary("");
      setStaffHireDate("");
      fetchStaff(); // refresh staff list
    }
  }

  // --------------------------
  // 3) Add Supplier
  // --------------------------
  async function handleAddSupplier(e) {
    e.preventDefault();
    if (!supplierPartyId) {
      alert("Please select a Party for the Supplier record.");
      return;
    }

    // Fetch the current max supplierid to generate a new one
    const { data: maxSupplierIdData, error: maxSupplierIdError } = await supabase
      .from("supplier")
      .select("supplierid")
      .order("supplierid", { ascending: false })
      .limit(1);

    if (maxSupplierIdError) {
      alert("Error fetching max supplier ID: " + maxSupplierIdError.message);
      return;
    }

    const newSupplierId = maxSupplierIdData.length > 0 ? maxSupplierIdData[0].supplierid + 1 : 1;

    const { error } = await supabase.from("supplier").insert([
      {
        supplierid: newSupplierId,
        partyid: Number(supplierPartyId),
        paymentterms: supplierPaymentTerms,
        bankaccountdetails: supplierBankAccount,
      },
    ]);

    if (error) {
      alert("Error adding supplier: " + error.message);
    } else {
      alert("Supplier added successfully!");
      setSupplierPartyId("");
      setSupplierPaymentTerms("");
      setSupplierBankAccount("");
      fetchSuppliers(); // refresh supplier list
    }
  }

  // --------------------------
  // 4) Add Product
  // --------------------------
  async function handleAddProduct(e) {
    e.preventDefault();

    // Fetch the current max productid to generate a new one
    const { data: maxProductIdData, error: maxProductIdError } = await supabase
      .from("product")
      .select("productid")
      .order("productid", { ascending: false })
      .limit(1);

    if (maxProductIdError) {
      alert("Error fetching max product ID: " + maxProductIdError.message);
      return;
    }

    const newProductId = maxProductIdData.length > 0 ? maxProductIdData[0].productid + 1 : 1;

    const { error } = await supabase.from("product").insert([
      {
        productid: newProductId,
        productname: productName,
        category: productCategory,
        unitprice: Number(productUnitPrice) || 0,
        reorderlevel: Number(productReorderLevel) || 0,
        reorderquantity: Number(productReorderQuantity) || 0,
      },
    ]);

    if (error) {
      alert("Error adding product: " + error.message);
    } else {
      alert("Product added successfully!");
      setProductName("");
      setProductCategory("");
      setProductUnitPrice("");
      setProductReorderLevel("");
      setProductReorderQuantity("");
      fetchProducts(); // refresh product list
    }
  }

  // --------------------------
  // 5) Add Warehouse
  // --------------------------
  async function handleAddWarehouse(e) {
    e.preventDefault();
    const { data: maxWarehouseIdData, error: maxWarehouseIdError } = await supabase
    .from("warehouse")
    .select("warehouseid")
    .order("warehouseid", { ascending: false })
    .limit(1);

  if (maxWarehouseIdError) {
    alert("Error fetching max warehouse ID: " + maxWarehouseIdError.message);
    return;
  }

  const newWarehouseId = maxWarehouseIdData.length > 0 ? maxWarehouseIdData[0].warehouseid + 1 : 1;

    const { error } = await supabase.from("warehouse").insert([
      {
        warehouseid: newWarehouseId,
        warehousename: warehouseName,
        location: warehouseLocation,
        capacity: Number(warehouseCapacity) || 0,
      },
    ]);

    if (error) {
      alert("Error adding warehouse: " + error.message);
    } else {
      alert("Warehouse added successfully!");
      setWarehouseName("");
      setWarehouseLocation("");
      setWarehouseCapacity("");
      fetchWarehouses(); // refresh
    }
  }

  // --------------------------
  // 6) Add Purchase Order
  // --------------------------
  async function handleAddPurchaseOrder(e) {
    e.preventDefault();
    const { data: maxPurchaseOrderIdData, error: maxPurchaseOrderIdError } = await supabase
    .from("purchaseorder")
    .select("purchaseorderid")
    .order("purchaseorderid", { ascending: false })
    .limit(1);

  if (maxPurchaseOrderIdError) {
    alert("Error fetching max purchase order ID: " + maxPurchaseOrderIdError.message);
    return;
  }

  const newPurchaseOrderId = maxPurchaseOrderIdData.length > 0 ? maxPurchaseOrderIdData[0].purchaseorderid + 1 : 1;

    if (!poStaffId || !poSupplierId) {
      alert("Please select both Staff and Supplier for the Purchase Order.");
      return;
    }

    const { error } = await supabase.from("purchaseorder").insert([
        {
            purchaseorderid: newPurchaseOrderId, // Use new purchaseorderid
            staffid: Number(poStaffId),
            supplierid: Number(poSupplierId),
            orderdate: poOrderDate || null,
            totalamount: Number(poTotalAmount) || 0,
            expecteddeliverydate: poExpectedDelivery || null,
            status: poStatus,
          },
    ]);

    if (error) {
      alert("Error adding purchase order: " + error.message);
    } else {
      alert("Purchase Order added successfully!");
      setPoStaffId("");
      setPoSupplierId("");
      setPoOrderDate("");
      setPoTotalAmount("");
      setPoExpectedDelivery("");
      setPoStatus("");
      fetchPurchaseOrders(); // refresh
    }
  }

  // --------------------------
  // 7) Add Purchase Order Line
  // --------------------------
  async function handleAddPurchaseOrderLine(e) {
    e.preventDefault();
    const { data: maxPurchaseOrderLineIdData, error: maxPurchaseOrderLineIdError } = await supabase
    .from("purchaseorderline")
    .select("purchaseorderlineid")
    .order("purchaseorderlineid", { ascending: false })
    .limit(1);

  if (maxPurchaseOrderLineIdError) {
    alert("Error fetching max purchase order line ID: " + maxPurchaseOrderLineIdError.message);
    return;
  }

  const newPurchaseOrderLineId = maxPurchaseOrderLineIdData.length > 0 ? maxPurchaseOrderLineIdData[0].purchaseorderlineid + 1 : 1;

    if (!polPurchaseOrderId || !polProductId) {
      alert("Please select a Purchase Order and a Product.");
      return;
    }

    const { error } = await supabase.from("purchaseorderline").insert([
        {
            purchaseorderlineid: newPurchaseOrderLineId, // Use new purchaseorderlineid
            purchaseorderid: Number(polPurchaseOrderId),
            productid: Number(polProductId),
            quantityordered: Number(polQuantityOrdered) || 0,
            unitprice: Number(polUnitPrice) || 0,
          },
    ]);

    if (error) {
      alert("Error adding purchase order line: " + error.message);
    } else {
      alert("Purchase Order Line added successfully!");
      setPolPurchaseOrderId("");
      setPolProductId("");
      setPolQuantityOrdered("");
      setPolUnitPrice("");
      fetchPurchaseOrders(); 
    }
  }

  // --------------------------
  // 8) Add Stock Level
  // --------------------------
  async function handleAddStockLevel(e) {
    e.preventDefault();

    // Fetch the current max stocklevelid to generate a new one
    const { data: maxStockLevelIdData, error: maxStockLevelIdError } = await supabase
      .from("stocklevel")
      .select("stocklevelid")
      .order("stocklevelid", { ascending: false })
      .limit(1);

    if (maxStockLevelIdError) {
      alert("Error fetching max stock level ID: " + maxStockLevelIdError.message);
      return;
    }

    const newStockLevelId = maxStockLevelIdData.length > 0 ? maxStockLevelIdData[0].stocklevelid + 1 : 1;

    const { error } = await supabase.from("stocklevel").insert([
      {
        stocklevelid: newStockLevelId, // Use new stocklevelid
        productid: Number(stockProductId),
        warehouseid: Number(stockWarehouseId),
        quantityinstock: Number(stockQuantity) || 0,
        lastrestockdate: stockLastRestockDate || null,
      },
    ]);

    if (error) {
      alert("Error adding stock level: " + error.message);
    } else {
      alert("Stock level added successfully!");
      setStockProductId("");
      setStockWarehouseId("");
      setStockQuantity("");
      setStockLastRestockDate("");
      fetchStockLevels();
    }
  }



  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <div className="space-y-8 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold tracking-tight dark:text-white">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1) PARTY FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Party</h2>
            <form onSubmit={handleAddParty} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="dark:text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={partyEmail}
                  onChange={(e) => setPartyEmail(e.target.value)}
                  required
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="dark:text-white">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={partyPhone}
                  onChange={(e) => setPartyPhone(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="dark:text-white">Address</Label>
                <Input
                  id="address"
                  value={partyAddress}
                  onChange={(e) => setPartyAddress(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Party</Button>
            </form>
          </Card>

          {/* 2) STAFF FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Staff</h2>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="staffParty" className="dark:text-white">Party</Label>
                <select
                  id="staffParty"
                  value={staffPartyId}
                  onChange={(e) => setStaffPartyId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Party --</option>
                  {parties.map((p) => (
                    <option key={p.partyid} value={p.partyid}>
                      {p.partyid} - {p.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="dark:text-white">Position</Label>
                <Input
                  id="position"
                  value={staffPosition}
                  onChange={(e) => setStaffPosition(e.target.value)}
                  required
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary" className="dark:text-white">Salary</Label>
                <Input
                  id="salary"
                  type="number"
                  step="0.01"
                  value={staffSalary}
                  onChange={(e) => setStaffSalary(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate" className="dark:text-white">Hire Date</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={staffHireDate}
                  onChange={(e) => setStaffHireDate(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Staff</Button>
            </form>
          </Card>

          {/* 3) SUPPLIER FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Supplier</h2>
            <form onSubmit={handleAddSupplier} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supplierParty" className="dark:text-white">Party</Label>
                <select
                  id="supplierParty"
                  value={supplierPartyId}
                  onChange={(e) => setSupplierPartyId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Party --</option>
                  {parties.map((p) => (
                    <option key={p.partyid} value={p.partyid}>
                      {p.partyid} - {p.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms" className="dark:text-white">Payment Terms</Label>
                <Input
                  id="paymentTerms"
                  value={supplierPaymentTerms}
                  onChange={(e) => setSupplierPaymentTerms(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="dark:text-white">Bank Account Details</Label>
                <Input
                  id="bankAccount"
                  value={supplierBankAccount}
                  onChange={(e) => setSupplierBankAccount(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Supplier</Button>
            </form>
          </Card>

          {/* 4) PRODUCT FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="productName" className="dark:text-white">Product Name</Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="dark:text-white">Category</Label>
                <Input
                  id="category"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice" className="dark:text-white">Unit Price</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={productUnitPrice}
                  onChange={(e) => setProductUnitPrice(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderLevel" className="dark:text-white">Reorder Level</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  value={productReorderLevel}
                  onChange={(e) => setProductReorderLevel(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderQuantity" className="dark:text-white">Reorder Quantity</Label>
                <Input
                  id="reorderQuantity"
                  type="number"
                  value={productReorderQuantity}
                  onChange={(e) => setProductReorderQuantity(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Product</Button>
            </form>
          </Card>

          {/* 5) WAREHOUSE FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Warehouse</h2>
            <form onSubmit={handleAddWarehouse} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="warehouseName" className="dark:text-white">Warehouse Name</Label>
                <Input
                  id="warehouseName"
                  value={warehouseName}
                  onChange={(e) => setWarehouseName(e.target.value)}
                  required
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="dark:text-white">Location</Label>
                <Input
                  id="location"
                  value={warehouseLocation}
                  onChange={(e) => setWarehouseLocation(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity" className="dark:text-white">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={warehouseCapacity}
                  onChange={(e) => setWarehouseCapacity(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Warehouse</Button>
            </form>
          </Card>

          {/* 6) PURCHASE ORDER FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Purchase Order</h2>
            <form onSubmit={handleAddPurchaseOrder} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="poStaff" className="dark:text-white">Staff</Label>
                <select
                  id="poStaff"
                  value={poStaffId}
                  onChange={(e) => setPoStaffId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Staff --</option>
                  {staffList.map((s) => (
                    <option key={s.staffid} value={s.staffid}>
                      {s.staffid} - {s.position}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="poSupplier" className="dark:text-white">Supplier</Label>
                <select
                  id="poSupplier"
                  value={poSupplierId}
                  onChange={(e) => setPoSupplierId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Supplier --</option>
                  {supplierList.map((sup) => (
                    <option key={sup.supplierid} value={sup.supplierid}>
                      {sup.supplierid} - {sup.paymentterms}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderDate" className="dark:text-white">Order Date</Label>
                <Input
                  id="orderDate"
                  type="date"
                  value={poOrderDate}
                  onChange={(e) => setPoOrderDate(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalAmount" className="dark:text-white">Total Amount</Label>
                <Input
                  id="totalAmount"
                  type="number"
                  step="0.01"
                  value={poTotalAmount}
                  onChange={(e) => setPoTotalAmount(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedDelivery" className="dark:text-white">Expected Delivery Date</Label>
                <Input
                  id="expectedDelivery"
                  type="date"
                  value={poExpectedDelivery}
                  onChange={(e) => setPoExpectedDelivery(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="dark:text-white">Status</Label>
                <Input
                  id="status"
                  value={poStatus}
                  onChange={(e) => setPoStatus(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Purchase Order</Button>
            </form>
          </Card>

          {/* 7) PURCHASE ORDER LINE FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Purchase Order Line</h2>
            <form onSubmit={handleAddPurchaseOrderLine} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseOrder" className="dark:text-white">Purchase Order</Label>
                <select
                  id="purchaseOrder"
                  value={polPurchaseOrderId}
                  onChange={(e) => setPolPurchaseOrderId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Purchase Order --</option>
                  {purchaseOrders.map((po) => (
                    <option key={po.purchaseorderid} value={po.purchaseorderid}>
                      {po.purchaseorderid} (Staff {po.staffid}, Supplier {po.supplierid})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="polProduct" className="dark:text-white">Product</Label>
                <select
                  id="polProduct"
                  value={polProductId}
                  onChange={(e) => setPolProductId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Product --</option>
                  {products.map((p) => (
                    <option key={p.productid} value={p.productid}>
                      {p.productid} - {p.productname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantityOrdered" className="dark:text-white">Quantity Ordered</Label>
                <Input
                  id="quantityOrdered"
                  type="number"
                  value={polQuantityOrdered}
                  onChange={(e) => setPolQuantityOrdered(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="polUnitPrice" className="dark:text-white">Unit Price</Label>
                <Input
                  id="polUnitPrice"
                  type="number"
                  step="0.01"
                  value={polUnitPrice}
                  onChange={(e) => setPolUnitPrice(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Purchase Order Line</Button>
            </form>
          </Card>

          {/* 8) STOCK LEVEL FORM */}
          <Card className="p-6 dark:text-white">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add Stock Level</h2>
            <form onSubmit={handleAddStockLevel} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stockProduct" className="dark:text-white">Product</Label>
                <select
                  id="stockProduct"
                  value={stockProductId}
                  onChange={(e) => setStockProductId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Product --</option>
                  {products.map((p) => (
                    <option key={p.productid} value={p.productid}>
                      {p.productid} - {p.productname}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="stockWarehouse" className="dark:text-white">Warehouse</Label>
                <select
                  id="stockWarehouse"
                  value={stockWarehouseId}
                  onChange={(e) => setStockWarehouseId(e.target.value)}
                  required
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 dark:text-white"
                >
                  <option value="">-- Select Warehouse --</option>
                  {warehouses.map((w) => (
                    <option key={w.warehouseid} value={w.warehouseid}>
                      {w.warehouseid} - {w.warehousename}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity" className="dark:text-white">Quantity In Stock</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastRestockDate" className="dark:text-white">Last Restock Date</Label>
                <Input
                  id="lastRestockDate"
                  type="date"
                  value={stockLastRestockDate}
                  onChange={(e) => setStockLastRestockDate(e.target.value)}
                  className="dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full dark:text-white">Add Stock Level</Button>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );

}

