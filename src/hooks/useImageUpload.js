// hooks/useImageUpload.js
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../components/Toast";

export const useImageUpload = (uploadImgApi) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return null; // 沒選檔案就回傳 null

    if (file.size > 3 * 1024 * 1024) {
      ErrorToast.fire({ title: "檔案過大", message: "請上傳 3MB 以下的圖片" });
      return null;
    }

    setIsUploading(true);
    try {
      const res = await uploadImgApi(file);
      if (res.success) {
        SuccessToast.fire({ title: "圖片已更新，記得儲存" });
        return res.imageUrl; // 回傳網址，讓組件決定怎麼存
      } else {
        ErrorToast.fire({ title: "上傳失敗", message: "請檢查檔案格式" });
        return null;
      }
    } catch {
      ErrorToast.fire({ title: "上傳發生錯誤", message: "請稍後再試" });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { handleUpload, isUploading };
};
