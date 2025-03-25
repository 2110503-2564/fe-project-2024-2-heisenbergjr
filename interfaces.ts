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

  export interface User {
    id: string;
    name: string;
    email: string;
  }
  
  export interface MassageShop {
    _id: string;
    name: string;
    address: string;
    tel: string;
    opentime: string;
    closetime: string;
  }
  
  export interface ReservationItem {
    id: string;
    user: User;  
    massageshop: MassageShop; 
    reservDate: string;
    _id: string;
  }
  