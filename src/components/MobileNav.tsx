import { navData } from "../data/constants"

const MobileNav = () => {
  return (
    <ul className="blur-effect px-5 py-14 gray-text flex items-center flex-col gap-3">
        {
          navData.map((item) => 
            (<li className="li-style">{item}</li>)
          )
        }
        <li>
            <button className="button-style-outline border-[#FF6C00] orange-text">
                Sign Out
            </button>
        </li>
    </ul>
  )
}

export default MobileNav