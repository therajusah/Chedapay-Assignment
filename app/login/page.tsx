import AuthForm from '@/app/components/auth';
import '@/app/globals.css';
export default function login() {
  return (
    <div>
      <AuthForm mode="login" />
    </div>
  );
}
