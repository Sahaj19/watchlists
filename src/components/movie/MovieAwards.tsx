import { Alert, Card, Flex, Typography } from "antd";
import { TrophyOutlined } from "@ant-design/icons";
import { useTheme } from "../../hooks/useTheme";

const { Title } = Typography;

interface MovieAwardsProps {
  awards: string;
}

function MovieAwards({ awards }: MovieAwardsProps) {
  const { colors } = useTheme();

  if (!awards || awards === "N/A") {
    return null;
  }

  return (
    <Card>
      <Flex vertical gap={20}>
        <Title level={3} style={{ margin: 0, color: colors.textPrimary }}><TrophyOutlined /> Awards</Title>
        <Alert type="warning" description={awards} style={{ background: colors.surface, border: `1px solid ${colors.warning}` }} />
      </Flex>
    </Card>
  );
}

export default MovieAwards;
