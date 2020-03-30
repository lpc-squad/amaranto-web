import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import {
  AppBar,
  Avatar,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import PatientsIcon from "@material-ui/icons/Group";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  avatarOpen: {
    width: drawerWidth / 2,
    height: drawerWidth / 2,
    alignSelf: "center",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    transition: theme.transitions.create("height", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  avatarClose: {
    alignSelf: "center",
    width: 0,
    heigth: 0,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    transition: theme.transitions.create("heigth", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  // Fuente: https://material-ui.com/components/drawers/#mini-variant-drawer
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    display: "flex",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    justifyContent: "space-between"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function Layout(props) {
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function toggleDrawer() {
    setOpen(o => !o);
  }

  return (
    <Container>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Clinica Digital
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <IconButton onClick={toggleDrawer}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
        <List className={classes.list}>
          <Link href="/">
            <ListItem button component="a">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Inicio</ListItemText>
            </ListItem>
          </Link>
          <Link href="/">
            <ListItem button component="a">
              <ListItemIcon>
                <PatientsIcon />
              </ListItemIcon>
              <ListItemText>Pacientes</ListItemText>
            </ListItem>
          </Link>
        </List>
        <Avatar
          className={clsx({
            [classes.avatarOpen]: open,
            [classes.avatarClose]: !open
          })}
        >
          JC
        </Avatar>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </Container>
  );
}

export default Layout;
