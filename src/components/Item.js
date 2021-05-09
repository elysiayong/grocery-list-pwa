import { FaTimes } from 'react-icons/fa'
import ClickNHold from 'react-click-n-hold'

const Item = ({ id, item, important, quantity, category, onDelete, onToggle, showEdit}) => {

    const end = (e, enough) => {
        if(enough) showEdit(id)
    }

    return (
        <ClickNHold
            time={0.5}
            onClickNHold={end}>
            <div className={`item ${important ? 'important' : ''}`} 
            onDoubleClick={ () => onToggle(id)}>
                <span>
                    <h3> 
                        {item} 
                    </h3>
                    <FaTimes 
                            style={{ color: 'red', cursor: 'pointer'}} size='20px' 
                            onClick={ () => onDelete(id)}/>
                </span>
                { category !== 'None' ? <p> {category} </p> : ''}
                <p> {"Amount: " + quantity} </p>
            </div>
        </ClickNHold>
    )
}


export default Item