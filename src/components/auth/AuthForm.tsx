import { useState } from "react";
import { Button, Card, Divider, Flex, Form, Grid, Input, Typography } from "antd";
import { MailOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { notificationService } from "../../services/notification.service";
import AuthFeatureList from "./AuthFeatureList";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface AuthFormProps {
  mode: "login" | "signup";
}

function AuthForm({ mode }: AuthFormProps) {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { login, signup } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(values: { email: string }) {
    try {
      setLoading(true);

      const success = mode === "login" ? login(values.email) : signup(values.email);

      if (!success) {
        if (mode === 'login') {
          notificationService.error('Login Failed', 'No account found with this email.');
        } else {
          notificationService.warning('Account Already Exists', 'An account with this email already exists.');
        }
        return;
      }

      notificationService.success(
        mode === "login" ? "Welcome Back!" : "Account Created",
        mode === "login" ? "You have successfully logged in." : "Your account has been created successfully."
      );

      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Flex justify="center" align="center" style={{ height: "100vh", padding: 24, overflow: "hidden" }}>
      <Card style={{ width: "100%", maxWidth: 1050, borderRadius: 20, overflow: 'hidden' }} styles={{ body: { padding: 0 } }}>
        <Flex>
          {/* Left Side */}
          <Flex vertical flex={1} style={{ padding: screens.lg ? 48 : 30 }}>
            <Flex vertical gap={32}>
              <Flex vertical gap={8}>
                <Title level={1} style={{ margin: 0 }}>{mode === "login" ? "Welcome Back" : "Create Account"}</Title>
                <Text style={{ color: colors.textSecondary, fontSize: 16, maxWidth: 360, lineHeight: 1.6 }}>
                  {mode === "login" ? "Sign in to continue your movie journey." : "Save movies, build your watchlist, and continue your movie journey."}
                </Text>
              </Flex>

              <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email." },
                    { type: "email", message: "Please enter a valid email."},
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined />}
                    placeholder="name@yopmail.com"
                    autoComplete="off"
                  />
                </Form.Item>

                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  size="large"
                  loading={loading}
                  icon={mode === "login" ? <LoginOutlined /> : <UserAddOutlined />}
                  style={{ height: 48, fontWeight: 600, fontSize: 16 }}
                >
                  {mode === "login" ? "Login" : "Create Account"}
                </Button>
              </Form>

              <Flex justify="center" gap={6} align="center">
                <Text style={{ color: colors.textSecondary }}>
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                </Text>
                <Text
                  style={{ color: colors.primary, cursor: 'pointer', userSelect: 'none'}}
                  onClick={() =>
                    navigate(mode === 'login' ? '/signup' : '/login')
                  }
                >
                  {mode === 'login' ? 'Create Account' : 'Login'}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* Right Side */}
          {screens.lg && (
            <>
              <Divider orientation="vertical" style={{ height: "auto",  margin: 0 }}/>
              <Flex flex={1} align="center" style={{ padding: screens.lg ? 48 : 30 }}>
                <AuthFeatureList mode={mode} />
              </Flex>
            </>
          )}
        </Flex>
      </Card>
    </Flex>
  );
}

export default AuthForm;
