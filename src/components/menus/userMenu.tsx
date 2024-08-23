import React from "react";
import { useAuthStore } from "@/app/stores/login";

const UserMenu = React.forwardRef<HTMLDivElement>((_, ref) => {
  const { userName, email, logout } = useAuthStore((state) => ({
    userName: state.userName,
    email: state.email,
    logout: state.logout,
  }));

  return (
    <div
      ref={ref}
      className="absolute left-10 z-10 mt-4 min-w-max -translate-x-full transform rounded-md bg-old-rose-50 shadow-lg shadow-old-rose-950"
    >
      <div className="flex flex-col space-y-1 border-b p-4 font-medium">
        <span className="text-old-rose-800">{userName}</span>
        <span className="text-sm text-old-rose-400">{email}</span>
      </div>
      <ul className="my-2 flex flex-col space-y-1 p-2">
        {/* <li>
          <a
            href="#"
            className="block rounded-md px-2 py-1 text-old-rose-900 transition hover:bg-old-rose-100"
          >
            Perfil
          </a>
        </li> */}
        <li>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="block rounded-md px-2 py-1 text-old-rose-900 transition hover:bg-old-rose-100"
          >
            Sobre o app
          </a>
        </li>
      </ul>
      <div className="flex items-center justify-center border-t p-4 text-old-rose-700 underline">
        <a onClick={logout} href="/login">
          Logout
        </a>
      </div>
    </div>
  );
});

UserMenu.displayName = "UserMenu";

export default UserMenu;
