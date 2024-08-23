"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import RoseIcon from "@/assets/images/rosa.png";
import UserMenu from "@/components/menus/userMenu";
import { useMenuStore } from "@/app/stores/menu";

function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
}

function UserMenuButton() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuStore((state) => ({
    isMenuOpen: state.isMenuOpen,
    toggleMenu: state.toggleMenu,
    closeMenu: state.closeMenu,
  }));

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useOutsideClick(menuRef, closeMenu);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className={`relative rounded-full bg-old-rose-200 p-1 ${isMenuOpen ? "focus:outline-none focus:ring focus:ring-old-rose-400" : ""}`}
        title="Avatar"
        type="button"
        onClick={toggleMenu}
      >
        <Image
          width={1920}
          height={1080}
          className="h-8 w-8 rounded-full object-cover"
          src={RoseIcon}
          alt="User Avatar"
        />
      </button>
      {isMenuOpen && (
        <div ref={menuRef}>
          <UserMenu />
        </div>
      )}
      <div className="absolute bottom-3 right-0 animate-ping rounded-full bg-old-rose-950 p-1"></div>
      <div className="absolute bottom-3 right-0 rounded-full border border-old-rose-50 bg-old-rose-400 p-1"></div>
    </div>
  );
}

export default UserMenuButton;
