import { useEffect, useState } from "react";
import ProductsFilter from "../../components/ProductsFilter";
import ProductNavigation from "../../components/Navigation";
import ProductSort from "../../components/ProductsSort";
import PopularCardSwiper from "../../components/PopularCardSwiper";
import PuffSeriesSwiper from "../../components/PuffSeriesSwiper";
import { useNavigate } from "react-router";
// import { handleAddToCart } from "../../hooks/handleAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, sortProducts } from "../../store/slices/productSlice";
import { addToCartAsync } from "../../store/slices/cartSlice";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productData, pagination } = useSelector((state) => state.product);

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("");

  const categoryList = [
    { title: "全部品項", eng: "All", value: "" },
    { title: "甜蜜擁抱系", eng: "Comforting Hug", value: "甜蜜擁抱系" },
    { title: "提神夜貓系", eng: "Midnight Fuel", value: "提神夜貓系" },
    { title: "酸甜告白系", eng: "Sweet Heart", value: "酸甜告白系" },
    { title: "成熟苦甜系", eng: "Adult Only", value: "成熟苦甜系" },
    { title: "爆漿驚喜系", eng: "Surprise Explosion", value: "爆漿驚喜系" },
  ];

  useEffect(() => {
    dispatch(fetchProductsAsync({ page: currentPage, category: currentCategory }));
  }, [dispatch, currentPage, currentCategory]);

  useEffect(() => {
    if (sortOrder) {
      dispatch(sortProducts(sortOrder));
    }
  }, [dispatch, sortOrder]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="productHero d-flex align-items-center container-fluid p-0">
        <div className="container">
          <div className="row">
            <h1
              data-aos="fade-down"
              className="eng-display-xl text-white"
            >
              Product
            </h1>
          </div>
        </div>
      </section>
      <section className=" py-lg-120 py-64 bg-taupe-200">
        <div className="container">
          <div className="row gy-16 gy-lg-24">
            <div className="d-flex flex-column ">
              <h3 className="eng-display-xl text-primary text-center mb-16 mb-lg-24">The Full Collection</h3>

              <div className="d-flex justify-content-between align-items-center">
                {/* Filter 組件 */}
                <ProductsFilter
                  categoryList={categoryList}
                  setCurrentCategory={setCurrentCategory}
                  setCurrentPage={setCurrentPage}
                />
                {/* Sort 組件 */}
                <ProductSort setSortOrder={setSortOrder} />
              </div>
            </div>
            {productData.map((item) => (
              <div
                key={item.id}
                className="col-6 col-lg-3 px-8 px-lg-12 d-flex align-items-stretch "
                onClick={() => handleCardClick(item.id)}
              >
                <div className="card product-primary-card border-0 rounded-0 w-100 d-flex flex-column">
                  <div className="product-img-container position-relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-100 d-block"
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
                    <p className="eng-label-m text-taupe-200 mb-0">Silence at 3 AM</p>
                  </div>
                </div>
              </div>
            ))}
            <ProductNavigation
              pagination={pagination}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </section>
      <section className="position-relative overflow-hidden container-fluid pe-0 py-64 py-lg-80 bg-primary">
        <p className="collection">Collection Collection</p>
        <div className="container">
          <div className="row">
            <h2 className="text-center text-lg-start eng-display-xl text-taupe-200 mb-40 mb-lg-56">Popular</h2>
            <PopularCardSwiper />
          </div>
        </div>
      </section>
      <section className="container py-64 py-lg-120">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-32 ">
          <h2 className="eng-display-xl text-primary mb-24 m-lg-0">Our Puffs</h2>
          <button className="btn-puff btn-puff-primary btn-puff-eng-l eng-label-l">SHOP</button>
        </div>

        <div
          data-aos="fade-down"
          className="row align-items-stretch "
        >
          <PuffSeriesSwiper />
        </div>
      </section>
    </>
  );
}

export default Products;
