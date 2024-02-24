import Link from "next/link";
import React from "react";

interface NavbarItemProps {
  label: string;
  active?: boolean;
  linkto: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, linkto }) => {
  return (
    <Link
      href={linkto}
      className={
        active
          ? "text-white cursor-default"
          : "text-gray-200 hover:text-gray-300 cursor-pointer transition"
      }
    >
      {label}
    </Link>
  );
};

export default NavbarItem;
