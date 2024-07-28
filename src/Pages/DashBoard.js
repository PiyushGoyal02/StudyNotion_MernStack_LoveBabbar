import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import SideBar from "../components/core/DashBoard/SideBar"

function DashBoard(){

    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading} = useSelector((state) => state.profile)

    // Aagr Auth ya Profile mai sai DAta Nhi mila or True Nikla To haam Loading Show Karege
    if(authLoading || profileLoading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return(
        <div className="relative flex min-h-[calc(100vh-3.5rem)]">
            <SideBar/>

            <div className=" overflow-auto h-[calc(100vh-3.5rem)]">
                <div className="mx-auto w-11/12 max-w-[100px] py-10">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;