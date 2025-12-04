import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-black h-full text-white flex flex-col items-center justify-center ">
      <p className="text-[108px]">404</p>
      <div className="flex flex-col items-center justify-center bg-black text-white gap-6">
      <p>Page doesn&lsquo;t exist...</p>

      <Link
        href={"/"}
        className=" gap-6 text-left underline decoration-transparent hover:decoration-white transition-all duration-300 ease-in-out"
      >
        Return to homepage
      </Link>
      </div>
    </div>
  );
}
