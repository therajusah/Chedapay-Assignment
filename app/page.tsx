import '@/app/globals.css';
import AuthForm from './components/auth';

export default function Home() {
  return (
    <div>
     <AuthForm mode="signup" />
    </div>
  );
}
