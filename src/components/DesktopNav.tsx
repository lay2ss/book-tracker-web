import { navData } from "../data/constants"

const DesktopNav = () => {
  return (
    <><ul className="flex gap-4 items-center text-white">
        {
            navData.map((item) => 
              (
              <a key={item.id} href={`/${item.li.toLowerCase()}`}>
                <div className="flex items-center gap-1 hover:border-b hover:border-[#b99ef6] hover:rounded-md p-2">
                    {location.pathname === `/${item.li.toLowerCase()}` || (location.pathname === "/" && item.li == "Home")  ? <li className="li-style purple-text">{item.li}</li> : <li className="li-style">{item.li}</li>}
                </div>
              </a>
            )
            )
        }
      </ul></>
  )
}

export default DesktopNav