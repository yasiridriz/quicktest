import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  AppBar, Drawer, Toolbar,
  Typography, IconButton, Button,
  List, ListItem, ListItemIcon, ListItemText, Divider, ClickAwayListener
} from '@material-ui/core';

import ListIcon from '@material-ui/icons/List';
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));


const Nav = (props, { isAuthenticated }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton edge="start" onClick={handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title}>
            <Link href="/"><img src="/images/Logo.png" className="logo" /></Link>
          </Typography>
          {(isAuthenticated && (
            <Link onClick={props.deauthentice}><Button color="inherit">Ç'kyçu</Button></Link>
          ) || (
              <Link href="/auth/login"><Button color="inherit">Kyçu</Button></Link>
            ))
          }
        </Toolbar>
      </AppBar>
      <Drawer open={open}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List style={{ width: "250px" }}>
          <ListItem button>
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Të gjitha testet" />
          </ListItem>
          <Link href="/tests/add">
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Shto test të re" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>

    </div >
  );
}

const mapStateToProps = (state) => (
  { isAuthenticated: !!state.authentication.token }
);


export default connect(mapStateToProps)(Nav);