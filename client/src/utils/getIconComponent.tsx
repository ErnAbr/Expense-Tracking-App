import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";
import * as FaIcons from "react-icons/fa";

export const getIconComponent = (iconName: string) => {
  const prefix = iconName.slice(0, 2);
  switch (prefix) {
    case "Md":
      return MdIcons[iconName as keyof typeof MdIcons];
    case "Ci":
      return CiIcons[iconName as keyof typeof CiIcons];
    case "Fa":
      return FaIcons[iconName as keyof typeof FaIcons];
    default:
      return MdIcons.MdCategory;
  }
};
