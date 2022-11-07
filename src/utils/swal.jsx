import Swal from 'sweetalert2'

const swal = (title, text = '') => {
    Swal.fire({
        title,
        text,
        confirmButtonText: 'Aceptar',
        width: '400px',
        timer: 10000,
        timerProgressBar: true,
    })
}

export default swal;