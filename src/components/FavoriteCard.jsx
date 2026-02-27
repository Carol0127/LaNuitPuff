import { useEffect, useState } from "react";
import { getFavoriteProducts } from "../services/products";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../store/slices/cartSlice";
import { useNavigate } from "react-router";

function FavoriteCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [favoriteData, setFavoriteCard] = useState([]);
  useEffect(() => {
    const fetechFavoriteCard = async () => {
      const res = await getFavoriteProducts();
      setFavoriteCard(res);
    };
    fetechFavoriteCard();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  const handleToggleFavorite = (id) => {
    // 濾掉被點擊的 ID
    setFavoriteCard((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      {favoriteData.map((item) => (
        <>
          <div
            key={item.id}
            className="col-6 col-lg-4 d-flex align-items-stretch"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="card product-primary-card border-0 rounded-0 w-100 d-flex flex-column position-relative">
              <button
                type="button"
                className="btn-puff btn-puff-favorite rounded-5 position-absolute top-0 end-0 m-12 m-lg-16"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleToggleFavorite(item.id);
                }}
              >
                <span className="material-symbols-outlined align-middle p-4 p-lg-8 fill-1">favorite</span>
              </button>

              <div className="product-img-container position-relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-100"
                />
                <button
                  className="btn-addToCart"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch(addToCartAsync({ id: item.id, qty: 1 }));
                  }}
                >
                  Add To Cart
                </button>
              </div>

              <div className="card-body bg-primary py-20 px-16 flex-grow-1 d-flex flex-column justify-content-between">
                <div>
                  <p className="eng-label-m text-blue-300 mb-8">/ {item.category}</p>
                  <div className="d-lg-flex align-items-center justify-content-between mb-8">
                    <p className="cn-heading-h5 text-taupe-200 mb-12 mb-lg-0">{item.title}</p>
                    <p className="eng-heading-h5 text-taupe-200 mb-12 mb-lg-0">NT.{item.price}</p>
                  </div>
                </div>
                {/* 這部分建議改為動態，若無英文名可先帶入 item.title 或固定 placeholder */}
                <p className="eng-label-m text-taupe-200 mb-0">Silence at 3 AM</p>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
}

export default FavoriteCard;
