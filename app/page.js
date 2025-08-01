import AuthGuard from "./components/AuthGuard";
import Dashboard from "./dashboard/page";

export default function Home() {
  return (
    <AuthGuard>
      <div className="p-8">
        <Dashboard />
      </div>
    </AuthGuard>
  );
}
