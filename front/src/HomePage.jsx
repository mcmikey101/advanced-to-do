import { useEffect, useState } from "react"


function Interaction(props) {
    if (props.loggedin) {
        return (
            <>
                <input maxLength={200} id='elinput' onChange={(e) => props.updateItem(e)} type='text' placeholder="Add Item"/>
                <button className="adder" onClick={() => props.addItem()}>Add Item</button>
                <button onClick={() => props.delItem()}>Clear List</button>
            </>
        )
    } else {
        return (
            <p className="warning">Please log in to check your notes.</p>
        )
    }
}

function HomePage(props) {


    const [items, setItems] = useState([])
    const [inputItem, setInputItem] = useState('')


    async function getItems() {
        const req = await fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify({login: props.login, type: 'getItems'}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await req.json()
        let arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push([data[i].id, data[i].items])
        }
        setItems(arr)
    }

    function updateList() {
        if (props.login) {
            getItems()
        }
    }
    useEffect(() => {
        updateList()
    }, [])
    function updateItem(e) {
        setInputItem(e.target.value)
    }
    function setNativeValue(element, value) {
        let lastValue = element.value;
        element.value = value;
        let event = new Event("input", { target: element, bubbles: true });
        event.simulated = true;
        let tracker = element._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        element.dispatchEvent(event);
      }
    
    async function addItem() {
        if (props.login) {
            const req = await fetch('http://localhost:3000/addItem', {
                method: 'POST',
                body: JSON.stringify({login: props.login, type: 'addItem', item: inputItem, id: String(Date.now())}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            getItems()
            setInputItem('')
            setNativeValue(elinput, "")
        }
    }

    async function clear() {
        if (props.login) {
            const req = await fetch('http://localhost:3000', {
                method: 'POST',
                body: JSON.stringify({login: props.login, type: 'clear'}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            getItems()
            setNativeValue(elinput, "")
        }
    }
    async function delItem(id) {
        const req = await fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify({login: props.login, type: 'delItem', id: id}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        getItems()
        setNativeValue(elinput, "")
    }
    return (
        <div className="homecont"> 
            <div className="inputs">
                <p className="home">Home</p>
                <div className="notes">
                    {items.map((el) => 
                        <div key={el[0]} className="item">
                            <p>{el[1]}</p>
                            <button onClick={() => delItem(el[0])} className="elbtn">
                                <svg className="binsvg" xmlns="http://www.w3.org/2000/svg" fill="#000000" width="2vw" height="2vh" viewBox="0 0 48 48" data-name="Layer 1" id="Layer_1"><title/><path d="M42,3H28a2,2,0,0,0-2-2H22a2,2,0,0,0-2,2H6A2,2,0,0,0,6,7H42a2,2,0,0,0,0-4Z"/><path d="M39,9a2,2,0,0,0-2,2V43H11V11a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V11A2,2,0,0,0,39,9Z"/><path d="M21,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/><path d="M31,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/></svg>
                            </button>
                        </div>
                    )}
                </div>
                <Interaction loggedin={props.login} addItem={addItem} delItem={clear} updateItem={updateItem}/>
            </div>
        </div>
    )
}

export default HomePage