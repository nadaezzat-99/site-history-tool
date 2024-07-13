import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { SiteInfoComponent } from './site-info/site-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import {ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { SiteDataService } from './services/site-data.service';
import { SafePipe } from './shared/pipes/safe.pipe';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TabViewModule } from 'primeng/tabview';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    SiteInfoComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule,
    BrowserAnimationsModule,
    TabMenuModule,
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000, // 
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
    }),
    HttpClientInMemoryWebApiModule.forRoot(SiteDataService),
    FileUploadModule, 
    ToastModule,
    TabViewModule,
    FontAwesomeModule,

  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
