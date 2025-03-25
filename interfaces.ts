export interface ShopItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  imageURL: string,
  opentime: string,
  closetime: string,
  __v: number,
  id: string
}
  
export interface ShopJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: ShopItem[]
  }

export  interface ReservationItem {
    id:string
    user: string;
    massageshop: string;
    reservDate: string;
  }