import AuthForm from "../../components/AuthForm";

export default function AdminSignup() {
  return <AuthForm isLogin={false} userType="admin" />;
}
