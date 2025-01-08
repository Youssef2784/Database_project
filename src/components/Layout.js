import { SidebarProvider } from "./ui/sidebarComponents";
import SidebarComponent from "./sidebar";
import { useEffect } from "react";

export default function Layout({ children, isDarkMode, toggleTheme }) {
  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <SidebarProvider>
      <div className={`min-h-screen flex w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
        <SidebarComponent isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="flex-1 p-8 ml-64 animate-fade-in">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}