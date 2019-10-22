import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable,from,of} from 'rxjs';
import {Issue,ServiceRequest} from '../models/issue';
import {HttpClient, HttpErrorResponse,HttpHeaders,HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators'

@Injectable()
export class DataService {

  private readonly YELP_URL='https://iot-based-home-warranty.azurewebsites.net/api/ConsumerRequest/GetYelpResponse'
  private readonly ALL_REQUESTS= 'https://iot-based-home-warranty.azurewebsites.net/api/ConsumerRequest/getallrequests';

  dataChange: BehaviorSubject<ServiceRequest[]> = new BehaviorSubject<ServiceRequest[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

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
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }
  
  getAllServiceRequests() : Observable<ServiceRequest[]>{
    let ELEMENT_DATA: ServiceRequest[] = [
      {name: 'Ray', policy: 'BJLPR6976B',deviceName: 'Human',description : 'Not Working',profilePicture : 'https:\/\/randomuser.me\/api\/portraits\/men\/80.jpg', id: 12131,email :'reachout_argha@outlook.com',deviceImages:[]},
    ];
    return of(ELEMENT_DATA); 
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
  getYelpResponse(id ?:number, lat? : number,long? : number,radius? : number ,term? :string) {
    const data = {
      'lat': 37.786882
      ,'long': -122.399972 
      ,'radius': 10000
      ,'term': "washing machine repair" 
      }
      const headers= {headers : new HttpHeaders().set('Content-Type', 'application/json')};
      return this.httpClient.post<JSON>(this.YELP_URL, data, headers).pipe(map(
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


