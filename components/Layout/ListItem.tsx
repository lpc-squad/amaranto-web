import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import Link from "next/link";
import { FunctionComponent, ReactNode } from "react";

interface ListItemProps {
  href?: string;
  text: string;
  Icon?: ReactNode;
}

const ListItemComponent: FunctionComponent<ListItemProps> = ({
  Icon,
  href,
  text,
}) => (
  <Link href={href || "/"}>
    <ListItem button component="a">
      {Icon && <ListItemIcon>{Icon}</ListItemIcon>}
      <ListItemText>{text}</ListItemText>
    </ListItem>
  </Link>
);

export default ListItemComponent;
