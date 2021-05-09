import Item from './Item'

const Items = ({items, onDelete, onToggle, showEdit}) => {
    return (
        <>
            {items.map((item, index) => (
                <Item 
                    key={index}
                    id={item.id}
                    item={item.item}
                    important={item.important}
                    category={item.category}
                    quantity={item.quantity}
                    onDelete={onDelete}
                    onToggle={onToggle}
                    showEdit={showEdit}
                />
            ))}
        </>
    )
}



export default Items