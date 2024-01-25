import Featured from "@/components/Featured";
import Newest from "@/components/Newest";
import Image from "next/image";

export const revalidate = 10;

export default function Home() {
  return (
    <main>
      <h1>Hero Section</h1>
      <Newest />
      <Featured />
    </main>
  );
}
