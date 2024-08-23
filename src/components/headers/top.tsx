"use client";

import React from "react";
import UserMenuButton from "@/components/buttons/userMenu";

const TopHeader: React.FC = () => {
  return (
    <header className="flex-shrink-0 border-b bg-old-rose-50">
      <div className="flex items-center justify-between p-2">
        {/* Left section for future items (like logo, navigation menu, etc.) */}
        <div className="flex items-center space-x-3">
          {/* Additional elements can be added here */}
        </div>
        {/* Right section for user menu button and other icons */}
        <div className="relative flex items-center space-x-3">
          <UserMenuButton />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
