import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';

const Sidebar = () => {
  return (
    <><CDBSidebar>
    <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>Contrast</CDBSidebarHeader>
    <CDBSidebarContent>
      <CDBSidebarMenu>
        <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
        <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
        <CDBSidebarMenuItem icon="credit-card" iconType="solid">
          Metrics
        </CDBSidebarMenuItem>
      </CDBSidebarMenu>
    </CDBSidebarContent>

    <CDBSidebarFooter style={{ textAlign: 'center' }}>
      <div
        className="sidebar-btn-wrapper"
        style={{padding: '20px 5px'}}
      >
        Sidebar Footer
      </div>
    </CDBSidebarFooter>
  </CDBSidebar>
    </>
  )
}

export default Sidebar