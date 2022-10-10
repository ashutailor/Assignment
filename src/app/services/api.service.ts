import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

postUser(data: any){
  return this.http.post<any>("http://localhost:3000/user/",data);
}

getuser(){
  return this.http.get<any>("http://localhost:3000/user/");
}
putuser(data:any,id : number){
  return this.http.put<any>("http://localhost:3000/user/"+id,data)
}
deleteuser(id : number){
  return this.http.delete<any>("http://localhost:3000/user/"+id)
}

}

