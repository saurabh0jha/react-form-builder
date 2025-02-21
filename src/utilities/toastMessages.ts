import { toast, Bounce, ToastPosition } from "react-toastify";

const settings = {
  position: "bottom-left" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
};

export const successToast = (message: string) => {
  toast.success(message, settings);
};

export const warningToast = (message: string) => {
  toast.warning(message, settings);
};

export const infoToast = (message: string) => {
  toast.info(message, settings);
};
