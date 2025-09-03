"use server"

type configurationForm = {
    engine: string,
    color: string,
    wheels: string,
    extras?: string[]
}

export async function handleConfigFormSubmit(state: configurationForm, formData: FormData){
    var object: Record<string, any> = {};
    formData.forEach((value, key) => {
        if (!object.hasOwnProperty(key)){
            object[key] = value;
            return;
        }
        if (!Array.isArray(object[key])){
            object[key] = [object[key]]
        }
        object[key].push(value);

    });


    var json = JSON.stringify(object)
    // Logic for Ordering or creating config is done in backend
    try {
        const res = await fetch(process.env.BACKENDURL + "/configuration", 
            {
                headers: {"content-type": "application/json"},
                method: "POST",
                body:json,
            }
        )
        const answer = await res.json()
        return answer
    } catch (e){
        console.error(e)
        return {
            "error": "Something went wrong"
        }   
    }
}