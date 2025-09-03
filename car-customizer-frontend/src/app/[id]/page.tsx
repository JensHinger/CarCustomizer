import { fetchCarById, fetchCarConfigurationItems } from "@/lib/data"
import Configurator from "@/Components/Configurator"
import Image from "next/image"

export default async function Page(
    {params}: 
    {params: Promise<{id: string}>}
) {

    // Load all configuration options for a car

    const carId = (await params).id
    const configurationItems = await fetchCarConfigurationItems(carId)
    const car = await fetchCarById(carId)

    const engineSelection = configurationItems.engines
    const colorSelection = configurationItems.colors
    const rimSelection = configurationItems.rims
    const extrasSelection = configurationItems.extras

    return (
        <div className="grid grid-cols-2 mt-10">
            <Image
                className="m-auto"
                width={600} 
                height={400} 
                src="https://placehold.co/600x400.png" 
                alt="Placeholder Image"/>

            <Configurator
            car={car}
            engineSelection={engineSelection}
            colorSelection={colorSelection}
            rimSelection={rimSelection}
            extrasSelection={extrasSelection}      
            />
        </div>
        
    )
}