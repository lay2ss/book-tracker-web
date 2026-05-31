import { navData } from "../data/constants";
import closeIcon from "../assets/icon/close.svg";

interface MobileNavProps {
  toggle: any;
}

const MobileNav: React.FC<MobileNavProps> = ({toggle}) => {
  return (
      <>
      <button onClick={toggle} className="cursor-pointer">
        <img src={closeIcon} alt="close icon" className="fixed z-10 top-10 right-7" />
      </button>
      <ul className="pt-10 p-5 flex items-left flex-col gap-5 text-white w-[70vw] h-fit bg-[#1a191b] rounded-lg">
          {
            navData.map((item) => 
              (<a key={item.id} href={`/${item.li.toLowerCase()}`}> 
                 {location.pathname === `/${item.li.toLowerCase()}` || (location.pathname === "/" && item.li == "Home") ? <li className="li-style text-md purple-text">{item.li}</li> : <li className="li-style text-md">{item.li}</li>}
              </a>)
            )
          }
          <li>
          </li>
      </ul>
      </>
  )
}

export default MobileNav