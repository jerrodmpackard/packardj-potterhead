import HeaderComponent from "@/components/HeaderComponent";
import TableComponent from "@/components/TableComponent";

export default function Home() {
  return (
    <>
      <header className="flex flex-col items-center p-12">
        <HeaderComponent />
      </header>

      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <TableComponent />
      </main>
    </>
  );
}
