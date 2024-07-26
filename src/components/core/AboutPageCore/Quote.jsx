import React from "react";
import HighlighText from "../HomePage/HighlighText";

function Quote () {
    return (
        <div className="flex justify-center items-center text-center mt-20">
            <p className="text-4xl w-[75%]">
                " We are passionate about revolutionizing the way we learn. Our innovative platform
                <HighlighText text={' combines technology'} />
                <span className="text-yellow-200"> expertise, </span>
                and community to create an
                <span className="text-yellow-200"> unparalleled educational experience."</span>
            </p>
        </div>
    )
}

export default Quote;