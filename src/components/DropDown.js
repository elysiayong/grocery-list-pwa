import { useState } from 'react'
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'

const DropDown = ({ text, selected, selections, onToggle }) => {
    const [isDrop, setDrop] = useState(false)

    return (
        <div className='dd-wrapper'> 
            <button className='dd-header' 
            onClick={ (e) => { e.preventDefault(); setDrop(!isDrop) } }
            >
                {(text ? text : "") + selected + " "}
                { isDrop
                ? <FaAngleUp />
                : <FaAngleDown /> }
            </button>
            { isDrop && 
                <div role='list' className='dd-list'>
                    { selections.map( (selection, index) => (
                        <button key={index} className='dd-list-content' onClick={ (e) => { e.preventDefault(); onToggle(selection); setDrop(!isDrop) }}>
                            {selection}
                        </button>
                    ) ) }
                </div>
            }


        </div>

    )
}


export default DropDown