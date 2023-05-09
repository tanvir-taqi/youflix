import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [display, setDisplay] = useState<Boolean>(false)


   

    return (
        <div className='' >
            <div className={` bg-[] z-50 w-full header py-5 header-container  flex flex-col md:flex-row justify-around items-center `}>
                <div className="header-logo flex justify-around around items-center w-full  md:w-1/6">

                    {/* header logo and name  */}

                    <Link to='/' className={`font-bold flex  text-lg md:text-3xl`}>
                        <h1 className='text-cyan-600 title-navbar'>YouFliix</h1>
                    </Link>

                    <button className='block md:hidden' onClick={() => setDisplay(!display)}></button>
                </div>
                {/* header links  */}
                <div className={`nav-menu flex  md:items-center flex-col md:flex-row   ${display ? 'flex' : 'hidden md:flex'}`} >
                    <div onClick={() => setDisplay(false)} className="nav-menu-link items-start flex flex-col md:flex-row py-12 md:py-1 ">

                        <Link to='/' className=''>Home</Link>                      

                    </div>





                </div>
            </div>

        </div>
    )

};

export default Header;