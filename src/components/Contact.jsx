function Contact() {
  return (
    <>
      <div className="col-lg-10 p-0 position-relative">
        <div className="main-img-wrapper position-relative">
          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553966402.jpg?raw=true"
            alt="Contact Banner"
            className="d-block contactBanner"
            data-aos="fade-left"
            data-aos-delay="700"
          />

          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/SHOP/lanuit-1769934311571.jpg?raw=true"
            alt="Shop Detail"
            className="position-absolute top-100 start-80 translate-middle  d-none d-xl-block shopDetail"
            data-aos="fade-down"
            data-aos-delay="800"
          />
        </div>
        <div className="d-flex flex-column align-items-center align-items-lg-start py-28 ps-lg-4">
          <h3 className="eng-display-xl text-primary mb-12">Contact</h3>
          <p className="cn-heading-h4 text-primary mb-20 mb-lg-12">台北信義店</p>
          <ul className="list-unstyled d-flex align-items-center align-items-lg-start flex-column cn-body-m text-gray-800">
            <li className="d-flex flex-column align-items-center flex-lg-row mb-24 mb-lg-8">
              <p className="cn-body-m-regular text-nowrap mb-4 me-lg-3">門市地址</p>
              <p className="cn-body-m-regular">台北市信義區信義街666街66號1樓</p>
            </li>
            <li className="d-flex flex-column align-items-center flex-lg-row mb-24 mb-lg-8">
              <p className="text-nowrap mb-4 me-lg-3">門市電話</p>
              <p className="cn-body-m-regular">02-2222-222</p>
            </li>
            <li className="d-flex flex-column align-items-center flex-lg-row">
              <p className="text-nowrap mb-4 me-lg-3">營業時間</p>
              <p className="cn-body-m-regular">PM 10:00 - AM 04:00</p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Contact;
