
export async function getPlantInfo(id) {
    try {
        const response = await fetch(`/api/plant/${id}`);
        if (response.ok) {
            return response.json();
        } else {
            console.error("Failed to fetch plant info")
            return {}
        }
    }
    catch (error) {
        console.error(`Failed to fetch plant info ${error}`)
        return {}
    }

}