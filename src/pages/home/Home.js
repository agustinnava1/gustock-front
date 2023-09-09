import Navbar from "../../components/navbar/Navbar";
import Sidebar, { SidebarItem } from "../../components/sidebar/Sidebar";
import { BarChart3, Package, UserCircle } from 'lucide-react';

import './home.css';

function Home() {
  return (
    <div>
    <Sidebar>
      <SidebarItem icon={<BarChart3 size={20}/>} text="Statistics" active/>
      <SidebarItem icon={<UserCircle size={20}/>} text="Statistics"/>
      <SidebarItem icon={<Package size={20}/>} text="Statistics"/>
    </Sidebar>
    </div>
  );
}

export default Home;