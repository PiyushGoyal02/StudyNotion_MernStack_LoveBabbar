import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solution",
    },
];

const TimelineSection = () => {

  return (
    <div className='flex flex-row gap-14 items-center'>


        {/* Left Box */}

        <div className='w-[45%] gap-5 flex flex-col'>
            {
                timeline.map( (element, index) => {
                    return(
                        <div className='flex flex-row gap-6' key={index}>

                            <div className='w-[50px] h-[50px] bg-white flex justify-center items-center'>
                                <img src={element.Logo}/>
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        {/* Right Box */}

        <div className='relative shadow-blue-200'>
            <img src={timelineImage}
                alt='timelineImage'
                className='shadow-white rounded-sm object-cover h-[450px]'
            ></img>
        </div>

        <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase px-4 py-5 left-[55.5%] mt-[27%]'>
            <div className='flex flex-row gap-2 items-center border-r border-caribbeangreen-300 px-3'>
                <p className='text-3xl font-bold'>10</p>
                <p className='text-caribbeangreen-300 text-sm'>Years of<br/> Experince</p>
            </div>

            <div className='flex gap-2 items-center px-3'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Type of<br/> Courses</p>
            </div>
        </div>


    </div>
  )
}

export default TimelineSection
