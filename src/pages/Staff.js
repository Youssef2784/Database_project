import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableRow, TableCell } from '@mui/material';
import { TableHeader } from "../components/ui/TableHeader";
import { supabase } from "../App";

const Staff = () => {
  const [staffMembers, setStaffMembers] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });
  const [newStaff, setNewStaff] = useState({
    name: "",
    role: "",
    department: "",
    status: "Active",
    joinDate: "",
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const { data, error } = await supabase
          .from('staff')
          .select(`
            staffid,
            position,
            salary,
            hiredate,
            status,
            partyid (
              partyid,
              email,
              phonenumber, 
              address
            )
          `);

        if (error) throw error;

        const formattedData = data.map(staff => ({
          staffid: staff.staffid,
          position: staff.position,
          salary: staff.salary,
          hiredate: staff.hiredate,
          status: staff.status,
          email: staff.partyid.email,
          phonenumber: staff.partyid.phonenumber,
          address: staff.partyid.address
        }));
        console.log(formattedData);
        setStaffMembers(formattedData);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };

    fetchStaffData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  const addStaff = (e) => {
    e.preventDefault();
    setStaffMembers([
      ...staffMembers,
      { ...newStaff, id: `EMP${staffMembers.length + 1}` },
    ]);
    setNewStaff({
      name: "",
      role: "",
      department: "",
      status: "Active",
      joinDate: "",
    });
  };

  const deleteStaff = (id) => {
    setStaffMembers(staffMembers.filter(staff => staff.staffid !== id));
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
          <h1 className="text-4xl font-bold tracking-tight dark:text-white">Staff</h1>
          <p className="text-muted-foreground dark:text-white">Manage your staff</p>
        </header>

        {/* <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Add New Staff</h2>
          <form onSubmit={addStaff} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={newStaff.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="role"
                value={newStaff.role}
                onChange={handleInputChange}
                placeholder="Role"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="department"
                value={newStaff.department}
                onChange={handleInputChange}
                placeholder="Department"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="joinDate"
                value={newStaff.joinDate}
                onChange={handleInputChange}
                className="border p-2 rounded"
                required
              />
              <select
                name="status"
                value={newStaff.status}
                onChange={handleInputChange}
                className="border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
            <button type="submit" className="bg-primary text-white p-2 rounded">
              Add Staff
            </button>
          </form>
        </Card> */}

        <Card className="p-6 dark:text-white">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">Staff Directory</h2>
          <Table>
            <TableHeader headers={['Staff ID', 'Role', 'Email', 'Phone', 'Address', 'Salary', 'Status', 'Join Date', 'Actions']} />
            <TableBody>
              {staffMembers.map((staff) => (
                <TableRow key={staff.staffid}>
                  <TableCell className="font-medium dark:text-white">{staff.staffid}</TableCell>
                  <TableCell className="dark:text-white">{staff.position}</TableCell>
                  <TableCell className="dark:text-white">{staff.email}</TableCell>
                  <TableCell className="dark:text-white">{staff.phonenumber}</TableCell>
                  <TableCell className="dark:text-white">{staff.address}</TableCell>
                  <TableCell className="dark:text-white">{staff.salary}</TableCell>
                  <TableCell className="dark:text-white">{staff.status}</TableCell>
                  <TableCell className="dark:text-white">{staff.hiredate}</TableCell>
                  <TableCell>
                    <button onClick={() => deleteStaff(staff.staffid)} className="text-red-500 hover:underline dark:text-white">
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

export default Staff;