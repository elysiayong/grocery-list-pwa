import './App.css';
import Header from './components/Header'
import DropDown from './components/DropDown'
import Items from './components/Items'
import AddItem from './components/AddItem'
import EditItem from './components/EditItem'
import Dexie from 'dexie';
import { useState, useEffect } from 'react';

// Start db
const db = new Dexie('groceries');
db.version(1).stores({
    items: "++id"
});

db.version(2).stores({
    items: "++id,important"
}).upgrade (trans => {
    return trans.items.toCollection().modify ( item => {
        item.category = item.category ? item.category : "None";
    });
});


function App() {
  const [showAddItem, setShowAddItem] = useState(false)
  const [selected, setSelected] = useState('None') 
  const [showEditItem, setShowEditItem] = useState(false)
  const [currentItem, setCurrentItem] = useState(null)
  const selections = [
    "None",
    "Grains & Pasta",
    "Fruits",
    "Vegetables",
    "Meat & Seafood",
    "Bread & Pastry",
    "Cleaning Supplies",
    "Healthcare",
    "Other"
  ]
  const [items, setItems] = useState([])

  useEffect(() => {
    const getItems = async () => {
      const serverItems = await fetchItems()
      setItems(serverItems)
    }

    getItems()
  }, [])

  const isDefined = (variable) => {
    if(!variable){
      console.log("Error: undefined object")
      return false
    }
    return true
  }

  const fetchItems = async () => {
    const data = await db.items.where('id').above(0).reverse().sortBy('important')

    return data
  }

  const fetchItem = async (id) => {
    // fail with logged output
    if(!isDefined(id)) return
    const data = await db.items.get(id)

    return data
  }

  const addItem = async (item) => {
    if(!isDefined(item)) return
    
    await db.items.add(item)
    await toggleFilter(selected)
  }

  const editItem = async (itemToEdit) => {
    if(!isDefined(itemToEdit)) return

    await db.items.update( itemToEdit.id, {
      item: itemToEdit.item,
      quantity: itemToEdit.quantity,
      category: itemToEdit.category,
      important: itemToEdit.important
    })
    await toggleFilter(selected);
  }

  const deleteItem = async (id) => {
    if(!isDefined(id)) return
    await db.items.delete(id)

    setItems(items.filter( (item) => item.id !== id))
  }

  const toggleImportant = async (id) => {
    const itemToToggle = await fetchItem(id)
    if(!isDefined(itemToToggle)) return

    await db.items.update( itemToToggle.id, {important: !itemToToggle.important})
    await toggleFilter(selected);
  }
  
  const toggleFilter = async (selection) => {    
    setSelected(selection)
    const data = await fetchItems()
    selection === 'None' ? 
    setItems(data) :
    setItems(data.filter( (item) => item.category === selection))
    
  }

  const toggleEdit = async (id) => {
    // get item info from db
    const item = await fetchItem(id)
    if(!isDefined(item)) return

    setCurrentItem(item)
    setShowEditItem(!showEditItem)

  }

  return (
    <div className="container">
      {showEditItem && <EditItem selections={selections} currItem={currentItem} onEdit={editItem} onClose={ () => setShowEditItem(!showEditItem) } />}
      <Header title="Grocery List" onAdd={() => setShowAddItem(!showAddItem)} showAdd={showAddItem} />
      {showAddItem && <AddItem selections={selections} onAdd={addItem}/>}
      <DropDown text={"Filter: "} selected={selected} selections={selections} onToggle={toggleFilter}/>
      { 
        items.length > 0 ?
        (<Items items={items} 
          onDelete={deleteItem} 
          onToggle={toggleImportant}
          showEdit={toggleEdit}
          />)
        : ('No things to buy')
      }
    </div>
  );
}

export default App;
