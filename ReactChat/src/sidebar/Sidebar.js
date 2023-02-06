import React from "react";
import SidebarNav from "./SidebarNav";
import navigation from "./_nav";

const Sidebar = () => (
          <SidebarNav NavItemList={navigation} />
  );

export default Sidebar;