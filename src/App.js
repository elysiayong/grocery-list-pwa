import './App.css';
import Header from './components/Header'
import Items from './components/Items'
import AddItem from './components/AddItem'
import Dexie from 'dexie';
import { useState, useEffect } from 'react';

// Start db
const db = new Dexie('groceries');
db.version(1).stores({
    items: '++id'
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

  const fetchItems = async () => {
    const data = await db.items.toArray()

    return data
  }

  const fetchItem = async (id) => {
    const data = await db.items.get(id)

    return data
  }

  const addItem = async (item) => {
    const item_id = await db.items.add(item)
    const data = await db.items.get(item_id)

    setItems([ ...items, data])
  }

  const deleteItem = async (id) => {
    await db.items.delete(id)

    setItems(items.filter( (item) => item.id !== id))
  }

  const toggleImportant = async (id) => {
    const itemToToggle = await fetchItem(id)
    await db.items.update( itemToToggle.id, {important: !itemToToggle.important})

    setItems(items.map((item) => item.id === id ? 
    { ...item, important: !item.important } : item ))
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
