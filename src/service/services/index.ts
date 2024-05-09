import http  from "../../plugins/http";


interface postData{
    name: string;
    owner_id: string|null;
    price:number |string
}

interface getData{
    page:number;
    limit:number;
    id:string
}

interface UpdateData extends postData{
    id:string;
}

interface Services{
    servicesPost : (data:postData)=> any,
    servicesDelete : (id:string)=> any,
    servicesGet : (data:getData)=> any,
    servicesUpdate : (data:UpdateData)=> any,
}



export const services:Services = {
    servicesPost: (data)=> http.post("/service" , data),
    servicesDelete: (id)=> http.delete(`/service?id=${id}`),
    servicesGet: (data)=> http.get(`/service/all?page=${data.page}&limit=${data.limit}&owner_id=${data.id}`),
    servicesUpdate: (data)=> http.put(`/service`, data)
}
