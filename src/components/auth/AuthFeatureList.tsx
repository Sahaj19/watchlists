import { CheckCircleOutlined, ClockCircleOutlined, HeartOutlined, RocketFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Flex, Typography } from "antd";
import { useTheme } from "../../hooks/useTheme";

const { Title, Text } = Typography;

interface AuthFeatureListProps {
  mode: "login" | "signup";
}

function AuthFeatureList({ mode }: AuthFeatureListProps) {
  const { colors } = useTheme();

  const features =
    mode === "login"
      ? [
          {
            icon: <HeartOutlined />,
            title: "Your Watchlist",
            description: "Access all the movies you have saved.",
          },
          {
            icon: <CheckCircleOutlined />,
            title: "Mark Movies as Watched",
            description: "Keep track of every movie you've finished.",
          },
          {
            icon: <ClockCircleOutlined />,
            title: "Never Lose a Recommendation",
            description: "Save movies to watch whenever you have time.",
          },
          {
            icon: <StarOutlined />,
            title: "Build Your Collection",
            description: "Organize your favourite movies in one place.",
          },
        ]
      : [
          {
            icon: <HeartOutlined />,
            title: "Create Your Watchlist",
            description: "Build your own collection of movies.",
          },
          {
            icon: <CheckCircleOutlined />,
            title: "Track Your Progress",
            description: "Mark movies as watched anytime.",
          },
          {
            icon: <ClockCircleOutlined />,
            title: "Save for Later",
            description: "Never forget another movie recommendation.",
          },
          {
            icon: <StarOutlined />,
            title: "Discover More",
            description: "Organize the movies you love.",
          },
        ];

  return (
    <Flex vertical gap={36}>
      <Flex align="center" gap={12}>
        <Avatar size={52} style={{ background: colors.primary, color: colors.white }} icon={<RocketFilled />} />

        <Flex vertical gap={2}>
          <Title level={2} style={{ margin: 0, color: colors.textPrimary }}>{mode === "login" ? "Why Sign In?" : "Why Create an Account?"}</Title>
          <Text style={{ color: colors.textSecondary }}>Everything you need for your movie journey.</Text>
        </Flex>
      </Flex>

      {features.map((feature) => (
        <Flex key={feature.title} gap={18} align="flex-start">
          <Avatar size={46} style={{ background: `${colors.primary}15`, color: colors.primary }} icon={feature.icon} />

          <Flex vertical gap={4}>
            <Title level={4} style={{ margin: 0, color: colors.textPrimary }}>{feature.title}</Title>
            <Text style={{ color: colors.textSecondary, lineHeight: 1.6 }}>{feature.description}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}

export default AuthFeatureList;
