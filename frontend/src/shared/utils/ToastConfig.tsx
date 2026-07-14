import { ToastContainer } from "react-toastify";

export function ToastConfig() {
    return (
        <ToastContainer
            position="bottom-left"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="light"
        />
    )
}