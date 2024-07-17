import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlighText from './HighlighText';
import CTAButton from "../HomePage/Button"
import { TiArrowRightThick } from "react-icons/ti";

const InstructorSection = () => {
  return (
    <div className='m-16'>

        <div className='flex flex-row gap-20 items-center'>

            <div className='w-[50%]'>
                <img
                    src={Instructor}
                    alt='Instructor'
                    className='shadow-white'
                />
            </div>

            <div className='w-[50%] flex-col gap-10'>
                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <HighlighText text={" instructor"}/>
                </div>

                <p className='mt-5 font-medium text-[16px] w-[80%] text-richblack-100'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit mt-8'>
                    <CTAButton active={true} linkto={'/singup'}>
                        <div className='flex justify-center items-center gap-2'>
                            Start Teaching Today 
                            <TiArrowRightThick/>
                        </div>
                    </CTAButton>
                </div>
            </div>

        </div>

    </div>
  )
}

export default InstructorSection;
