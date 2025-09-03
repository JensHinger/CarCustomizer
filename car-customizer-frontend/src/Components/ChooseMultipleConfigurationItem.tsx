"use client"

import { configurationItem } from "@/lib/data"
import { useState } from "react";

export default function ChooseMultipleConfigurationItem(  
    {
        configurationCategory,
        configurationItems,
        selectedItems,
        setSelectedItems,
    }:
    {
        configurationCategory: string,
        configurationItems: configurationItem[]
        selectedItems: configurationItem[]
        setSelectedItems: (item: configurationItem[]) => void
    }) {

    // To Show Message Allowing maximum selection of 5 items
    const [status, setStatus] = useState("");

    const handleSelection = (e: React.ChangeEvent<HTMLInputElement >) => {
        setStatus("")
        const target = e.target
        // Get the current item's information (e.g. price)
        const item: configurationItem = configurationItems.filter(
            (item: configurationItem) => item.id == Number(target.value))[0]

        // Deselect option
        if (selectedItems.includes(item)){
            setSelectedItems(selectedItems.filter((elem) => elem != item))
        } else {
            // Select option
            if (selectedItems.length < 5){
                setSelectedItems([item, ...selectedItems])
            } else {
                // Too many options selected
                target.checked = false
                setStatus("Only 5 Extras are selectable!")
            }
        }
    }

    return (
        <div>
            <h1 className="text-center p-3">
                {configurationCategory}
            </h1>
            {
                configurationItems.map((item) => {
                    const currentItemSelected = selectedItems.find((sel_item) => item.id == sel_item.id) != undefined
                    console.log(currentItemSelected, item.name)
                    console.log(selectedItems, item)
                    return  (
                        <div key={item.id} >
                            <label className={`grid grid-cols-2 p-1 items-center rounded-sm cursor-pointer text-center ${currentItemSelected? "bg-zinc-500 hover:bg-zinc-600" : "hover:bg-gray-800"}`}>
                                <div>
                                    <input
                                        name={configurationCategory.toLowerCase()}
                                        type="checkbox"
                                        value={item.id}
                                        onChange={handleSelection}
                                        defaultChecked={currentItemSelected}
                                        className="hidden"
                                    />
                                    <p>{item.name}</p>
                                </div>
                                <p className="text-center">{item.price.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
                        
                            </label>
                        </ div> 
                    )
                })
            }
            {status? <p className="text-red-400 text-lg text-center">{status}</p>: null}
        </div>
    )

}