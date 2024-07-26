import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/Images/banner.mp4";
import Footer from "../components/common/Footer";
import { TiArrowRightThick } from "react-icons/ti";
import CTAButton from "../components/core/HomePage/Button";
import CodeBlock from "../components/core/HomePage/CodeBlock";
import HighlighText from "../components/core/HomePage/HighlighText";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import UnloackPowerCode from "../components/core/HomePage/UnloackPowerCode";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";

function Home() {
  return (
    <div>
      {/* Section 1 */}

      <div className=" max-w-maxContent relative mx-auto flex-col w-100/12 items-center text-white justify-between">
        <Link to={"/signup"}>
          <div
            className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                    transition-all duration-200 hover:scale-95 w-fit mt-16 p-1"
          >
            <div className="group-hover:bg-richblack-900 flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200">
              <p>Become an Instructor</p>
              <TiArrowRightThick />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlighText text={" Coding Skills"} />
        </div>

        <div className=" w-[90%] text-center text-lg font-bold text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace,
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback
          instructors.
        </div>

        <div className="flex flex-row justify-center gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-12 shadow-blue-200">
          <video muted loop autoPlay>
            <source src={Banner}></source>
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlighText text={" coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n body>\n h1><ahref="/">Header</a>\n /h1>\n nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a></nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlighText text={" coding potential"} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n body>\n h1><ahref="/">Header</a>\n /h1>\n nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a></nav>`}
            codeColor={"text-yellow-25"}
          />
        </div>

        <UnloackPowerCode/>
      </div>

      {/* Section 2 */}

        <div className="bg-pure-greys-5 text-richblack-700">

            <div className="homepage_bg h-[333px]">

                <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
                    <div className="h-[150px]"></div>
                    <div className="flex flex-row gap-7 text-white">
                        <CTAButton active={true} linkto={'/signup'}>
                            <div className="flex gap-2 items-center">
                                Explore Full Catalog
                                <TiArrowRightThick/>
                            </div>
                            
                        </CTAButton>

                        <CTAButton active={false} linkto={'/singup'}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                        
                    </div>

                </div>

            </div>

            <div className="w-11/12 gap-5 mx-auto max-w-maxContent flex flex-col items-center justify-between">

                <div className="flex flex-row gap-5 mt-[95px]">
                    <div className="text-4xl font-semibold w-[45%]">
                        Get the Skills you need for a
                        <HighlighText text={" Job that is in demand"}/>
                    </div>

                    <div className="flex flex-col gap-10 w-[40%] items-start">
                        <p className="text-[16px]">
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>

                        <CTAButton active={true} linkto={'/signup'}>
                            <div>
                                Learn More
                            </div>
                        </CTAButton>
                    </div>
                </div>

                <TimelineSection/>
                <LearningLanguageSection/>
            </div>

        </div>

        {/* Section 3 */}

        <div className=" w-11/12 max-auto max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            <InstructorSection/>
            <h2 className="ml-[33%] mb-[25px] font-semibold text-4xl mt-10">Reviews from Other learners</h2>
            {/* Review Slider Here */}
        </div>


        {/* Footer Code */}
        <Footer/>

    </div>
  );
}

export default Home;
