import HeaderComponent from "@/components/HeaderComponent";
import TableComponent from "@/components/TableComponent";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-10 sm:p-12 xl:p-24">
        <TableComponent />
      </main>
  );
}
