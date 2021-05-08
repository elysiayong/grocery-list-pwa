import { useState } from 'react'
import DropDown from './DropDown'

const AddItem = ({ selections, onAdd }) => {
    const [errmsg, setErrMsg] = useState('') 
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [important, setImportance] = useState('')
    const [category, setCategory] = useState('None')

    const onSubmit = (e) => {
        e.preventDefault()
        
        if(!item){
            setErrMsg('Please input an item')
            return  
        }
        // if(item.length > 50){
        //     setErrMsg('Item description too long! Maximum 50 characters')
        //     return
        // }
        

        onAdd({ item, quantity, important, category })
        setErrMsg('')
        setItem('')
        setQuantity(1)
        setCategory('None')
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
                <span style={{color: 'red'}}> {errmsg} </span>
            </div>
            <div className='form-control'>
                <label>
                    Quantity
                </label>
                <input type='number' defaultValue={1} onChange={(e) => { 
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


export default AddItem