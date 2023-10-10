const Loading = ({loading}) => {
    return(
        <h1 className='loading'>{(loading ? "Cargando...": "")}</h1>
    );
};

export default Loading;

