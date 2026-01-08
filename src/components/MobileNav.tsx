import { navData } from "../data/constants";
import closeIcon from "../assets/icon/close.svg";

interface MobileNavProps {
  toggle: any;
}

const MobileNav: React.FC<MobileNavProps> = ({toggle}) => {
  return (
      <>
      <button onClick={toggle} className="cursor-pointer">
        <img src={closeIcon} alt="close icon" className="fixed z-10 top-9 right-5" />
      </button>
      <ul className="blur-effect px-5 py-14 flex items-center flex-col gap-3 text-white">
          {
            navData.map((item) => 
              (<a key={item.id} href={`/${item.li.toLowerCase()}`}> 
                 {location.pathname === `/${item.li.toLowerCase()}` || (location.pathname === "/" && item.li == "Home") ? <li className="li-style purple-text">{item.li}</li> : <li className="li-style">{item.li}</li>}
              </a>)
            )
          }
          <li>
              <button className="button-style-outline border-[#b99ef6] purple-text">
                  Sign Out
              </button>
          </li>
      </ul>
      </>
  )
}

export default MobileNav