import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  UserForm!:FormGroup;
  actionBtn: string = "save";
  constructor(private fb:FormBuilder, private api:ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
     private dialogRef: MatDialogRef<EdituserComponent>) { }

  ngOnInit(): void {
    this.UserForm=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      gender:['',Validators.required],
      dob:['',Validators.required],
      address:['',Validators.required]
    })
    // console.log(this.editData)
    if(this.editData){
      this.actionBtn="update";
      this.UserForm.controls['name'].setValue(this.editData.name);
      this.UserForm.controls['email'].setValue(this.editData.email);
      this.UserForm.controls['gender'].setValue(this.editData.gender);
      this.UserForm.controls['dob'].setValue(this.editData.dob);
      this.UserForm.controls['address'].setValue(this.editData.address );
    }
  }

  

AddUser(){
  // console.log(this.UserForm.value)
  if(!this.editData){
  if(this.UserForm.valid){
    this.api.postUser(this.UserForm.value).subscribe({
      next:(res)=>{
        alert("user added done");
        this.UserForm.reset();
        this.dialogRef.close();
        window.location.reload();
      }
    })
  }
}
  else{
    this.update()
  }

}
update(){
  this.api.putuser(this.UserForm.value,this.editData.id).subscribe({
    next:(res)=>{
      alert("data updated");
      this.UserForm.reset();
      this.dialogRef.close('update');
    }
  })
}

}
