import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string, message: string) {
    return this.toastr.success(message, title);
  }

  showError(title: string, message: string) {
    return this.toastr.error(message, title);
  }

  showInfo(title: string, message: string) {
    return this.toastr.info(message, title)
  }

  showWarning(title: string, message: string) {
    return this.toastr.warning(message, title);
  }

  showYesOrNoDialog(confirmButtonText: string, cancelButtonText: string, alertType: string, title: string, message: string, callback: () => void, completedTitle="Success", completedMessage="Action Completed") {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: true,
    })

    swalWithBootstrapButtons.fire({
      title: title,
      text: message,
      type: alertType,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true
    } as any).then((result) => {
      if (result.value) {

        if(typeof callback != undefined) {
          callback()
        }
        swalWithBootstrapButtons.fire(
          completedTitle,
          completedMessage,
          'success'
        )
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Action Cancelled',
          'error'
        )
      }
    })
  }
}
