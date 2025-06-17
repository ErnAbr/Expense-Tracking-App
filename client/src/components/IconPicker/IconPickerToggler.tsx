import { Box, Button } from "@mui/material";
import { IconPicker } from "./IconPicker";
import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as CiIcons from "react-icons/ci";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

interface IconPickerTogglerProps<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  initialIcon?: string;
  name: Path<T>;
}

export const IconPickerToggler = <T extends FieldValues>({
  setValue,
  initialIcon = "FaRegQuestionCircle",
  name,
}: IconPickerTogglerProps<T>) => {
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [icon, setIcon] = useState(initialIcon);

  const getIconComponent = (iconName: string) => {
    return (
      (FaIcons as any)[iconName] ||
      (MdIcons as any)[iconName] ||
      (CiIcons as any)[iconName] ||
      null
    );
  };

  const IconPreview = getIconComponent(icon);
  return (
    <>
      <Box display="flex" alignItems="center" gap={1}>
        {IconPreview && <IconPreview size={24} />}
        <Button
          onClick={() => setShowIconPicker((prev) => !prev)}
          type="button"
        >
          {showIconPicker ? "Close Icon Picker" : "Choose Icon"}
        </Button>
      </Box>
      {showIconPicker && (
        <IconPicker
          setSelectedIcon={(iconName) => {
            setIcon(iconName);
            setValue(name, iconName as PathValue<T, typeof name>);
            setShowIconPicker(false);
          }}
        />
      )}
    </>
  );
};
