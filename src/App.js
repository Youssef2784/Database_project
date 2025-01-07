import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { SidebarProvider } from "./components/ui/sidebarComponents";
import Products from "./pages/Products";
import Warehouse from "./pages/Warehouse";
import Orders from "./pages/Orders";
import Staff from "./pages/Staff";
import Suppliers from "./pages/Suppliers";
import Admin from "./pages/Admin";
import Modal from "./components/Modal";
import Worddoc from "./components/Worddoc";
import Layout from "./components/Layout";
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://stfxeigniiddxmwzeutn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0ZnhlaWduaWlkZHhtd3pldXRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyNDQ3NDEsImV4cCI6MjA1MTgyMDc0MX0.hgvUQYrcmEdYtmm5otjQHUj2oUpNPpBqSYPchy53Fiw';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const queryClient = new QueryClient();

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('isDarkMode', !isDarkMode);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <BrowserRouter>
          <div className={`app-container ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <Worddoc isDarkMode={isDarkMode} />
            </Modal>
            <div className="content">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/warehouses" element={<Warehouse />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/documentation" element={<Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}><Worddoc isDarkMode={isDarkMode} /></Layout>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default App;