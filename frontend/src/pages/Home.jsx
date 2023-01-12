import user from "@services/user";
import Layout from "./layout/Layout";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-xl">
        <span className="font-bold">Bonjour </span>
        {user.name} 👋
      </h1>
      <div>
        <h2 className="text-xl font-bold">Mes derniers résultats</h2>
      </div>
    </Layout>
  );
}
