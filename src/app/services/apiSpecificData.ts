
export const ApiStore = {
    api: "http://localhost:5000/",
    possibleEndpoints:["auth","products","cart","comments","favorites","psw_ret","orders","product_request","user"],
    mergeEndpoint: (endpoint:string,...points:string[])=>{
        return ApiStore.api + ApiStore.possibleEndpoints.find((value)=>value == endpoint) + "/" + points.join("/")
    }
}