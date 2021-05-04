import './App.css';
import Header from './components/Header'
import Items from './components/Items'
import AddItem from './components/AddItem'
import Dexie from 'dexie';
import { useState, useEffect } from 'react';

// Start db
const db = new Dexie('groceries');
db.version(1).stores({
    items: "++id"
});

db.version(2).stores({
    items: "++id,important"
});

function App() {
  const [showAddItem, setShowAddItem] = useState(false)
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
    const data = await fetchItems()

    setItems(data)
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
    const data = await fetchItems()

    setItems(data)
  }

  return (
    <div className="container">
      <Header title="Grocery List" onAdd={() => setShowAddItem(!showAddItem)} showAdd={showAddItem} />
      {showAddItem && <AddItem onAdd={addItem}/>}
      {
        items.length > 0 ?
        (<Items items={items} 
          onDelete={deleteItem} 
          onToggle={toggleImportant}
          />)
        : ('No things to buy')
      }
    </div>
  );
}

export default App;
