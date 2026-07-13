import { Flex, Typography } from "antd";
import type { ReactNode } from "react";
import { useTheme } from "../../hooks/useTheme";

const { Text } = Typography;

interface MovieDetailItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function MovieDetailItem({ icon, label, value }: MovieDetailItemProps) {
  const { colors } = useTheme();

  return (
    <Flex gap={12} align="flex-start">
      <Flex
        justify="center"
        align="center"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: colors.primary,
          color: colors.white,
          flexShrink: 0,
        }}
      >
        {icon}
      </Flex>

      <Flex vertical gap={2}>
        <Text type="secondary" style={{ fontSize: 13 }}>{label}</Text>
        <Text strong style={{ color: colors.textPrimary }}>{value}</Text>
      </Flex>
    </Flex>
  );
}

export default MovieDetailItem;