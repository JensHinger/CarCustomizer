import { configurationItem } from "@/lib/data";

export function ConfigurationOption(
    {
        item,
        configurationCategory,
        currentOptionPrice,
        setChosenOption,
        isSelected = false,
    }
    :{
        item: configurationItem
        configurationCategory: string
        currentOptionPrice: number
        setChosenOption: (option: configurationItem) => void
        isSelected: boolean
    }){

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChosenOption(item)
    }
    
    return (
        <div className="my-1">
            <label className={`grid grid-cols-2 p-1 items-center ${isSelected? "bg-zinc-500 hover:bg-zinc-600" : "hover:bg-gray-800"} rounded-sm cursor-pointer`}>
                <div className="flex flex-row items-center">
                    <input type="radio" 
                        name={configurationCategory} 
                        value={item.id} 
                        checked={isSelected}
                        onChange={handleChange}
                        className="hidden"
                    />
                    <p className="m-auto">{item.name}</p>
                </div>               
                <p className="text-center">{(item.price - currentOptionPrice).toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
            </label>
        </div>
    )
}


