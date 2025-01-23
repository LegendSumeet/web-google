import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "./ui/sidebar"
import { FaHome, FaSignOutAlt } from 'react-icons/fa'; // Corrected icon imports
import Link from "next/link";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Welcome to Scraping Tool",
      url: "/dashboard",
      items: [
        {
          title: "Home",
          url: "/dashboard",
          isActive: true,
          icon: <FaHome />,
        },
      
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-gray-800 min-h-screen flex flex-col">
      <SidebarContent className="flex-grow bg-gray-800 text-white px-4 py-6">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title} className="mb-6">
            <SidebarGroupLabel className="text-xl font-semibold text-gray-300 mb-4">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className='py-2 rounded-lg w-full flex items-center space-x-2 cursor-pointer transition-all duration-200 '
                  >
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url} className="flex items-center space-x-2">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Logout Button at the Bottom */}
      <SidebarFooter className="bg-gray-800">
  <SidebarMenuItem className="text-white py-2 px-4 rounded-lg w-full flex items-center space-x-2 cursor-pointer transition-all duration-200">
    <SidebarMenuButton asChild>
      <Link href="/" onClick={() => handleLogout()}>
        <FaSignOutAlt />
        <span>Logout</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
</SidebarFooter>



      <SidebarRail />
    </Sidebar>
  )
}
const handleLogout = () => {
  // Remove the token from localStorage
  localStorage.removeItem("token");

  // Clear all cookies
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    const cookieName = cookie.split("=")[0].trim();
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
};
