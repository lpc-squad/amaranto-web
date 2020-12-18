import {
  AppBar,
  Avatar,
  // TODO: Agregar un Breadcrum para saber en qué "página" o "estado" estás
  // https://material-ui.com/components/breadcrumbs/
  // Breadcrumbs,
  Container,
  Divider,
  Drawer,
  Fade,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PatientsIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  avatarOpen: {
    // width: drawerWidth / 2,
    // height: drawerWidth / 2,
    // alignSelf: "center",
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen
    // }),
    // transition: theme.transitions.create("height", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen
    // })
  },
  avatarClose: {
    // alignSelf: "center",
    // width: 0,
    // heigth: 0,
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen
    // }),
    // transition: theme.transitions.create("heigth", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen
    // })
  },

  // Fuente: https://material-ui.com/components/drawers/#mini-variant-drawer
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    display: "flex",
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    justifyContent: "space-between",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0, // Mobile hidden
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(3),
    },
  },
}));

const Layout: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isRoot, setIsRoot] = useState(true);

  function toggleDrawer() {
    setOpen((o) => !o);
  }

  useEffect(() => {
    function checkNonDashboardPages() {
      const avoidRoutes = ["/", "/redirect/first-time-register"];
      if (avoidRoutes.find((value) => router.pathname === value)) {
        setIsRoot(true);
      } else {
        setIsRoot(false);
      }
    }

    Router.events.on("routeChangeStart", checkNonDashboardPages);
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
    checkNonDashboardPages();
    return () => {
      Router.events.off("routeChangeStart", checkNonDashboardPages);
      Router.events.off("routeChangeComplete", () => {});
      Router.events.off("routeChangeError", () => {});
    };
  }, [router, isRoot]);

  if (isRoot) {
    return children;
  }
  return (
    <div style={{ display: "flex" }}>
      <Fade
        in={loading}
        style={{
          zIndex: 9999,
          transitionDelay: loading ? "800ms" : "0ms",
        }}
      >
        <LinearProgress
          style={{ zIndex: 9999, position: "absolute", top: 0 }}
        />
      </Fade>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              style={{ cursor: "pointer" }}
            >
              Clinica Digital
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
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
          <IconButton onClick={toggleDrawer}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/">
            <ListItem button component="a">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText>Inicio</ListItemText>
            </ListItem>
          </Link>
          <Link href="/dashboard">
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
            [classes.avatarClose]: !open,
          })}
        >
          JC
        </Avatar>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* TODO: Fix this for mobile */}
        <Container>{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
