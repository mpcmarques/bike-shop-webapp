import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full items-center justify-items-center h-full">
      <main className="flex flex-col items-center relative w-full h-full">
        <Image
          src="/mountain_bike.jpg"
          alt="Mountain Bike"
          objectFit="cover"
          fill={true}
          priority
        />

        <div className="w-full h-full absolute flex items-center justify-center">
          <div className="text-9xl text-zinc-800 font-bold  drop-shadow-cyan-950 drop-shadow-2xl">
            Marcus Bike Shop
          </div>
        </div>
      </main>
    </div>
  );
}
