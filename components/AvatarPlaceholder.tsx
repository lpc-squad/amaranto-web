import { Avatar } from "@material-ui/core";

const imgWidth = 180;

function AvatarPlaceholder({ customWidth, gender }) {
  return (
    <Avatar
      style={{
        width: customWidth || imgWidth,
        height: customWidth || imgWidth,
      }}
      src={
        (gender === "F" &&
          "https://randomuser.me/api/portraits/women/39.jpg") ||
        "https://randomuser.me/api/portraits/men/28.jpg"
      }
    />
  );
}

export default AvatarPlaceholder;
