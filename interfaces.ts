export interface ShopItem {
  _id: string,
  name: string,
  address: string,
  tel: string,
  picture: string,
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
    nameLastname: string;
    tel: string;
    shop: string;
    bookDate: string;
  }