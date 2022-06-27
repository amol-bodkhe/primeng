import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:8080/api/crud';
  //for backend node server 

  //baseUrl='http://localhost:3000/employee/';
  //for json-server
  constructor(private httpClient: HttpClient) { }

  postEmployee(data: any) {
    return this.httpClient.post<any>(this.baseUrl + "/addEmployee", data)
      .pipe(map(res => {
        //alert('Data save Successfully..!');
        return res;
      }));
  }

  getEmployee() {
    return this.httpClient.get<any>(this.baseUrl + "/getAllEmployee")
      .pipe(        
          map((res: any) => {
          //console.log('res=>',res)           
         return res;
        }),
        //  filter(res=>
        //   res.salary>20000         
        //  )
     
      );     
     
  }

  updateEmployee(data: any, id: number) {
    return this.httpClient.put<any>(this.baseUrl + "/updateEmployee", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }

  deleteEmployee(id: number) {    
  let data=`${this.baseUrl}/deleteEmployee/${id}`;
    return this.httpClient.delete<any>(data)
    .pipe(map((res: any) => {
      //alert('Amol');
      return res;
    }));
    
 }}