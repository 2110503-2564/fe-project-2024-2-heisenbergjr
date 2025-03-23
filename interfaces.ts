export interface VenueItem {
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
  
export interface VenueJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: VenueItem[]
  }

export  interface BookingItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }