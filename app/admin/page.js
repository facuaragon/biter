"use client";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Hello, <b>{session.user.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img
            src={session.user.image}
            alt={session.user.email}
            className="w-6 h-6 rounded-lg"
          />
          <span className=" px-2">{session.user.name}</span>
        </div>
      </div>
    </>
  );
}
