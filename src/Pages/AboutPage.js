import React from "react";
import aboutImage1 from "../assets/Images/aboutus1.webp";
import aboutImage2 from "../assets/Images/aboutus2.webp";
import aboutImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPageCore/Quote";
import Footer from "../components/common/Footer"
import FoundingStory from "../assets/Images/FoundingStory.png";
import HighlighText from "../components/core/HomePage/HighlighText";
import LearningGrid from "../components/core/AboutPageCore/LearningGrid";
import StatsComponent from "../components/core/AboutPageCore/StatsComponent";
import ContactFormSection from "../components/core/AboutPageCore/ContactFormSection";

function AboutPage() {
    return (
        <div className=" mx-auto mt-[100px] text-white">
        {/* Section 1 */}
        <section>
            <div>
                <header className="flex flex-col justify-center items-center">
                    <h1 className="text-3xl font-semibold">Driving Innovation in Online Education for a</h1>
                    <p className="text-2xl mt-1"> 
                        <HighlighText text={" Brighter Future"} />
                    </p>

                    <p className="w-[48%] text-center mt-3 text-pure-greys-100">
                        Studynotion is at the forefront of driving innovation in online
                        education. We're passionate about creating a brighter future by
                        offering cutting-edge courses, leveraging emerging technologies,
                        and nurturing a vibrant learning community.
                    </p>
                </header>

                <div className="flex gap-3 items-center justify-center mt-10">
                    <img src={aboutImage1} />

                    <img src={aboutImage2} />

                    <img src={aboutImage3} />
                </div>
            </div>

        </section>

        {/* Section 2 */}
        <section>
            <div>
                <Quote/>
            </div>
        </section>

        {/* Section 3 */}
        <section>
            <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-1 text-richblack-500">
                <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
                    <div className="my-24 flex lg:w-[50%] flex-col gap-10">
                        <h1 className="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                            Our Founding Story
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            Our e-learning platform was born out of a shared vision and
                            passion for transforming education. It all began with a group of
                            educators, technologists, and lifelong learners who recognized
                            the need for accessible, flexible, and high-quality learning
                            opportunities in a rapidly evolving digital world.
                        </p>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            As experienced educators ourselves, we witnessed firsthand the
                            limitations and challenges of traditional education systems. We
                            believed that education should not be confined to the walls of a
                            classroom or restricted by geographical boundaries. We
                            envisioned a platform that could bridge these gaps and empower
                            individuals from all walks of life to unlock their full
                            potential.
                        </p>
                    </div>

                    <div>
                    <img
                        src={FoundingStory}
                        alt=""
                        className="shadow-[0_0_20px_0] shadow-[#FC6767]"
                    />
                    </div>
                </div>

                <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
                    <div className="my-24 flex lg:w-[40%] flex-col gap-10">
                        <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                            Our Vision
                        </h1>
                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            With this vision in mind, we set out on a journey to create an
                            e-learning platform that would revolutionize the way people
                            learn. Our team of dedicated experts worked tirelessly to
                            develop a robust and intuitive platform that combines
                            cutting-edge technology with engaging content, fostering a
                            dynamic and interactive learning experience.
                        </p>
                    </div>

                    <div className="my-24 flex lg:w-[40%] flex-col gap-10">

                        <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                            Our Mission
                        </h1>

                        <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>

                </div>

            </div>

        </section>

      {/* Section 4 */}
      <section>
        <StatsComponent />
      </section>

      {/* Section 5 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

        {/* Review Slider */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
            </h1>
            {/* <ReviewSlider /> */}
        </div>

        {/* Footer */}
        <section>
            <Footer/>
        </section>
    </div>
  );
}

export default AboutPage;
