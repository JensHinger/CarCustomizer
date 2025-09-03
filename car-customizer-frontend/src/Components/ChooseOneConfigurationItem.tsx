import { configurationItem } from "@/lib/data";
import { ConfigurationOption } from "./ConfigurationOption";
import { useEffect, useState } from "react";

export default function ChooseOneConfigurationItem(
    {
        configurationCategory,
        configurationItems,
        selectedItem,
        setSelectedItem,
        updateTotalPrice,
    }:
    {
        configurationCategory: string,
        configurationItems: configurationItem[],
        selectedItem: configurationItem,
        setSelectedItem: (item: configurationItem) => void,
        updateTotalPrice: (change: number) => void,
    }
) {

    const [currentOptionPrice, setCurrentOptionPrice] = useState(selectedItem.price)

    useEffect(() => {
        setCurrentOptionPrice(selectedItem.price);
    }, [selectedItem]);

    const handleOptionChange = (item: configurationItem) => {
        setSelectedItem(item)
        setCurrentOptionPrice(item.price)
        updateTotalPrice(item.price - currentOptionPrice)
    }

    return (
        <div>  
            <h1 className="text-center p-3">
                {configurationCategory}
            </h1>
            {configurationItems.map((item: configurationItem) => {
                return (
                    <ConfigurationOption 
                        key={item.id}
                        item={item}
                        configurationCategory={configurationCategory.toLowerCase()}
                        currentOptionPrice={currentOptionPrice}
                        setChosenOption={handleOptionChange}
                        isSelected={selectedItem.id === item.id}
                    />
                )
            })}
        </ div>
    )
}