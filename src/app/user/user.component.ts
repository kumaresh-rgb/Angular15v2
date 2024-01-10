import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements AfterViewInit {
  toastr: any;
  updatePopupComponent: any;

  constructor( private service: AuthService, private dialog: MatDialog) {
    this.LoadUser();
  }
  userlist: any;
  dataSource: any;
  // id:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {

  }
  LoadUser() {
    this.service.Getall().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['action','username', 'name','lastname','dob','userrole', 'email', 'status', 'role', 'phoneno'];

  updateuser(code: any) {
    this.OpenDialog('1000ms', '600ms', code);
  }

  OpenDialog(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '100%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.LoadUser();
    });
  }

  updateuserView(code: any) {
    this.OpenDialogView('1000ms', '600ms', code);
  }
  OpenDialogView(enteranimation: any, exitanimation: any, code: string) {
    const popup = this.dialog.open(UpdatepopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '100%',
      data: {
        usercode: code
      }
    });
    popup.afterClosed().subscribe(res => {
      this.loaduserdataView();
    });
  }
  loaduserdataView() {
    throw new Error('Method not implemented.');
  }

  ondelete(id:any){
    this.service.DeleteUsers(id).subscribe(res=>{
      this.toastr.success('Updated successfully.');
  
  })
  } 


updateuser1(){
if (this.updatePopupComponent) {
      this.updatePopupComponent.disableFields();
    }
}

}
