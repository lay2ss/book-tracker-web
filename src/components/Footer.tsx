import heart_icon from "../assets/icon/heart_active.svg";

function Footer() {
  return (
    <footer className="w-full px-5 relative mx-auto text-white font-inter">
        <main className="w-[90vw] lg:w-[80vw] max-w-300 rounded-2xl mx-auto">
        <div className="w-full border-b border-white/10"/>
        <p className="flex gap-2 opacity-50 items-center justify-center p-5 text-xs">Made with <img className="w-4" src={heart_icon} alt="heart icon" /> by @lay2ss</p>
        </main>
    </footer>
  )
}

export default Footer