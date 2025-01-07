import React from 'react';

const Worddoc = ({ isDarkMode }) => {
    return (
        <div className={`p-8 rounded-lg shadow-lg max-w-2xl mx-auto ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h3 className="text-2xl font-bold mb-6 text-center">INVENTORY MANAGEMENT SYSTEM</h3>
            <p className="mb-6 leading-relaxed">
                <strong>Problem Definition:</strong> The Inventory Management System is designed to manage product data, suppliers, stock levels, and restocking activities efficiently. It aims to replace manual inventory tracking with a centralized database to improve data accuracy and retrieval.
            </p>
            <p className="mb-6 leading-relaxed">
                <strong>Project Overview:</strong> The Inventory Management System (IMS) aims to address the challenges of managing inventory efficiently in a real-world business environment. This system is designed to streamline the tracking of products, suppliers, warehouses, and staff, ensuring seamless stock management, order processing, and supplier coordination. The database system will support efficient storage, retrieval, and manipulation of data, catering to the needs of both operational and managerial processes.
            </p>
            <p className="mb-6 leading-relaxed">
                <strong>Project Objectives:</strong>
                <ul className="list-disc pl-5 mt-2">
                    <li>Data Organization: Define a clear structure for storing and managing data related to products, warehouses, suppliers, purchase orders, and staff.</li>
                    <li>Functional Efficiency: Facilitate quick and accurate tracking of stock levels, purchase orders, and restocking schedules.</li>
                    <li>User Interaction: Provide a user-friendly interface for accessing and updating the database.</li>
                    <li>Normalization: Ensure data integrity and eliminate redundancy through normalization to at least the Third Normal Form (3NF).</li>
                    <li>Scalability: Build a scalable system that can handle growing data requirements in inventory management.</li>
                </ul>
            </p>
            <h4 className="text-xl font-semibold mb-4">Features and Functionality</h4>
            <ul className="list-disc pl-5">
                <li>Product Management: Track product details such as category, unit price, stock levels, reorder quantity, and last restock date.</li>
                <li>Supplier Integration: Maintain supplier information, including payment terms and bank account details, to streamline procurement processes.</li>
                <li>Warehouse Management: Monitor inventory across multiple warehouse locations, including capacity and stock details.</li>
                <li>Order Processing: Manage purchase orders, including order dates, expected delivery dates, and total amounts.</li>
                <li>Staff Roles: Define roles for staff members involved in managing inventory and placing orders.</li>
                <li>Stock Replenishment: Automate alerts for stock replenishment based on predefined reorder levels.</li>
            </ul>
            <h5 className="text-xl font-semibold mb-4 pt-8 text-center">Entity-Relationship Diagram</h5>
            <img
                src="/EERD.png"
                alt="EERD diagram"
                className="object-contain w-full h-full"
            />
            <h6 className="text-xl font-semibold mb-4 pt-8 text-center"> Relational Schema</h6>
            <img
                src="/RelationalSchema.png"
                alt="Relational Schema"
                className="object-contain w-full h-full"
            />
            <h7 className="text-xl font-semibold mb-4 pt-8 text-center"> SQL TABLE CREATION</h7>
            <pre className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-x-auto`}>
                <code>
                    {`CREATE TABLE Party (
    PartyID SERIAL PRIMARY KEY,
    Email VARCHAR(100) UNIQUE NOT NULL,
    PhoneNumber VARCHAR(20),
    Address TEXT
);

CREATE TABLE Staff (
    StaffID SERIAL PRIMARY KEY,
    PartyID INTEGER REFERENCES Party(PartyID),
    Role VARCHAR(50),
    DateHired DATE,
    Salary DECIMAL(10,2)
);

CREATE TABLE Supplier (
    SupplierID SERIAL PRIMARY KEY,
    PartyID INTEGER REFERENCES Party(PartyID),
    PaymentTerms VARCHAR(100),
    BankAccount VARCHAR(50)
);

CREATE TABLE Product (
    ProductID SERIAL PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    UnitPrice DECIMAL(10,2),
    ReorderQuantity INTEGER,
    Description TEXT
);

CREATE TABLE Warehouse (
    WarehouseID SERIAL PRIMARY KEY,
    Location VARCHAR(100),
    Capacity INTEGER,
    ContactInfo TEXT
);

CREATE TABLE PurchaseOrder (
    PurchaseOrderID SERIAL PRIMARY KEY,
    StaffID INTEGER REFERENCES Staff(StaffID),
    SupplierID INTEGER REFERENCES Supplier(SupplierID),
    OrderDate DATE,
    TotalAmount DECIMAL(10,2),
    ExpectedDeliveryDate DATE,
    Status VARCHAR(50)
);

CREATE TABLE PurchaseOrderLine (
    PurchaseOrderLineID SERIAL PRIMARY KEY,
    PurchaseOrderID INTEGER REFERENCES PurchaseOrder(PurchaseOrderID),
    ProductID INTEGER REFERENCES Product(ProductID),
    Quantity INTEGER,
    UnitPrice DECIMAL(10,2)
);

CREATE TABLE StockLevel (
    StockLevelID SERIAL PRIMARY KEY,
    ProductID INTEGER REFERENCES Product(ProductID),
    WarehouseID INTEGER REFERENCES Warehouse(WarehouseID),
    QuantityInStock INTEGER,
    LastRestockDate DATE
);`}
                </code>
            </pre>
        </div>
    );
};

export default Worddoc;