import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-center flex-wrap bg-black p-2 mb-6 sticky top-0 z-50">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link
          to="/"
          className="float-left w-full mr-52 text-center text-xl tracking-tight"
        >
          Todos
        </Link>
      </div>

      <div>
        <Link
          to="/kanban"
          className="inline-block text-lg text-right px-4 py-2 text-white border-white mt-4 lg:mt-0"
        >
          Kanban
        </Link>
      </div>
    </nav>
  );
}
