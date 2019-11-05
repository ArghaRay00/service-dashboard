import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable,from,of} from 'rxjs';
import {Issue,ServiceRequest, yelpResponse} from '../models/issue';
import {HttpClient, HttpErrorResponse,HttpHeaders,HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators'


@Injectable()
export class DataService  {
  
  private readonly YELP_URL='https://iot-based-home-warranty.azurewebsites.net/api/ConsumerRequest/GetYelpResponse'
  private readonly ALL_REQUESTS= 'https://iot-based-home-warranty.azurewebsites.net/api/ConsumerRequest/getallrequests';
  private readonly AssignServiceMen= 'https://iot-based-home-warranty.azurewebsites.net/api/ConsumerRequest/AssignService';

  dataChange: BehaviorSubject<ServiceRequest[]> = new BehaviorSubject<ServiceRequest[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  result :any;
  requestArray :ServiceRequest[] =[];

  constructor (private httpClient: HttpClient) {
  }

  get data(): ServiceRequest[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.getAllServiceRequests().subscribe(data => {
        this.dataChange.next(data);
        this.requestArray = data as ServiceRequest[];
        localStorage.setItem('source',JSON.stringify(this.requestArray));
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }
  
   getAllServiceRequests() : Observable<ServiceRequest[]>{
    return this.httpClient.get<ServiceRequest[]>(this.ALL_REQUESTS);
    }



  // DEMO ONLY, you can find working methods below
  addIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  updateIssue (issue: Issue): void {
    this.dialogData = issue;
  }

  deleteIssue (id: number): void {
    console.log(id);
  }

  //passing auth token directly instead of having a http interceptor as we dont have time
  getYelpResponse(radius :number,lat  :string , long :string , applianceName :string) {
    console.log('inside getYelpResponse service='+radius+lat+long+applianceName);
    const data = {
      'lat': lat
      ,'long': long 
      ,'radius': radius
      ,'term': applianceName
      }
      const headers= {headers : new HttpHeaders().set('Content-Type', 'application/json')};
      return this.httpClient.post<yelpResponse>(this.YELP_URL, data, headers).pipe(map(
      res => {
          //TODO Map
        return res;
        },
        err => {
          return err;
        }
      ));
  }

  getRequestByRequestId(id :number) : ServiceRequest[]
  {
     let ss = JSON.parse(localStorage.getItem('source'));
     let result =[];
      result =ss.filter( request =>  request.requestId === id);
    return result;
  }

  assignServicePerson(requestId :number,serviceVendorName:string,location:string,contactNumber:string){
    const data = {
      'serviceVendorName': serviceVendorName
      ,'location': location 
      ,'contactNumber': contactNumber
      ,'requestId': requestId
      }
      console.log(JSON.stringify(data));
      const headers= {headers : new HttpHeaders().set('Content-Type', 'application/json')};
      return this.httpClient.post(this.AssignServiceMen, data, headers).pipe(map(
      res => {
          //TODO Map
        return res;
        },
        err => {
          return err;
        }
      ));
  }

}


