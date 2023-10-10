const Pagination = ({page, totalPages, onChange, goButtonOnClick, backButtonOnClick, selectedPokemon}) => {
    return (
        <div style={{display: selectedPokemon ? "none" : "block"}} id="pagination">
            <button onClick ={backButtonOnClick} className='pagination-button' id="back-button">Back</button>
            <input type="number" value={page} onChange={onChange} className='pagination-input' id="page-number"></input>
            <label className='total-pages'>{totalPages}</label>
            <button onClick={goButtonOnClick} className='pagination-button' id="next-button">Go </button> 
        </div>
        
    );
};

export default Pagination;