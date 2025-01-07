import React from "react";
import { Home, Package, Warehouse, ShoppingCart, Users, File, Truck, Settings, Sun, Moon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebarComponents";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: Warehouse, label: "Warehouses", path: "/warehouses" },
  { icon: ShoppingCart, label: "Orders", path: "/orders" },
  { icon: Users, label: "Staff", path: "/staff" },
  { icon: Truck, label: "Suppliers", path: "/suppliers" },
  { icon: Settings, label: "Admin", path: "/admin" },
  { icon: File, label: "Documentation", path: "/documentation" },
];

export default function SidebarComponent({ isDarkMode, toggleTheme }) {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                      location.pathname === item.path ? "bg-secondary text-primary" : "hover:bg-gray-100"
                    }`}
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="w-6 h-6" />
                      <span className="text-base font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="mt-auto p-16">
          <button onClick={toggleTheme} className="w-full flex items-center justify-center bg-primary text-white p-2 rounded">
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
} 