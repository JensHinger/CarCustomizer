"use server"

type configurationForm = {
    engine: string,
    color: string,
    wheels: string,
    extras?: string[]
}

export async function handleConfigFormSubmit(state: configurationForm, formData: FormData){
    console.log(formData)
    const engine = formData.get("engine")
    const color = formData.get("color")
    const wheels = formData.get("wheels")
    const extras = formData.getAll("extras")
    const action = formData.get("action")

    console.log(engine)
    console.log(color)
    console.log(wheels)
    console.log(extras)
    console.log(action)

    // Based on action either only create configuration otherwise also create order
    if(true){
        return {
            message: "order-success"
        }
    } else {
        return {
            error: "Something went wrong!"
        }
    }
}