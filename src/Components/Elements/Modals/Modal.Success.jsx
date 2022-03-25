import Swal from "sweetalert2";

const Success = (message) =>
  Swal.fire({
    icon: "success",
    title: "SUCCESS",
    text: `${message ? message : "Completed"}`,
    showConfirmButton: false,
    timer: 3000,
    background: "white",
    color: "black",
    width: 595,
  });

export default Success;
