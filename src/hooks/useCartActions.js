import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeAllItemAsync } from "../store/slices/cartSlice";

export const useCartActions = () => {
  const dispatch = useDispatch();

  const clearCartWithConfirm = () => {
    Swal.fire({
      title: "確定要清空購物車嗎？",
      text: "清空後商品將無法復原喔！",
      icon: "warning",
      iconColor: "#B73232",

      showCancelButton: true,
      confirmButtonText: "是的，全部清空",
      cancelButtonText: "保留我的甜點",

      customClass: {
        cancelButton: "btn btn-primary me-8",
        confirmButton: "btn btn-outline-danger ",
      },

      buttonsStyling: false,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeAllItemAsync());
      }
    });
  };

  return { clearCartWithConfirm };
};
