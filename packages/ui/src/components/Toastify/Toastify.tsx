import { ToastContainer, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastProps = {
    position?: ToastPosition
    autoClose: number,
    hideProgressBar: boolean
}

export const ControlledToast: React.FC<ToastProps> = ({
    position,
    autoClose,
    hideProgressBar,
   ...rest
}) => {
    return(
        <ToastContainer 
            position={position}
            autoClose={autoClose}
            hideProgressBar={hideProgressBar}
            {...rest}
        />
    )
}
