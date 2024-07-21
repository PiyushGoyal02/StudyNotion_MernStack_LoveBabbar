import React, { useEffect, useState } from 'react'
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavbarLinks } from '../../data/navbar-links'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../ServicesAPI/apiConnector';
import { categories } from '../../ServicesAPI/apis';

const Navbar = () => {

    // Slices Ka Data Fetch Karna
    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )

    const [subLinks, setSubLinks] = useState([]);

    const fetchSubLinks = async() => {
            try{

                const result = await apiConnector("GET", categories.CATEGORIES_API)
                setSubLinks(result.data.data)

            }catch(error){
                console.log("Could Not Fetch The Category list")
            }
        }

    useEffect(() => {
        fetchSubLinks()
    }, [])

    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='w-11/12 flex max-w-maxContent items-center justify-between'>
                {/* Image Study Notion Logo */}
                <Link to='/'>
                    <img src={logo} width={160} height={42} loading='lazy'/>
                </Link>

                {/* Nav Links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                    <div className='relative flex items-center justify-center gap-1 group'>
                                        <p>{link.title}</p>
                                        <MdKeyboardArrowDown />

                                        <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[80%] flex flex-col rounded-md
                                            bg-richblack-5 p-4 text-richblack-900 order-0 transition-0 duration-200 group-hover:visible
                                            group-hover:opacity-100 w-[300px]'>

                                            <div className='absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded
                                                translate-y-[-45%] bg-richblack-5'>
                                            </div>

                                            {
                                                subLinks.length ? (
                                                    subLinks.map( (subLink, index) => (
                                                        <Link to='/catalog'>
                                                            
                                                        </Link>
                                                    ) )
                                                ) : (<div></div>)
                                            }
                                        </div>




                                    </div>) : (

                                        <Link to={link?.path}>
                                            <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                            
                                        </Link>
                                    )
                                }
                            </li>
                        ) )
                    }

                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[18px] text-richblack-100 rounded-md'>
                                    Log in
                                </button>
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[18px] text-richblack-100 rounded-md'>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }

                    {
                        token != null && <ProfileDropDown/>
                    }
                </div>
                
            </div>
        </div>
    )
}

export default Navbar;
