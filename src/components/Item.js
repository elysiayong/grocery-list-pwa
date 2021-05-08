import { FaTimes } from 'react-icons/fa'

const Item = ({ id, item, important, quantity, category, onDelete, onToggle}) => {
    return (
        <div className={`item ${important ? 'important' : ''}`} 
        onDoubleClick={ () => onToggle(id)}>
            <span>
                <h3> 
                    {item} 
                </h3>
                <FaTimes 
                        style={{ color: 'red', cursor: 'pointer'}} 
                        onClick={ () => onDelete(id)}/>
            </span>
            { category !== 'None' ? <p> {category} </p> : ''}
            <p> {"Amount: " + quantity} </p>
        </div>
    )
}


export default Item