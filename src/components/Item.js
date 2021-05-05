import { FaTimes } from 'react-icons/fa'

const Item = ({ id, item, important, quantity, category, onDelete, onToggle}) => {
    return (
        <div className={`item ${important ? 'important' : ''}`} 
        onDoubleClick={ () => onToggle(id)}>
            <h3> 
                {item} 
                <FaTimes 
                    style={{ color: 'red', cursor: 'pointer'}} 
                    onClick={ () => onDelete(id)}/>
            </h3>
            { category !== 'None' ? <p> {category} </p> : ''}
            <p> {"Amount: " + quantity} </p>
        </div>
    )
}


export default Item