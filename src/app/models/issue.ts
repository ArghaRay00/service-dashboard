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
  id:number;
  name:string;
  email:string;
  profilePicture: string;
  policy: string;
  deviceName: string;
  deviceImages:string[];
  description:string;
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