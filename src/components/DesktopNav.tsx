import { navData } from "../data/constants"

const DesktopNav = () => {
  return (
    <><ul className="flex gap-4 items-center gray-text">
        {
            navData.map((item) => 
              (
              <div  key={item.id} className="flex items-center gap-1 hover:bg-[#FFF5ED] hover:rounded-xl p-2">
                <li className="li-style">{item.li}</li>
              </div>
            )
            )
        }
      </ul></>
  )
}

export default DesktopNav