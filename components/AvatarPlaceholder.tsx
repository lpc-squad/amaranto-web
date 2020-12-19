import { Avatar } from "@material-ui/core";
import { FunctionComponent } from "react";

type Gender = "F" | "M";

interface AvatarPlaceholderProps {
  dimension?: string | number;
  gender?: Gender;
}

const AvatarPlaceholder: FunctionComponent<AvatarPlaceholderProps> = ({
  dimension = 180,
  gender,
}) => (
  <Avatar
    style={{
      width: dimension,
      height: dimension,
    }}
    src={
      (gender === "F" && "https://randomuser.me/api/portraits/women/39.jpg") ||
      "https://randomuser.me/api/portraits/men/28.jpg"
    }
  />
);

export default AvatarPlaceholder;
