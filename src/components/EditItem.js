import { useState } from 'react'
import DropDown from './DropDown'
import Button from './Button'

const EditItem = ({ selections, currItem, onEdit, onClose}) => {
    const [errmsg, setErrMsg] = useState('') 
    var id = currItem ? currItem.id : null
    const [item, setItem] = useState(currItem ? currItem.item : '')
    const [quantity, setQuantity] = useState(currItem ? currItem.quantity : 1)
    const [important, setImportance] = useState(currItem ? currItem.important : false)
    const [category, setCategory] = useState(currItem ? currItem.category : 'None')

    const onSubmit = (e) => {
        e.preventDefault()
        onClosingForm(e)

        if(!item){
            setErrMsg('Please input an item')
            return  
        }
        onEdit({ id, item, quantity, important, category })
        setErrMsg('')
        id = null
        setItem('')
        setQuantity(1)
        setCategory('None')
        setImportance(false)

    }

    const onClosingForm = (e) => {
        e.preventDefault()
        onClose() 
    }


    return (
        <form className='edit-form' onSubmit={onSubmit}> 
            <h2> 
                {'Edit Item'} <Button color='red' text='Cancel' onClick={onClosingForm}/>
            </h2> 
            <div className='form-control'>
                <label>
                    Item
                </label>
                <input type='text' placeholder='Add Item' 
                value={item} onChange={(e) => { setItem(e.target.value) }}/>
                <span style={{color: 'red'}}> {errmsg} </span>
            </div>
            <div className='form-control'>
                <label>
                    Quantity
                </label>
                <input type='number' defaultValue={quantity} onChange={(e) => { 
                    setQuantity(!e.target.valueAsNumber ? 1 : e.target.valueAsNumber)
                    }}/>
            </div>
            <div className='form-control'>
                <label>
                    Category
                </label>
                <DropDown selected={category} selections={selections} onToggle={ (selected) => { setCategory(selected) }}/>
            </div>
            <div className='form-control'>
                <label>
                    Is it important?
                </label>
                <input 
                    type='checkbox'
                    value={important === "" ? false : true} 
                    onChange={(e) => { 
                        setImportance(!e.currentTarget.checked ? false : true) 
                    }}
                    checked={important}
                    />
            </div>
            <input className='btn btn-block' type='submit' value='Save Item'></input> 
        </form> 
    )
}


export default EditItem