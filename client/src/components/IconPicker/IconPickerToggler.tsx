import { Box, Button } from "@mui/material";
import { IconPicker } from "./IconPicker";
import { useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import { getIconComponent } from "../../utils/getIconComponent";

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
