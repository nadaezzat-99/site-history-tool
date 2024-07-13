import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {TabMenuModule} from 'primeng/tabmenu';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import {FormControl, FormGroup} from '@angular/forms';
import { SiteInfoService } from '../services/site-info.service';
import { site } from '../types/site.interface';
import { UploadEvent } from '../types/upload-event';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-site-info',
  templateUrl: './site-info.component.html',
  styleUrls: ['./site-info.component.css'],

})
export class SiteInfoComponent implements OnInit {
[x: string]: any;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  search: string = '';
  enableSearch = false;
  site_data$:Observable<any> | undefined;
  isLoading: boolean = false;
  error: string | undefined;
    faSignout = faSignOut;

  siteData: site = {
    site_id:"",
    region:"",
    option:"",
    site_type:"",
    structure_type:"",
    structure_height:"",
    map:""
  } ;

  items: MenuItem[] =[];
  activeItem!: MenuItem;
  sidebarVisible: boolean = true;
  activeTabIndex: number = 0;


  siteInfoForm =  new FormGroup({
  siteId: new FormControl({value: '', disabled: true}),
  region: new FormControl({value: '', disabled: true}),
  option: new FormControl({value: '', disabled: true}),
  structureInfo: new FormControl({value: '', disabled: true}),
  structureType: new FormControl({value: '', disabled: true}),
  height: new FormControl({value: '', disabled: true}),
  });


  constructor(private siteInfoService: SiteInfoService, private toastr: ToastrService, private messageService: MessageService) {
    this.siteInfoService.getAll();
    
   }

  ngOnInit(): void {
    this.items = [
      { label: 'Site Info', icon: 'pi pi-home' },
      { label: 'Site Update', icon: 'pi pi-chart-line' }
  ]

  this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
}



  getSiteData(){
    this.isLoading = true
    if(this.search !=='' && this.search.trim() !==''){
    this.enableSearch = true;
    this.siteInfoService.getSiteData(this.search).subscribe(
      {
        next: (res) => {          
          this.siteData = res.data.site_general_info;
          this.siteData.map =  res.data.map;
          this.siteInfoForm.setValue({
            siteId: this.siteData.site_id,
            option: this.siteData.option || null,
            region: this.siteData.region ,
            structureInfo: this.siteData.site_type ||null,
            structureType: this.siteData.structure_type || null,
            height: this.siteData.structure_height   || null,
          });     
          console.log(this.siteData.map, res.data);
               
        },
        error: (e:any) => {
          if (e.status === 404){
            this.toastr.error("Error!", e.body.error);
            console.log("error", e.body.error);
          }
          else if(e.status === 0){
            this.toastr.error("Check Your internet connection", "Error!");
          }
          else{
            console.log("error", e);
            this.toastr.error( "Something went wrong, Please try again letter", "Error!");
          }
          this.siteInfoForm.reset()
          this.siteData.map = ""
        },
        complete: () => this.isLoading = false
    });     
    }
  }

  onUpload(event: UploadEvent) {
    this.toastr.info("File Uploaded succefully","Info")
}
onError(event:any){  
  this.toastr.error(event.error.body.error,"Error!")
}


onTabChange(event:any) {
  this.activeTabIndex = event.index;
  console.log(this.activeTabIndex);
  
}
}
