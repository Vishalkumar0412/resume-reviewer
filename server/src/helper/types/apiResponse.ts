export interface ApiResponse<T=undefined>{
    success:boolean
    message:string
    error?:string | string[] |any
    data?:T | any
}