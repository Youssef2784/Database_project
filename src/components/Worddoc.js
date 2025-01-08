import React from 'react';

const Worddoc = ({ isDarkMode }) => {
    return (
        <div className={`p-8 rounded-lg shadow-lg max-w-2xl mx-auto ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <h3 className="text-2xl font-bold mb-6 text-center py-4">INVENTORY MANAGEMENT SYSTEM</h3>
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
            <h4 className="text-xl font-semibold mb-4 text-center py-4">Features and Functionality</h4>
            <ul className="list-disc pl-5">
                <li>Product Management: Track product details such as category, unit price, stock levels, reorder quantity, and last restock date.</li>
                <li>Supplier Integration: Maintain supplier information, including payment terms and bank account details, to streamline procurement processes.</li>
                <li>Warehouse Management: Monitor inventory across multiple warehouse locations, including capacity and stock details.</li>
                <li>Order Processing: Manage purchase orders, including order dates, expected delivery dates, and total amounts.</li>
                <li>Staff Roles: Define roles for staff members involved in managing inventory and placing orders.</li>
                <li>Stock Replenishment: Automate alerts for stock replenishment based on predefined reorder levels.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 text-center py-4">System Goals</h4>
            <ul className="list-disc pl-5">
                <li>Enhance accuracy and integrity of inventory data.</li>
                <li>Optimize operations through automated alerts.</li>
                <li>Simplify supplier and warehouse management tasks.</li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 text-center py-4">User Requirements</h4>
            <ul className="list-disc pl-5">
                <li>Add, view, update, and delete products.</li>
                <li>Manage supplier information.</li>
                <li>Track stock levels across warehouses.</li>
                <li>Generate and manage purchase orders.</li>
            </ul>

            <h5 className="text-xl font-semibold mb-4 text-center py-4">Entity-Relationship Diagram</h5>
            <img
                src="/EERD.png"
                alt="EERD diagram"
                className="object-contain w-full h-full"
            />
            <h6 className="text-xl font-semibold mb-4 text-center py-4">Relational Schema</h6>
            <img
                src="/RelationalSchema.png"
                alt="Relational Schema"
                className="object-contain w-full h-full"
            />
            <h7 className="text-xl font-semibold mb-8 text-center py-4 block">Normalization</h7> 

            <ul className="list-disc pl-5">
                <li>1NF: Each table has a primary key, and all attributes are atomic.</li>
                <li>2NF: All non-key attributes are dependent on the primary key.</li>
                <li>3NF: All non-key attributes are dependent on the primary key, and there are no transitive dependencies.</li>
                <li>BCNF: All non-key attributes are dependent on the primary key, and there are no partial dependencies.</li>
            </ul>

            <h8 className="text-xl font-semibold mb-8 text-center py-4 block">SQL TABLE CREATION</h8>
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
            <h8 className="text-xl font-semibold mb-8 text-center py-4 block">Database Visualizer</h8>
            <img
                src="/DatabaseVisualizer.png"
                alt="Database Visualizer"
                className="object-contain w-full h-full"
            />

            <h4 className="text-xl font-semibold mb-4 text-center py-4">Table Descriptions</h4>
            <ul className="list-disc pl-5">
                <li><strong>Party Table</strong>: Stores general contact information for entities such as staff or suppliers.
                    <ul className="list-disc pl-5">
                        <li>PartyID: Unique identifier for each party.</li>
                        <li>Email: Unique email address of the party (e.g., staff or supplier).</li>
                        <li>PhoneNumber: Contact number.</li>
                        <li>Address: Physical address of the party.</li>
                    </ul>
                </li>
                <li><strong>Staff Table</strong>: Represents employees and links them to their contact information stored in the Party table.
                    <ul className="list-disc pl-5">
                        <li>StaffID: Unique identifier for each staff member.</li>
                        <li>PartyID: References the Party table to retrieve contact details.</li>
                        <li>Role: Job role or position of the staff member.</li>
                        <li>DateHired: Hiring date of the staff member.</li>
                        <li>Salary: Monthly or annual salary.</li>
                    </ul>
                </li>
                <li><strong>Supplier Table</strong>: Manages supplier-specific information while linking to their contact details stored in the Party table.
                    <ul className="list-disc pl-5">
                        <li>SupplierID: Unique identifier for each supplier.</li>
                        <li>PartyID: References the Party table to retrieve contact details.</li>
                        <li>PaymentTerms: Terms of payment agreed with the supplier.</li>
                        <li>BankAccount: Supplier's bank account details.</li>
                    </ul>
                </li>
                <li><strong>Product Table</strong>: Stores details about the products managed in the inventory.
                    <ul className="list-disc pl-5">
                        <li>ProductID: Unique identifier for each product.</li>
                        <li>ProductName: Name of the product.</li>
                        <li>Category: Category or type of the product (e.g., electronics, groceries).</li>
                        <li>UnitPrice: Price per unit of the product.</li>
                        <li>ReorderQuantity: Minimum quantity to reorder.</li>
                        <li>Description: Additional product details.</li>
                    </ul>
                </li>
                <li><strong>Warehouse Table</strong>: Tracks storage locations and their capacities.
                    <ul className="list-disc pl-5">
                        <li>WarehouseID: Unique identifier for each warehouse.</li>
                        <li>Location: Geographical location of the warehouse.</li>
                        <li>Capacity: Maximum storage capacity.</li>
                        <li>ContactInfo: Contact details for the warehouse.</li>
                    </ul>
                </li>
                <li><strong>PurchaseOrder Table</strong>: Manages orders placed with suppliers.
                    <ul className="list-disc pl-5">
                        <li>PurchaseOrderID: Unique identifier for each purchase order.</li>
                        <li>StaffID: References the Staff table to identify the staff member placing the order.</li>
                        <li>SupplierID: References the Supplier table to identify the supplier.</li>
                        <li>OrderDate: Date when the order was placed.</li>
                        <li>TotalAmount: Total monetary value of the order.</li>
                        <li>ExpectedDeliveryDate: Expected date of delivery.</li>
                        <li>Status: Current status of the order (e.g., pending, completed).</li>
                    </ul>
                </li>
                <li><strong>PurchaseOrderLine Table</strong>: Links specific products to purchase orders and tracks the details of each order line.
                    <ul className="list-disc pl-5">
                        <li>PurchaseOrderLineID: Unique identifier for each order line.</li>
                        <li>PurchaseOrderID: References the PurchaseOrder table to associate with a specific order.</li>
                        <li>ProductID: References the Product table to associate with a specific product.</li>
                        <li>Quantity: Quantity of the product ordered.</li>
                        <li>UnitPrice: Price per unit for the product in the specific order.</li>
                    </ul>
                </li>
                <li><strong>StockLevel Table</strong>: Tracks the inventory levels of products in warehouses.
                    <ul className="list-disc pl-5">
                        <li>StockLevelID: Unique identifier for each stock record.</li>
                        <li>ProductID: References the Product table to identify the product.</li>
                        <li>WarehouseID: References the Warehouse table to specify where the product is stored.</li>
                        <li>QuantityInStock: Current quantity of the product in stock.</li>
                        <li>LastRestockDate: Date when the stock was last replenished.</li>
                    </ul>
                </li>
            </ul>

            <h4 className="text-xl font-semibold mb-4 text-center py-4">DML Queries</h4>
            <pre className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} overflow-x-auto`}>
                <code>
                    {`-- Member 1
1) SELECT * 
FROM Party;

2) SELECT First_Name, Last_Name, Phone_Number 
FROM Party
WHERE Email LIKE '%@gmail.com';

3) INSERT INTO Party (Party_ID, First_Name, Last_Name, Phone_Number, Email, Address)
VALUES (101, 'Alice', 'Brown', '555-1234', 'alice@example.com', '123 Main Street');

4) UPDATE Party
SET Phone_Number = '555-9999'
WHERE Party_ID = 101;

5) DELETE FROM Party
WHERE Party_ID = 101;

6) INSERT INTO Staff (Party_ID, Position, Salary, Hire_Date)
VALUES (201, 'Manager', 55000, '2022-01-15');

7) SELECT p.First_Name, p.Last_Name, s.Salary
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
ORDER BY s.Salary DESC;

8) UPDATE Staff
SET Salary = Salary * 1.10
WHERE Position = 'Manager';

9) DELETE FROM Staff
WHERE Salary < 20000;

10) INSERT INTO Supplier (Party_ID, Payment_Terms, Bank_Account_Details)
VALUES (301, 'Net 30', '123-456-ABC');

-- Member 2
11) SELECT p.First_Name, p.Last_Name, s.Payment_Terms
FROM Party p
JOIN Supplier s ON p.Party_ID = s.Party_ID;

12) UPDATE Supplier
SET Bank_Account_Details = '987-XYZ-654'
WHERE Party_ID = 301;

13) DELETE FROM Supplier
WHERE Party_ID = 301;

14) INSERT INTO Warehouse (Warehouse_ID, Warehouse_Name, Location, Capacity)
VALUES (401, 'Central Depot', 'Downtown', 10000);

15) SELECT *
FROM Warehouse
WHERE Capacity > 5000;

16) UPDATE Warehouse
SET Capacity = 12000
WHERE Warehouse_Name = 'Central Depot';

17) DELETE FROM Warehouse
WHERE Warehouse_ID = 401;

18) INSERT INTO Product (Product_ID, Product_Name, Category, Unit_Price, Recorder_Quantity, Recorder_Level)
VALUES (501, 'Laptop XYZ', 'Electronics', 899.99, 10, 2);

19) SELECT Product_Name, Category, Unit_Price
FROM Product
WHERE Category = 'Electronics';

20) UPDATE Product
SET Unit_Price = Unit_Price + 50
WHERE Product_Name = 'Laptop XYZ';

-- Member 3
21) DELETE FROM Product
WHERE Product_ID = 501;

22) INSERT INTO Stock_Level (Product_ID, Warehouse_ID, Quantity_Stock, Last_Restock_Date)
VALUES (502, 402, 250, '2023-01-10');

23) SELECT p.Product_Name, sl.Quantity_Stock, sl.Last_Restock_Date
FROM Product p
JOIN Stock_Level sl ON p.Product_ID = sl.Product_ID;

24) UPDATE Stock_Level
SET Quantity_Stock = 300
WHERE Product_ID = 502 AND Warehouse_ID = 402;

25) DELETE FROM Stock_Level
WHERE Product_ID = 502 AND Warehouse_ID = 402;

26) SELECT p.First_Name, p.Last_Name, s.Hire_Date
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
WHERE s.Hire_Date > '2022-01-01';

27) SELECT COUNT(*) AS Total_Staff
FROM Staff;

28) SELECT AVG(Salary) AS Avg_Salary
FROM Staff;

29) SELECT DISTINCT Category
FROM Product;

30) SELECT p.Product_Name, SUM(sl.Quantity_Stock) AS Total_Stock
FROM Product p
JOIN Stock_Level sl ON p.Product_ID = sl.Product_ID
GROUP BY p.Product_Name;

-- Member 4
31) SELECT p.Product_Name, SUM(sl.Quantity_Stock) AS Total_Stock
FROM Product p
JOIN Stock_Level sl ON p.Product_ID = sl.Product_ID
GROUP BY p.Product_Name
HAVING SUM(sl.Quantity_Stock) > 1000;

32) SELECT p.First_Name, p.Last_Name, s.Salary
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
WHERE s.Salary BETWEEN 40000 AND 60000;

33) SELECT *
FROM Party
WHERE Address IS NOT NULL;

34) SELECT p.First_Name, p.Last_Name, s.Salary
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
ORDER BY s.Salary DESC
LIMIT 5;

35) INSERT INTO Party (Party_ID, First_Name, Last_Name, Phone_Number, Email, Address)
VALUES (102, 'John', 'Doe', '555-2222', 'john.doe@example.com', '456 Oak Street');

36) SELECT Warehouse_Name, Location, Capacity
FROM Warehouse
ORDER BY Location DESC;

37) UPDATE Product
SET Unit_Price = Unit_Price * 1.05
WHERE Category = 'Grocery';

38) SELECT Product_Name, Unit_Price
FROM Product
WHERE Unit_Price = (SELECT MAX(Unit_Price) FROM Product);

39) SELECT p.First_Name, p.Last_Name,
       YEAR(CURRENT_DATE) - YEAR(s.Hire_Date) AS Years_Employed
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID;

40) DELETE FROM Product
WHERE Category = 'Toys';

-- Member 5
41) SELECT p.First_Name, p.Last_Name
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
WHERE s.Position <> 'Manager';

42) SELECT p.First_Name, p.Last_Name, s.Salary
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
WHERE s.Salary > (SELECT AVG(Salary) FROM Staff);

43) SELECT p.First_Name, p.Last_Name, s.Payment_Terms
FROM Party p
JOIN Supplier s ON p.Party_ID = s.Party_ID
ORDER BY s.Payment_Terms;

44) SELECT SUM(Capacity) AS Total_Capacity
FROM Warehouse;

45) INSERT INTO Warehouse (Warehouse_ID, Warehouse_Name, Location, Capacity)
VALUES (999, 'Overflow Depot', 'Suburbs', 6000);

46) SELECT Product_Name, Unit_Price
FROM Product
WHERE Unit_Price < 100;

47) UPDATE Warehouse
SET Capacity = Capacity + 2000
WHERE Warehouse_Name = 'Overflow Depot';

48) SELECT COUNT(DISTINCT Product_ID) AS Distinct_Products_In_Stock
FROM Stock_Level;

49) SELECT w.Warehouse_Name
FROM Warehouse w
WHERE w.Warehouse_ID NOT IN (
    SELECT sl.Warehouse_ID 
    FROM Stock_Level sl
    WHERE sl.Product_ID = 502
);

50) SELECT p.First_Name, p.Last_Name, s.Position
FROM Staff s
LEFT JOIN Party p ON s.Party_ID = p.Party_ID;

-- Member 6
51) SELECT p.First_Name, p.Last_Name, sup.Bank_Account_Details
FROM Party p
JOIN Supplier sup ON p.Party_ID = sup.Party_ID
WHERE sup.Payment_Terms = 'Net 30';

52) SELECT MIN(Unit_Price) AS MinPrice,
       MAX(Unit_Price) AS MaxPrice,
       AVG(Unit_Price) AS AvgPrice
FROM Product;

53) DELETE FROM Staff
WHERE Party_ID NOT IN (SELECT Party_ID FROM Party);

54) SELECT *
FROM Product
WHERE Product_Name LIKE '%Lap%';

55) SELECT 'Party' AS TableName, COUNT(*) AS RowCount FROM Party
UNION ALL
SELECT 'Staff' AS TableName, COUNT(*) FROM Staff;

56) SELECT p.First_Name, p.Last_Name, s.Hire_Date
FROM Party p
JOIN Staff s ON p.Party_ID = s.Party_ID
WHERE YEAR(s.Hire_Date) = 2023;

57) UPDATE Product
SET Category = 'Tech'
WHERE Category = 'Electronics';

58) SELECT w.Warehouse_Name, COUNT(sl.Product_ID) AS Total_Products
FROM Warehouse w
JOIN Stock_Level sl ON w.Warehouse_ID = sl.Warehouse_ID
GROUP BY w.Warehouse_Name;

59) INSERT INTO Party (Party_ID, First_Name, Last_Name, Phone_Number, Email, Address)
VALUES (110, 'Jane', 'Smith', '555-7777', 'jane.smith@example.com', '12 Apple Blvd');
INSERT INTO Supplier (Party_ID, Payment_Terms, Bank_Account_Details)
VALUES (110, 'Net 15', '999-AAA-333');

60) SELECT p.First_Name, p.Last_Name, COUNT(DISTINCT sl.Product_ID) AS Products_Supplied
FROM Supplier sup
JOIN Party p ON sup.Party_ID = p.Party_ID
JOIN Stock_Level sl ON sl.Product_ID IS NOT NULL
GROUP BY p.First_Name, p.Last_Name;`}
                </code>
            </pre>

            <h4 className="text-xl font-semibold mb-4 text-center py-4">GUI Functionality</h4>
            <p className="mb-6 leading-relaxed">
                The Inventory Management System's GUI is designed to provide a seamless and intuitive user experience. Key features include:
            </p>
            <ul className="list-disc pl-5">
                <li><strong>Dashboard:</strong> Displays key statistics such as total products, active orders, total warehouses, and staff members, with visual indicators for changes compared to the previous month.</li>
                <li><strong>Product Management:</strong> Allows users to add, view, update, and delete products, with detailed information on stock levels and reorder quantities.</li>
                <li><strong>Warehouse Management:</strong> Provides insights into warehouse capacities and locations, with options to manage and monitor inventory across multiple sites.</li>
                <li><strong>Order Processing:</strong> COMING SOON! It should Facilitates the management of purchase orders, including tracking order status and expected delivery dates.</li>
                <li><strong>Staff and Supplier Management:</strong> Enables the management of staff roles and supplier information, ensuring efficient coordination and communication.</li>
                <li><strong>Dark Mode:</strong> Offers a toggle to switch between light and dark themes, enhancing user comfort and accessibility.</li>
            </ul>
        </div>
    );
};

export default Worddoc;