import { useState } from "react";
import { Button, Card, Flex, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const { Title, Text } = Typography;

interface AuthFormProps {
  mode: "login" | "signup";
}

function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: { email: string }) {
    try {
      setLoading(true);

      const success =
        mode === "login" ? login(values.email) : signup(values.email);

      if (success) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: 420 }}>
        <Flex vertical gap={24}>
          <div>
            <Title level={2}>
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </Title>

            <Text type="secondary">
              {mode === "login"
                ? "Login to manage your watchlist."
                : "Create an account to save your favourite movies."}
            </Text>
          </div>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email.",
                },
                {
                  type: "email",
                  message: "Please enter a valid email.",
                },
              ]}
            >
              <Input placeholder="sahaj@yopmail.com" size="large" />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              block
              size="large"
              loading={loading}
            >
              {mode === "login" ? "Login" : "Create Account"}
            </Button>
          </Form>
        </Flex>
        <Flex justify="center">
          <Text type="secondary">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </Text>

          <Button
            type="link"
            onClick={() => navigate(mode === "login" ? "/signup" : "/login")}
          >
            {mode === "login" ? "Create Account" : "Login"}
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}

export default AuthForm;
