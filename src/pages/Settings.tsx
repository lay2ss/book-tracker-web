import '../checkbox.css';

const Settings = () => {
  return (
    <section  className='h-screen w-full font-inter p-5 relative mx-auto text-white'>
        <main className='w-[90vw] lg:w-[80vw] max-w-[1200px] rounded-tl-2xl rounded-tr-2xl mx-auto bottom-0 left-1/2 transform -translate-x-1/2  h-screen absolute border-l-3 border-r-3 border-t-3 border-[#252033] p-5'>
            <div className="bg-dark-purple p-4 rounded-xl">
                <h1 className="text-xl font-bold purple-text text-start">Reading Goal</h1>
                <div className='flex flex-col'>
                  <div className='flex items-center'>
                    <p>Annual</p> 
                    <div className="checkbox-apple">
                        <input className="yep" id="check-apple" type="checkbox"/>
                        <label htmlFor="check-apple"></label>
                    </div>
                    <p>Monthly</p>
                  </div>
                  <div className='flex items-center justify-between gap-2 flex-wrap md:flex-nowrap'>
                    <input type="text" placeholder="Type a number" className='border border-gray-700 p-2 w-full md:w-1/3 rounded-md outline-none focus:ring-1 focus:ring-[#b99ef6] text-sm' />
                    <button className='rounded-xl text-[#252033] text-xs font-bold tracking-wider transition-transform active:scale-95 bg-[#b99ef6] h-min py-3 px-5 mt-2 md:mt-0'>Save</button>
                  </div>
                </div>
            </div>
        </main>
    </section>
  )
}

export default Settings