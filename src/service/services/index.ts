import http  from "../../plugins/http";


interface postData{
    name: string;
    owner_email: string|null;
    price:number |string
}

interface getData{
    page:number;
    limit:number;
    owner_email:string|null|undefined;
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
    servicesPost: (data)=> http.post("/service/create" , data),
    servicesDelete: (id)=> http.delete(`/service?id=${id}`),
    servicesGet: (data)=> http.get(`/service/get-all?page=${data.page}&limit=${data.limit}&owner_email=${data.owner_email}`),
    servicesUpdate: (data)=> http.put(`/service/update`, data)
}