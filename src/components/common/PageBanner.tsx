import { Card, Typography } from "antd";
import type { ReactNode } from "react";
import { useTheme } from "../../hooks/useTheme";

const { Title, Paragraph, Text } = Typography;

interface PageBannerProps {
  title: string;
  highlightedTitle: string;
  description?: string;
  children?: ReactNode;
}

function PageBanner({
  title,
  highlightedTitle,
  description,
  children,
}: PageBannerProps) {
  const { colors } = useTheme();

  return (
    <Card
      style={{
        borderColor: colors.primary,
        borderRadius: 16,
        background: colors.surface,
      }}
      styles={{
        body: {
          padding: "20px",
        },
      }}
    >
      <Title
        level={1}
        style={{
          marginBottom: 10,
          color: colors.textPrimary,
        }}
      >
        {title}{" "}
        <Text
          style={{
            color: colors.primary,
            fontSize: "inherit",
          }}
        >
          {highlightedTitle}
        </Text>
      </Title>

      {description && (
        <Paragraph
          style={{
            fontSize: 20,
            marginBottom: children ? 18 : 0,
            color: colors.textPrimary,
          }}
        >
          {description}
        </Paragraph>
      )}

      {children}
    </Card>
  );
}

export default PageBanner;