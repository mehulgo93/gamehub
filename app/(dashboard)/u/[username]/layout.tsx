import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { Container } from "./_components/container";

interface CreateLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const CreaterLayout = async ({ params, children }: CreateLayoutProps) => {
  const self = await getSelfByUsername(params.username);
  if (!self) {
    redirect("/");
  }
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default CreaterLayout;
