import react from "react";
import IconBtn from "./IconBtn";


function ConfirmationModal({modalData, modal}){
    return (
        <div>
            <div>
                <p>
                    {modal.text1}
                </p>

                <p>
                    {modal.text2}
                </p>

                <div>
                    <IconBtn
                        onclick={modalData.btn1Handler}
                        text={modalData.btn1Text}
                    />

                    <button onClick={modalData.btn2Handler}>
                        {modalData.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;