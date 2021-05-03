import { useState } from 'react'

const AddItem = ({ onAdd }) => {
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [important, setImportance] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!item){
            alert('Add task')
            return
        }

        onAdd({ item, quantity, important })
        setItem('')
        setQuantity(1)
        setImportance(false)

    }

    return (
        <form className='add-form' onSubmit={onSubmit}> 
            <div className='form-control'>
                <label>
                    Item
                </label>
                <input type='text' placeholder='Add Item' 
                value={item} onChange={(e) => { setItem(e.target.value) }}/>
            </div>
            <div className='form-control'>
                <label>
                    Quantity
                </label>
                <input type='number' defaultValue={1} onChange={(e) => { setQuantity(e.target.valueAsNumber) }}/>
            </div>
            <div className='form-control'>
                <label>
                    Is it important?
                </label>
                <input 
                    type='checkbox'
                    value={important === "" ? false : true} 
                    onChange={(e) => { 
                        setImportance(e.currentTarget.checked) 
                    }}
                    checked={important}
                    />
            </div>
            <input className='btn btn-block' type='submit' value='Save Item'></input> 
        </form> 
    )
}


export default AddItem