import Swal from "sweetalert2";

export default function Confirmation(
  title,
  confirmButtonText,
  successFunction
) {
  return Swal.fire({
    iconHtml: '<img src="images/question.png">',
    title,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: "No",
    customClass: {
      confirmButton: "siteBtn mx-1",
      cancelButton: "siteBtn2 mx-1",
      title: "modal-heading",
    },
    background: "#fff",
    color: "black",
    width: 595,
    heightAuto: true,
  }).then((result) => {
    if (result.isConfirmed) {
      successFunction();
    }
  });
}
