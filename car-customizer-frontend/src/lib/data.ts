import { readFile } from "fs/promises";
import { tree } from "next/dist/build/templates/app-page";

require("dotenv").config({path: "../.env"})

//const data = JSON.parse(await readFile("./src/data/dummyData.json", "utf8"))

export type configurationItem = {
    id: number,
    name: string,
    price: number
}

export type Car = {
    id: number;
    name: string;
    price: number;
    engines?: configurationItem[];
    colors?: configurationItem[];
    wheels?: configurationItem[];
    extras?: configurationItem[];
}

export async function fetchCarById(id: string): Promise<Car>{
    const res = await fetch(process.env.BACKENDURL + `/${id}`)

    if (!res.ok) {
        throw new Error(`Failed to fetch car with the id ${id}`);
    }

    const data = await res.json()

    const car = {
        id: data.id,
        name: data.name,
        price: data.price,
    }

    return car
}

export async function fetchCars(): Promise<Car[]>{
    const res = await fetch(process.env.BACKENDURL + `/car`)

    if (!res.ok) {
        throw new Error(`Failed to fetch all cars`);
    }
    
    const data = await res.json()
    
    const availableCars: Car[] = data.map((car: Car) => {
        return {
            id: car.id,
            name: car.name,
            price: car.price
        }
    })

    return availableCars
}

export async function fetchCarConfigurationItems(id: string){

    const res = await fetch(process.env.BACKENDURL + `/car/config/${id}`)

    if (!res.ok) {
        throw new Error(`Failed to fetch configuration Items for car with the id ${id}`);
    }

    const data = await res.json()
    
    const availableConfigurationItems = {
        car: data.car,
        engines: data.engines,
        wheels: data.wheels,
        colors: data.colors,
        extras: data.extras
    }

    return availableConfigurationItems
}

export async function fetchConfiguration(configId: string) {
    const res = await fetch(process.env.BACKENDURL + `/configuration/${configId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch configuration');
    }
    return res.json();
}