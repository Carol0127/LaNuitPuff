import Swal from "sweetalert2";

// 基礎通用配置
const baseOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  showClass: { popup: "animate__animated animate__fadeIn animate__faster" },
  hideClass: { popup: "animate__animated animate__fadeOut animate__faster" },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
};

// 1. 成功模板
export const SuccessToast = Swal.mixin({
  ...baseOptions,
  icon: "success",
  iconColor: "#2E8B68", // Success 500
  background: "#EAF7F1", // 淺色背景：Success 100
  color: "#002B1B",
  customClass: {
    popup: "lanuit-toast-flat lanuit-toast-success",
    timerProgressBar: "lanuit-toast-progress",
  },
});

// 2. 失敗模板
export const ErrorToast = Swal.mixin({
  ...baseOptions,
  icon: "error",
  iconColor: "#D64545", // Error 400
  background: "#FCECEC",
  color: "#3D0A0A",
  customClass: {
    popup: "lanuit-toast-flat lanuit-toast-error",
    timerProgressBar: "lanuit-toast-progress",
  },
});
