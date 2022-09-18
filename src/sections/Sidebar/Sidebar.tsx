import { Divider } from '@mui/material';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  close as closeSidebarAction,
  open as openSidebarAction,
} from '@/store/sidebar/sidebar.slice';
import { isIOS } from '@/utils/is-iOS.util';
import isMobile from '@/utils/is-mobile';

import Footer from './Footer';
import Header from './Header';
import Items from './Items';
import Logout from './Logout';
import { Drawer, SwipeableDrawer } from './styled';

function Sidebar() {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.sidebar.open);

  const closeSidebar = () => dispatch(closeSidebarAction());
  const openSidebar = () => dispatch(openSidebarAction());

  if (isMobile) {
    return (
      <SwipeableDrawer
        PaperProps={{
          sx: {
            width: 'calc(100% - 64px)',
            backgroundImage: 'none',
          },
        }}
        variant="temporary"
        anchor="left"
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
        open={isSidebarOpen}
        onClose={closeSidebar}
        onOpen={openSidebar}
      >
        <Header />

        <Items />

        <Divider sx={{ margin: isSidebarOpen ? '0 32px' : '0 12px' }} />

        <Logout />

        <Footer />
      </SwipeableDrawer>
    );
  }
  return (
    <Drawer
      variant="permanent"
      open={isSidebarOpen}
      PaperProps={{
        sx: {
          border: 'none',
        },
      }}
    >
      <Header />

      <Items />

      <Divider sx={{ margin: isSidebarOpen ? '0 32px' : '0 12px' }} />

      <Logout />

      <Footer />
    </Drawer>
  );
}

export default Sidebar;
