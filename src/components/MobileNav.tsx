import { navData } from "../data/constants"

interface MobileNavProps {
  toggle: any;
}

const MobileNav: React.FC<MobileNavProps> = ({toggle}) => {
  return (
      <>
      <button onClick={toggle} className="cursor-pointer">
        <img src="src/assets/icon/close.svg" alt="close icon" className="fixed z-10 top-9 right-5" />
      </button>
      <ul className="blur-effect px-5 py-14 flex items-center flex-col gap-3 text-white">
          {
            navData.map((item) => 
              (<li key={item.id} className="li-style">{item.li}</li>)
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