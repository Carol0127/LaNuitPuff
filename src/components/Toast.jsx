import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,

  // 背景使用 Primary 700，文字使用 Neutral 100 (#F2F2F2)
  background: "#010D33",
  color: "#F2F2F2",

  // 圖示顏色使用 Primary 300 (#9AA9CC) 增加細緻感
  iconColor: "#9AA9CC",

  customClass: {
    popup: "lanuit-toast-flat", // 換成 flat 類別
    timerProgressBar: "lanuit-toast-progress",
  },

  showClass: {
    // 拿掉所有彈跳感，改用單純的透明度變化，符合「深夜」的靜謐
    popup: "animate__animated animate__fadeIn animate__faster",
  },
  hideClass: {
    popup: "animate__animated animate__fadeOut animate__faster",
  },

  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

export default Toast;
