import { Popover, Transition } from "@headlessui/react";
import MobileNavbar from "@lightbringer/components/Navbar/Mobile";
import WebNavbar from "@lightbringer/components/Navbar/Web";
import { FC, Fragment } from "react";

const Navbar: FC = () => {
  return (
    <Popover className="sticky top-0 z-20 bg-primary-900">
      <WebNavbar />

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right p-2 transition md:hidden"
        >
          <MobileNavbar />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navbar;
