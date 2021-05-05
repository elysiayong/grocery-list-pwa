import Item from './Item'

const Items = ({items, onDelete, onToggle}) => {
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
                />
            ))}
        </>
    )
}



export default Items