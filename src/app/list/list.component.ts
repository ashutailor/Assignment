import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit,Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EdituserComponent } from '../edituser/edituser.component';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements AfterViewInit {
  displayedColumns: string[] = ['select', 'name', 'email', 'gender','address','dob','action'];  
  dataSource = new MatTableDataSource<T>;
  selection = new SelectionModel<T>(true, []);
   
  constructor(private api: ApiService, private dialog:MatDialog){}
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllUser();
  }

  getAllUser(){
    this.api.getuser()
    .subscribe((res)=>{
      // console.log(res);
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      
    })
  }
editUser(row: any){
  this.dialog.open(EdituserComponent, {
    width:"30%",
    data:row
  }).afterClosed().subscribe(val=>{
    if(val=== 'update'){
      this.getAllUser();
    }
  })

}
  openDialog() {
    this.dialog.open(EdituserComponent, {
      width:"30%"
    }).afterClosed().subscribe(val=>{
      if(val=== 'save'){
        this.getAllUser();
      }
    })
  }
  deleteUser(id: number){
    this.api.deleteuser(id).subscribe({
      next:(res)=>{
        alert("user deleted success");
        this.getAllUser();
      }
    })
  }
  }


export interface T {
  name: string;
  email: number;
  gender: string;
  address: string;
  dob: number;
}


