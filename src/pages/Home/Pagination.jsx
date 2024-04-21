import PropTypes from "prop-types"

function Pagination(props){

    const max = Math.ceil(props.dataLen/props.PpP);

    const showBtn = (n) => {
        return props.page+n-3 < 0 || props.page+n-3 >= max;
    }

    return(
        <div className="flex justify-center items-center gap-3 my-4">
            {props.page>0 && 
            <button className="btn-page" 
            onClick={() => props.setPage(0)}>
                {"<<"}
            </button>}
            {
                [0,1,2,3,4,5,6].map(n => 
                <button key={n}
                disabled={n==3}
                className={`${showBtn(n) ? "hidden": ""} btn-page`} 
                onClick={() => {
                    props.setPage(props.page+n-3)
                }}>
                    {props.page+n-2}
                </button>)
            }
            {props.page<max-1 && 
            <button 
            className="btn-page" 
            onClick={() => props.setPage(max-1)}>
                {">>"}
            </button>}
        </div>
    )
    
}

Pagination.propTypes = {
    page: PropTypes.number,
    setPage: PropTypes.func,
    PpP: PropTypes.number,
    dataLen: PropTypes.number,
}

export default Pagination