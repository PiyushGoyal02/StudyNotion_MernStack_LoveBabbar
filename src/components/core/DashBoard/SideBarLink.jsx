import react from "react";
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { Link, NavLink, matchPath, useLocation } from "react-router-dom";

function SideBarLinks({link, iconName}){
    const Icon = Icons[iconName]
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }

    return (
        <div>
            <NavLink
                to={link.path}
                className={`relative px-8 text-sm font-medium${matchRoute(link.path) ? "bg-yellow-100" : "bg-opacity-0"}`}
            >

                {/* Jo Side Mai EK Line hai na */}
                <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-5 
                    ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
                </span>

                <div className="flex items-center gap-x-2">
                    <Icon className="text-lg" />
                    <span>{link.name}</span>
                </div>

            </NavLink>
        </div>
    )
}

export default SideBarLinks;