import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/session";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PieChartIcon from '@material-ui/icons/PieChart';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EcoIcon from '@material-ui/icons/Eco';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const mapStateToProps = ({ session }) => ({
  session
});


const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  item_right: {
    color: 'white',
    float: 'right',
    position: 'relative',
    flex: 1

  }
}));

const Navbar = ({ logout, session }) => {

  //console.log(session);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar style={{ background: '#29a329' }}
        
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
            <Typography variant="h6" noWrap>
            NutriGreen
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        <Link to="/dashboard">
          <ListItem button>
            <ListItemIcon>
              <PieChartIcon/>
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
        </Link>
          <Link to="/nutrition-logs">
          <ListItem button >
            <ListItemIcon>
              <FastfoodIcon/>
            </ListItemIcon>
            <ListItemText>Nutrition Logs</ListItemText>
          </ListItem>
          </Link>
          <Link to="/create-log">
          <ListItem button>
            <ListItemIcon>
              <AddCircleIcon/>
            </ListItemIcon>
            <ListItemText>Add Nutrition Log</ListItemText>
          </ListItem>
          </Link>
          <Link to="/donate">
          <ListItem button>
            <ListItemIcon>
              <EcoIcon/>
            </ListItemIcon>
            <ListItemText>Offset GHG Emissions</ListItemText>
          </ListItem>
          </Link>
          <Link to="/profile">
          <ListItem button>
            <ListItemIcon>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
        <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToAppIcon/>  
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
        </Typography>
      </main>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
