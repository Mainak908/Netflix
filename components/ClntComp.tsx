"use client";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import useInfoModalStore from "../hooks/useInfoModalStore";

export const Infobtn = ({ data }: any) => {
  const { openModal } = useInfoModalStore();
  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);
  return (
    <button
      onClick={handleOpenModal}
      className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
    >
      <InformationCircleIcon className="w-4 md:w-7 mr-1" />
      More Info
    </button>
  );
};
