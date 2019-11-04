import { EmailValidator } from '@angular/forms';

export class Issue {
  id: number;
  title: string;
  state: string;
  url: string;
  created_at: string;
  updated_at: string;
}


export class ServiceRequest{
  // id:number;
  // name:string;
  // email:string;
  // profilePicture: string;
  // policy: string;
  // deviceName: string;
  // deviceImages:string[];
  // description:string;
  requestId: number;
  consumer : Consumer;
  appliance : Appliance;
  service :string;
  requestDescription :string;
  images : [];
  appointmentDateTime :string;
  policy:string;
  profilePicture :string;
}

export class Consumer{
  consumerId :number;
  consumerName:string;
  propertyAdrress: string;
  lat: string;
  long:string;
}
export class Appliance{
  applianceId:number;
  applianceName :string;

}

export class yelpResponse{
  businesses : businesses[];
}

export class businesses{
  image_url : string;
  display_phone :string;
  rating :number;
  coordinates : coordinates;
  name:string;
  distance :number;
  location : location;
}
export class coordinates{
  latitude :string;
  longitude :string;
}
export class location{
 country :string;
 address2 :string;
 address1:string;
 state:string;
 zip_code:string;
 address3 :string;
 city: string;
}
// export class Profile{
//   name:string;
//   email:string;
//   profilePicture: string;
// }
// export class Request{
//   deviceName: string;
//   deviceImage:string;
//   description:string;
// }

// [
//   {
//     "requestId": 1,
//     "consumer": {
//       "consumerId": 1,
//       "consumerName": "Nikhil",
//       "propertyAdrress": "Property Address 1",
//       "lat": "37.786882",
//       "long": "-122.399972"
//     },
//     "appliance": {
//       "applianceId": 1,
//       "applianceName": "Air Conditioner"
//     },
//     "service": null,
//     "requestDescription": "aa",
//     "images": [],
//     "appointmentDateTime": "2019-11-16T16:36:26.566+05:30"
//   },