import { Link as RouterLink } from "react-router-dom";

import { Outlet } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";

// export default function Root() {
//   return (
//     <div >
      
//         <nav className="flex-container" >
//           <ul>
//             <li>
//               <Link to={`/`}>Home</Link>
//             </li>
//             <li>
//               <Link to={`/messages`}>Messages
//               </Link>
//             </li>
//           </ul>
//         </nav>

      
        
      
//       <div id="detail">
//         <Outlet />
//       </div>
//     </div>
//   );
// }


interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = [{name: 'Home', link: '/'}, {name: 'Messages', link: '/messages'}];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MU
      </Typography>
      <Divider />
      {navItems.map(item => (
        <Link key={item.name} component={RouterLink} to={item.link}>
          
          <Button sx={{ color: '#000' }}>{item.name}</Button>
        </Link>
      ))}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    
    <Box sx={{ display: 'flex' }}>
      
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
        
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item.link} sx={{ color: '#fff' }}>
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
