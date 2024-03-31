export default function PageSelector({page, onChange}){
    return(
        <input type="number" value={page} onChange={onChange} className='form-control text-center' id="page-number"></input>
    )
}