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
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import PatientsIcon from "@material-ui/icons/Group";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Head from "../Head";
import ListItem from "./ListItem";
import { useStyles } from "./styles";

interface LayoutProps {
  title?: string;
}

const Layout: FunctionComponent<LayoutProps> = ({ title, children }) => {
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
    const checkNonDashboardPages = () => {
      const avoidRoutes = ["/", "/redirect/first-time-register"];
      if (avoidRoutes.find((value) => router.pathname === value)) {
        setIsRoot(true);
      } else {
        setIsRoot(false);
      }
    };

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
    return <>{children}</>;
  }

  return (
    <>
      <Head>
        <title>{title && `${title} - `}Amaranto</title>
      </Head>
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
            <ListItem href="/" Icon={HomeIcon} text="Inicio" />
            <ListItem href="/dashboard" Icon={PatientsIcon} text="Pacientes" />
          </List>
          <Avatar>JC</Avatar>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {/* TODO: Fix this for mobile */}
          <Container>
            <>{children}</>
          </Container>
        </main>
      </div>
    </>
  );
};

export default Layout;
