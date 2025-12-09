import { navData } from "../data/constants"

const DesktopNav = () => {
  return (
    <><ul className="flex gap-5 items-center gray-text">
        {
            navData.map((item) => 
              (<li className="li-style">{item}</li>)
            )
        }
      </ul></>
  )
}

export default DesktopNav