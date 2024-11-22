
export const ApiStore = {
    api: "http://localhost:5000/",
    possibleEndpoints:[],
    mergeEndpoint: (endpoint:string)=>{
        return ApiStore.api + ApiStore.possibleEndpoints.filter((value)=>value == endpoint)
    }
}