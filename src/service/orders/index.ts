import http  from "../../plugins/http";


interface postData{
    amount: number|null
    client_phone_number: string;
    client_full_name:string;
    service_id:string;
}

interface getData{
    page:number;
    limit:number;
}

interface UpdateData extends postData{
    id:string;
}

interface Order{
    orderPost : (data:postData)=> any,
    orderDelete : (id:string)=> any,
    orderGet : (data:getData)=> any,
    orderUpdate : (data:UpdateData)=> any,
}



export const order : Order = {
    orderPost: (data)=> http.post("/order" , data),
    orderDelete: (id)=> http.delete(`/order?id=${id}`),
    orderGet: (data)=> http.get(`/order/all?page=${data.page}&limit=${data.limit}`),
    orderUpdate: (data)=> http.put(`/order`, data)
}
