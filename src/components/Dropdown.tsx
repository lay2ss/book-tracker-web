import dotsIcon from "../assets/icon/dots.svg";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

interface DropdownProps{
    onDelete?: any;
    onEdit?: any;
    onRemove?: any;
}

const Dropdown: React.FC<DropdownProps> = ({onDelete, onEdit, onRemove}) => {
  return (
    <Menu as="div" className="relative inline-block font-inter">
      <MenuButton className="inline-flex w-full justify-center rounded-md px-2 py-1 text-sm font-semibold text-white inset-ring-1 inset-ring-white/10 hover:bg-white/10">
        <img src={dotsIcon} alt="dots icon" />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#1a191b] outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a onClick={onEdit}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Edit collection name
            </a>
          </MenuItem>
          <MenuItem>
            <a onClick={onRemove}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Remove Book
            </a>
          </MenuItem>
          <MenuItem>
            <a onClick={onDelete}
              href="#"
              className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden"
            >
              Delete collection
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}

export default Dropdown