import React from "react";

const Stats = [
    {count:"5k", label:"Active Students"},
    {count:"10+", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"50+", label:"Awards"},
]

function StatsComponent(){
    return (
        <section>
            <div>
                <div className=" bg-richblack-800 flex gap-x-60 h-[150px] justify-center items-center">

                    {
                        Stats.map( (data, index) => {
                            return (
                                <div className=" flex flex-col justify-center items-center" key={index}>
                                    <h1 className="text-3xl">
                                        {data.count}
                                    </h1>

                                    <h2 className="text-sm text-richblack-600">
                                        {data.label}
                                    </h2>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    )
}

export default StatsComponent;