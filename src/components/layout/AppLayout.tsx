import { useState } from "react";
import { Layout, Drawer, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import AppSidebar from "./AppSidebar";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

function AppLayout() {
  const { colors } = useTheme();
  const screens = useBreakpoint();
  const isDesktop = screens.lg;
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh", background: colors.background }}>
      {/* Desktop Sidebar */}
      {isDesktop && (
        <Sider width={260} theme="light" style={{ height: "100vh", position: "sticky", top: 0 }}>
          <AppSidebar />
        </Sider>
      )}

      {/* Mobile Drawer */}
      {!isDesktop && (
        <Drawer
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          closable={false}
          size={260}
          styles={{ body: { padding: 0 }, section: { boxShadow: "none" } }}
        >
          <AppSidebar onClose={() => setDrawerOpen(false)} />
        </Drawer>
      )}

      <Layout style={{ background: colors.background }}>
        <Content style={{ background: colors.background, padding: isDesktop ? 24 : 16, overflow: "auto" }} >
          {/* Mobile Header */}
          {!isDesktop && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              size="large"
              style={{ marginBottom: 16 }}
              onClick={() => setDrawerOpen(true)}
            />
          )}

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AppLayout;
