"use client"

import { Car, configurationItem } from "@/lib/data"
import ChooseOneConfigurationItem from "./ChooseOneConfigurationItem"
import ChooseMultipleConfigurationItem from "./ChooseMultipleConfigurationItem"
import { handleConfigFormSubmit } from "@/lib/actions"
import { useActionState, useEffect, useState } from "react"
import Link from "next/link"

export default function Configurator(
    {
        car,
        engineSelection,
        colorSelection,
        wheelSelection,
        extrasSelection,
        savedConfiguration
    }
    :{
        car: Car
        engineSelection: configurationItem[]
        colorSelection: configurationItem[]
        wheelSelection: configurationItem[]
        extrasSelection: configurationItem[]
        savedConfiguration?: {
            engine_id: number;
            color_id: number;
            wheel_id: number;
            extra_ids: number[]
        } | null
    }
) {

    const [state, formAction, isPending] = useActionState(handleConfigFormSubmit, null)
    
    const [carPrice, setCarPrice] = useState<number>(car.price)
    const [currentStep, setCurrentStep] = useState(savedConfiguration? 4: 0);
    const maxStep = 4 // Should not necessarily be hard coded

    const checkConfiguration = (selection: configurationItem[], id: number) => {
        return selection.find((e) => e.id === id) || selection[0]
    }

    const [selectedEngine, setSelectedEngine] = useState<configurationItem>(savedConfiguration? checkConfiguration(engineSelection, savedConfiguration.engine_id): engineSelection[0])
    const [selectedColor, setSelectedColor] = useState<configurationItem>(savedConfiguration? checkConfiguration(colorSelection, savedConfiguration.color_id): colorSelection[0])
    const [selectedWheels, setSelectedWheels] = useState<configurationItem>(savedConfiguration? checkConfiguration(wheelSelection, savedConfiguration.wheel_id): wheelSelection[0])
    const [selectedExtras, setSelectedExtras] = useState<configurationItem[]>(savedConfiguration? extrasSelection.filter((e) => savedConfiguration.extra_ids.includes(e.id)): [])

    const handleConfigurationSwitch = (change: number) => {
        if (currentStep + change < 0 || currentStep + change > maxStep){
            return
        }
        setCurrentStep(currentStep + change)
    }

    const orderButtonDisabled = isPending || state?.message == "order-success"
    const saveButtonDisable = isPending || state?.message == "save-success" || orderButtonDisabled

    useEffect(() => {
        const totalPrice = car.price +
            selectedEngine.price +
            selectedColor.price +
            selectedWheels.price +
            selectedExtras.reduce((sum, extra) => sum + extra.price, 0)

        setCarPrice(totalPrice)
    }, [selectedEngine, selectedColor, selectedWheels, selectedExtras])

    return (
         <form 
            action={formAction}
            className="w-md float-right mx-auto"
         >
            <input 
                type="hidden" 
                name="car"
                value={car.id} />
            <div className={currentStep == 0? "": "hidden"}>
                <ChooseOneConfigurationItem
                configurationCategory="Engine"
                configurationItems={engineSelection}
                selectedItem={selectedEngine}
                setSelectedItem={setSelectedEngine}
                />
            </div>
                
            <div className={currentStep == 1? "": "hidden"}>
                <ChooseOneConfigurationItem 
                configurationCategory="Color"
                configurationItems={colorSelection}
                selectedItem={selectedColor}
                setSelectedItem={setSelectedColor}
                />
            </div>
            <div className={currentStep == 2? "": "hidden"}>
                <ChooseOneConfigurationItem 
                configurationCategory="Wheel"
                configurationItems={wheelSelection}
                selectedItem={selectedWheels}
                setSelectedItem={setSelectedWheels}
                />
            </div>
            <div className={currentStep == 3? "": "hidden"}>
                <ChooseMultipleConfigurationItem 
                configurationCategory="Extras"
                configurationItems={extrasSelection}
                selectedItems={selectedExtras}
                setSelectedItems={setSelectedExtras}
                />
            </div>
            <div className={`space-y-4 grid grid-cols-2 ${currentStep == 4? "": "hidden"}`}>
                <h2 className="text-xl font-bold col-span-2 text-center">Your Configuration</h2>
                <p>Engine:</p> <p>{selectedEngine.name}</p>
                <p>Color:</p> <p> {selectedColor.name}</p>
                <p>Wheels:</p> <p> {selectedWheels.name}</p>
                <p>Extras:</p>
                <ul>{selectedExtras.length > 0?
                    selectedExtras.map(item => 
                        <li key={item.id}>{item.name}</li>
                    )
                    : " Keine"
                }
                </ul>
            </div>
            
            <div className="flex flex-row mt-3">
                {currentStep > 0 && <button type="button" className="mr-auto py-2 px-3 rounded-md text-xl cursor-pointer hover:bg-slate-800" onClick={() => handleConfigurationSwitch(-1)}>&lt;</button>}
                {currentStep < maxStep && <button type="button" className="ml-auto py-2 px-3 rounded-md text-xl cursor-pointer hover:bg-slate-800" onClick={() => handleConfigurationSwitch(1)}>&gt;</button>}
            </div>
            <hr className="my-4"/>
            <div className="grid grid-cols-2 p-5">
                <p className="text-xl font-semibold">Total Price: </p>
                <p className="text-center text-xl">{carPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
            </ div>
            
            {currentStep == 4 &&
                <>
                    <button
                        className={`w-full bg-green-900 text-white font-medium py-2 px-4 rounded-lg transition my-5 ${orderButtonDisabled? "cursor-not-allowed": "hover:bg-green-800 focus:ring-2 focus:ring-gray-500 cursor-pointer"}`}
                        type="submit" 
                        value="place-order" 
                        name="action"
                        disabled={orderButtonDisabled}>
                        Place Order
                    </button>
                    <button
                        className={`w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-lg transition ${saveButtonDisable? "cursor-not-allowed": "hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 cursor-pointer"}`}
                        type="submit"
                        value="save-configuration"
                        name="action"
                        disabled={saveButtonDisable}>
                        Save current Configuration
                    </button>
                </>
            }
            <div>
                {isPending? "...Loading": state?.error}
            </div>
            {state?.configuration_url? 
            <div className="font-bold text-center mt-5">
                <Link href={state.configuration_url}>Click to see your saved Configuration</Link>
            </div> : ""}
            {state?.order_id?            
            <div className="font-bold text-center mt-5 text-green-500">
                Order was placed Successfully with the order Number: {state.order_id}
            </div> : ""}

        </ form>
    )
}