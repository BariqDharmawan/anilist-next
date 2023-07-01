import ClientOnly from "@/src/components/ClientOnly";
import Home from "@/src/sections/Home";

export default function HomePage() {
  return (
    <div>
      Hello World
      <ClientOnly>
        <Home />
      </ClientOnly>
    </div>
  );
}
