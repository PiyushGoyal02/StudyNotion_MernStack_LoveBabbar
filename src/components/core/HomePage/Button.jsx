// import React from 'react'
// import { Link } from 'react-router-dom'

// const Button = ({childern, active, linkto}) => {
//     // (Childern) ka matlab value Ki Button Kai Andr Konsi Value hai (LearnMore, BookADemo)
//     // (Active) eska matlab hai ki Color konsa hoga Yellow ya Black
//     // (linkto) eska matlab hai ki konsa action perfome karna hai ya phir kin chezz sai link karna chahte ho
//   return (
//     <div>
//         <Link to={linkto}>
//             <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
//             ${active ? 'bg-yellow-50 text-black' : 'bg-richblack-800'} 
//             hover:scale-95 transition-all duration-200
//             `}> 
//                 {childern}
//             </div>
//         </Link>
//     </div>
//   )
// }

// export default Button

import React from 'react'
import {Link} from "react-router-dom"

const Button = ({children, active, linkto}) => {
    // (Childern) ka matlab value Ki Button Kai Andr Konsi Value hai (LearnMore, BookADemo)
   // (Active) eska matlab hai ki Color konsa hoga Yellow ya Black
  // (linkto) eska matlab hai ki konsa action perfome karna hai ya phir kin chezz sai link karna chahte ho
  return (
    <Link to={linkto}>

        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
        ${active ? "bg-yellow-50 text-black":" bg-richblack-800"}
        hover:scale-95 transition-all duration-200
        `}>
            {children}
        </div>

    </Link>
  )
}

export default Button