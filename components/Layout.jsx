import Link from "next/link";
import { Avatar, Container, Drawer, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const listWidth = 180;
const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 24
  },
  drawerPaper: {
    justifyContent: "space-between"
  },
  list: {
    width: listWidth
  },
  avatar: {
    width: listWidth / 2,
    height: listWidth / 2,
    alignSelf: "center"
  }
}));

function Layout(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {props.children}
      <Drawer
        anchor="left"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <List className={classes.list}>
          <Link href="/">
            <ListItem button component="a">
              Inicio
            </ListItem>
          </Link>
          <Link href="/">
            <ListItem button component="a">
              Pacientes
            </ListItem>
          </Link>
        </List>
        <Avatar className={classes.avatar}>JC</Avatar>
      </Drawer>
    </Container>
  );
}

export default Layout;
