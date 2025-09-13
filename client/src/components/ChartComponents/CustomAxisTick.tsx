import { getIconComponent } from "../../utils/getIconComponent";

interface CustomAxisTickProps {
  x?: number;
  y?: number;
  iconName?: string;
  payload?: { value: string };
}

export const CustomAxisTick = ({
  x = 0,
  y = 0,
  iconName,
  payload,
}: CustomAxisTickProps) => {
  const Icon = getIconComponent(iconName ?? "");

  return (
    <foreignObject
      x={x - 12}
      y={y + 4}
      width={24}
      height={24}
      viewBox="0 0 1024 1024"
      fill="#666"
    >
      <Icon size={20} title={payload?.value} />
    </foreignObject>
  );
};
