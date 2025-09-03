import { Car, fetchCars } from "@/lib/data";
import Link from "next/link";

export default async function Header() {
    
    const cars = await fetchCars()

    return (
        <div className="flex flex-row ">
            <Link href={"/"} className="p-5 my-auto ml-3 rounded-lg hover:bg-slate-500">
                <h1 className="text-xl">Car Brand</h1>
            </Link>
            <div className="mx-5 flex flex-row">
                {cars.map((car: Car) => 
                    <Link key={car.id} className="border rounded-md flex flex-col p-2 m-2 hover:bg-slate-500" href={`/${car.id}`}>
                        <p>{car.name}</p>
                        <p>ab {car.price.toLocaleString("de-DE", { style: "currency", currency: "EUR" })}</p>
                    </Link>
                )}
            </div>
           
        </div>
    )
}