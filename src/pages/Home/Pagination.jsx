import PropTypes from "prop-types"
import "./pagination.css"

function Pagination(props){

    const max = Math.ceil(props.dataLen/props.PpP);

    const showBtn = (n) => {
        return props.page+n-3 < 0 || props.page+n-3 >= max;
    }

    return(
        <div className="pagination-container">
            {props.page>0 && <button className="page-btn" onClick={() => props.setPage(0)}>{"<<"}</button>}
            {
                [0,1,2,3,4,5,6].map(n => 
                <button className={"page-btn" + ((n==3) ? "-checked":"")} key={n} hidden={showBtn(n)} onClick={() => {
                    props.setPage(props.page+n-3)
                }}>{props.page+n-2}</button>)
            }
            {props.page<max-1 && <button className="page-btn" onClick={() => props.setPage(max-1)}>{">>"}</button>}
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