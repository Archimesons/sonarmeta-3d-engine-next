import Image from "next/image";

export default function EngineTopbar() {
  return (
    <>
      <nav className="fixed flex justify-between items-center w-full h-[55px] bg-zinc-900 px-6">
        <div className="flex items-center">
          <Image src="/logo-full-light.png" alt="sonarmeta-logo" width={150} height={50} priority />
        </div>
      </nav>

      <nav className="h-[55px]"></nav>
    </>
  );
}
