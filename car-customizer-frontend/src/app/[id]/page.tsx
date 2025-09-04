import { fetchCarConfigurationItems, fetchConfiguration } from "@/lib/data"
import Configurator from "@/components/Configurator"
import Image from "next/image"

export default async function Page(
    {params, searchParams}: 
    {
        params: Promise<{id: string}>
        searchParams: { config_id?: string }
    }
) {

    const {config_id} = await searchParams
    // If config_id is present, fetch the corresponding configuration
    let savedConfig = null;
    if (config_id) {
        savedConfig = await fetchConfiguration(config_id);
    }

    // Load all configuration options for a car
    const carId = (await params).id
    const configurationItems = await fetchCarConfigurationItems(carId)

    const car = configurationItems.car
    const engineSelection = configurationItems.engines
    const colorSelection = configurationItems.colors
    const wheelSelection = configurationItems.wheels
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
            wheelSelection={wheelSelection}
            extrasSelection={extrasSelection}      
            savedConfiguration={savedConfig}
            />
        </div>
        
    )
}