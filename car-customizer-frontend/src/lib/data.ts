import { readFile } from "fs/promises";
import { tree } from "next/dist/build/templates/app-page";

const data = JSON.parse(await readFile("./src/data/dummyData.json", "utf8"))

export type configurationItem = {
    id: number,
    name: string,
    price: number
}

export type Car = {
    id: number;
    name: string;
    basePrice: number;
    engines?: configurationItem[];
    colors?: configurationItem[];
    rims?: configurationItem[];
    extras?: configurationItem[];
}

export async function fetchCarById(id: string): Promise<Car>{
    const carData = data["cars"].filter((car: Car) => {
        if (car.id == Number(id)){
            return true
        }
    })[0]

    const car = {
        id: carData.id,
        name: carData.name,
        basePrice: carData.basePrice,
    }

    return car
}

export async function fetchCars(): Promise<Car[]>{
    const availableCars: Car[] = data["cars"].map((car: Car) => {
        return {
            id: car.id,
            name: car.name,
            basePrice: car.basePrice
        }
    })

    return availableCars
}

export async function fetchCarConfigurationItems(id: string){
    const car = data["cars"].filter((car: Car) => {
        if (car.id == Number(id)) {
            return true
    }})[0]

    const availableConfigurationItems = {
        engines: car.engines,
        rims: car.rims,
        colors: car.colors,
        extras: car.extras
    }

    return availableConfigurationItems
}
