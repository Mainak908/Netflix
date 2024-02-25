"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import InfoModal from "../components/InfoModal";
import Navbar from "../components/Navbar";
import useInfoModalStore from "../hooks/useInfoModalStore";

const Main = ({ children }: any) => {
  const { isOpen, closeModal } = useInfoModalStore();

  const { data } = useSession();

  if (!data?.user) {
    redirect("/auth");
  }

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      {children}
    </>
  );
};

export default Main;
