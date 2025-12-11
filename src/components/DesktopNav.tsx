import { navData } from "../data/constants"

const DesktopNav = () => {
  return (
    <><ul className="flex gap-4 items-center text-white">
        {
            navData.map((item) => 
              (
              <div  key={item.id} className="flex items-center gap-1 hover:border hover:border-[#b99ef6] hover:rounded-xl p-2">
                <li className="li-style">{item.li}</li>
              </div>
            )
            )
        }
      </ul></>
  )
}

export default DesktopNav