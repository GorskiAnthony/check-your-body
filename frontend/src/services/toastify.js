import { toast } from "react-toastify";

export default function toastify(message, type) {
  switch (type) {
    case "success":
      return toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        theme: "colored",
      });
    case "warning":
      return toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        theme: "colored",
      });
    case "error":
      return toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        theme: "colored",
      });
    default:
      break;
  }
}
