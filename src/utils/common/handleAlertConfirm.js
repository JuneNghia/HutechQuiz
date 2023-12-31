import Swal from "sweetalert2"

export const handleAlertConfirm = ({
  title,
  html,
  text,
  icon,
  confirmText,
  cancelText,
  handleConfirmed,
  showCancelButton,
  confirmButtonColor,
  cancelButtonColor
}) => {
  Swal.fire({
    title: title,
    html: html,
    text: text,
    icon: icon,
    allowOutsideClick: false,
    confirmButtonText: confirmText || 'Xác nhận',
    confirmButtonColor: confirmButtonColor || undefined,
    cancelButtonColor: cancelButtonColor || undefined,
    showCancelButton: showCancelButton || false,
    cancelButtonText: cancelText || 'Huỷ'
  }).then((isConfirm) => {
    if (isConfirm.isConfirmed) {
      if (handleConfirmed) {
        handleConfirmed()
      } else {
        window.location.reload()
      }
    }
  })
}
