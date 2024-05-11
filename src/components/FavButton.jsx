function FavButton({ movie, remove, handleFavClick }) {

    function handleAddFav(){
        handleFavClick(true, movie);
    }

    function handleRemoveFav(){
        handleFavClick(false, movie);
    }

    return (
        <>
            {remove === true 
            ? 
                <button className="btn-favourite" onClick={handleRemoveFav}><i className="fas fa-heart"></i></button>
            :
                <button className="btn-favourite" onClick={handleAddFav}><i className="far fa-heart"></i></button>} 
        </>
    );
    
}

export default FavButton;