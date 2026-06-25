import { navData } from "../data/constants";
import { Link } from "react-router-dom";

const DesktopNav = () => {
  return (
    <><ul className="flex gap-4 items-center text-white">
        {
            navData.map((item) => 
              (
                <Link to={`/${item.li.toLowerCase()}`} key={item.id}>
                  <div className="flex items-center gap-1 hover:border-b hover:border-[#b99ef6] hover:rounded-md p-2">
                      {location.pathname === `/${item.li.toLowerCase()}` || (location.pathname === "/" && item.li == "Home")  ? <li className="li-style text-xs purple-text">{item.li}</li> : <li className="text-xs li-style">{item.li}</li>}
                  </div>
                </Link>
            )
            )
        }
      </ul></>
  )
}

export default DesktopNav