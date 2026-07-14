import { Card, Grid, Typography } from "antd";
import type { ReactNode } from "react";
import { useTheme } from "../../hooks/useTheme";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

interface PageBannerProps {
  title: string;
  highlightedTitle: string;
  description: string;
  children?: ReactNode;
}

function PageBanner({ title, highlightedTitle, description, children }: PageBannerProps) {
  const { colors } = useTheme();
  const screens = useBreakpoint();
  return (
    <Card
      style={{ borderColor: colors.primary, borderRadius: 16, background: colors.surface }}
      styles={{ body: { padding: screens.md ? "20px" : "15px" } }}
    >
        <Title
          level={screens.md ? 1 : 2}
          style={{ marginBottom: screens.md ? 16 : 10, color: colors.textPrimary, lineHeight: 1.2 }}
        >
        {title}{" "}
        <Text style={{ color: colors.primary, fontSize: "inherit" }}>{highlightedTitle}</Text>
      </Title>

      <Paragraph style={{ fontSize: screens.md ? 18 : 15, lineHeight: 1.7, marginBottom: children ? 18 : 0, color: colors.textPrimary }}>
        {description}
      </Paragraph>
    
      {children}
    </Card>
  );
}

export default PageBanner;