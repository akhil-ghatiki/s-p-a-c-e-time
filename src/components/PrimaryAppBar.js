import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  buttons: {
    textTransform: 'none',
    fontFamily: '-apple-system, BlinkMacSystemFont,'
        + ' \'Segoe UI\', \'Roboto\', \'Oxygen\','
        + ' \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\','
        + ' \'Helvetica Neue\', sans-serif',
    fontWeight: 600,
    "&:hover": {
      backgroundColor: "#fffffc"
    }
  }
}));

export default function PrimaryAppBar() {
  const classes = useStyles();
  const [setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true
      }
    }
  });

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
      <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}>
        <MenuItem className={classes.buttons}
                  component={Link}
                  to="/">
          <Typography>Home</Typography>
        </MenuItem>
        <MenuItem className={classes.buttons}
                  component={Link}
                  to="/now">
          <Typography>/now</Typography>
        </MenuItem>
        <MenuItem className={classes.buttons}
                  component={Link}
                  to="/categories">
          <Typography>Categories</Typography>
        </MenuItem>
        <MenuItem className={classes.buttons}
                  component={Link}
                  to="/tags">
          <Typography>Tags</Typography>
        </MenuItem>
      </Menu>
  );

  return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.grow}>
          <AppBar position="static" color={'transparent'}
                  style={{boxShadow: 'none'}}>
            <Toolbar>
              <div className={classes.grow}/>
              <Button className={classes.buttons} style={{marginRight: 90}}
                      color="inherit"
                      component={Link}
                      to="/">
                <Typography>Home</Typography>
              </Button>
              <div className={classes.sectionDesktop}>
                <Button className={classes.buttons} style={{marginRight: 90}}
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        component={Link}
                        to="/now"
                >
                  <Typography>/now</Typography>
                </Button>
                <Button className={classes.buttons} style={{marginRight: 90}}
                        color="inherit"
                        component={Link}
                        to="/categories">
                  <Typography>Categories</Typography>
                </Button>
                <Button className={classes.buttons} style={{marginRight: 90}}
                        color="inherit"
                        component={Link}
                        to="/tags">
                  <Typography>Tags</Typography>
                </Button>
              </div>
              <div className={classes.sectionMobile}>
                <Button className={classes.buttons}
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                >
                  <Typography>|||</Typography>
                </Button>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {/*{renderMenu}*/}
        </div>
      </MuiThemeProvider>
  );
}
