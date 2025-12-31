import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="w-full flex flex-col items-center justify-start py-8 px-3 gap-5">
        <h1 className="text-6xl font-bold py-3">Welcome to CloudText</h1>
        <p className="text-lg">Create and share your pastes easily.</p>
        <Link href={"/newpaste"} className='px-6 py-4 rounded-full bg-blue-700 text-lg font-bold text-white'>New Paste</Link>
      </main>
    </>
  );
}
