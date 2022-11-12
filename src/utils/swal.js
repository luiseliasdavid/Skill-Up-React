import Swal from 'sweetalert2'

const swal = (title, text = '', icon = '') => {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'Aceptar',
        width: '400px',
        timer: 10000,
        timerProgressBar: true,
    })
}

export default swal;