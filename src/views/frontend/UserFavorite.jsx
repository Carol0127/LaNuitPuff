import FavoriteCard from "../../components/FavoriteCard";

function UserFavorite() {
  return (
    <>
      <h3 className="eng-heading-italic-h1 text-primary mb-28">/ Favorites</h3>
      <div className="bg-white p-lg-32 border">
        <div className="row g-16 g-lg-24">
          <FavoriteCard />
        </div>
      </div>
    </>
  );
}

export default UserFavorite;
