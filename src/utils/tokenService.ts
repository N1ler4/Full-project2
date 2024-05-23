import Cookies from "js-cookie"

export const getDataFromCookie = (title: string) => {
  return Cookies.get(title);
};
export const saveDataFromCookie = (title: any , value:any) => {
    Cookies.set(title , value)
}
export const getValueFromCookie = (value: any) => {
  return Cookies.get(value);
}
export const isAunthenticated = ():boolean =>{
  return !!getDataFromCookie("token")
}