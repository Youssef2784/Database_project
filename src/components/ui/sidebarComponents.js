import React, { createContext, useContext, useState } from 'react';

// Create a context for the sidebar
const SidebarContext = createContext();

// SidebarProvider component to provide the sidebar context
export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use the sidebar context
export function useSidebar() {
  return useContext(SidebarContext);
}

// Sidebar component
export function Sidebar({ children }) {
  const { isOpen } = useSidebar();
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'} pt-12 fixed top-0 left-0 h-full`}>
      {children}
    </div>
  );
}

// Other components used in the Sidebar
export function SidebarContent({ children }) {
  return <div className="sidebar-content">{children}</div>;
}

export function SidebarGroup({ children }) {
  return <div className="sidebar-group">{children}</div>;
}

export function SidebarGroupContent({ children }) {
  return <div className="sidebar-group-content">{children}</div>;
}

export function SidebarGroupLabel({ children }) {
  return <div className="sidebar-group-label">{children}</div>;
}

export function SidebarMenu({ children }) {
  return <ul className="sidebar-menu">{children}</ul>;
}

export function SidebarMenuButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

export function SidebarMenuItem({ children }) {
  return <li className="sidebar-menu-item">{children}</li>;
} 