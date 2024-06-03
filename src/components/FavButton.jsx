import addFav from '/assets/icons/add-to-favs.svg';
import removeFav from '/assets/icons/remove-favs.svg';

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
                <div className="btn-favourite" onClick={handleRemoveFav}>
                    <img src={removeFav} alt="remove from fav button" />
                </div>
            :
                <div className="btn-favourite" onClick={handleAddFav}>
                    <img src={addFav} alt="add to fav button" />
                </div>} 
        </>
    );
    
}

export default FavButton;