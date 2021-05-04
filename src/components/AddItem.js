import { useState } from 'react'

const AddItem = ({ onAdd }) => {
    const [errmsg, setErrMsg] = useState('') 
    const [item, setItem] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [important, setImportance] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!item){
            setErrMsg('Please input an item')
            return  
        }

        onAdd({ item, quantity, important })
        setErrMsg('')
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
                <span style={{color: 'red'}}> {errmsg} </span>
            </div>
            <div className='form-control'>
                <label>
                    Quantity
                </label>
                <input type='number' defaultValue={1} onChange={(e) => { 
                    e.target.valueAsNumber ? setQuantity(e.target.valueAsNumber) : setQuantity(1)
                    }}/>
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