import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule} from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {MatCardModule,MatCardImage} from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component'
import {MatButton} from '@angular/material/button';
import { FilterbysearchComponent } from './filterbysearch/filterbysearch.component'
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { FilterbybrandComponent } from './filterbybrand/filterbybrand.component';
import { AllcarsComponent } from './allcars/allcars.component';
import {MatDividerModule} from '@angular/material/divider'
import {MatIconModule} from '@angular/material/icon';
import { CarSpecificComponent } from './car-specific/car-specific.component'
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {DividerModule} from'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GalleriaModule } from 'primeng/galleria';
import { ProgressBarModule } from 'primeng/progressbar';
import { SearchfilterComponent } from './searchfilter/searchfilter.component';
import { MessagesModule } from 'primeng/messages';
import {BreadcrumbModule} from 'primeng/breadcrumb'
import {MatPaginatorModule} from '@angular/material/paginator';
import { AllfetchedcarsComponent } from './allfetchedcars/allfetchedcars.component';
import { MyfavcarsComponent } from './myfavcars/myfavcars.component'
import {MatTabsModule} from '@angular/material/tabs'
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
  declarations:[
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    FilterbysearchComponent,
    FilterbybrandComponent,
    AllcarsComponent,
    CarSpecificComponent,
    SearchfilterComponent,
    AllfetchedcarsComponent,
    MyfavcarsComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    MatCardModule, 
    MatDividerModule,   
    MatCardImage,
    MatTabsModule,
    MatButton,
    MessagesModule,
    TableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    BreadcrumbModule,
    ProgressBarModule,
    GalleriaModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    DividerModule,
    SidebarModule,
    ButtonModule,
    DialogModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatInputModule,
    RouterModule.forRoot([
    {path:"",component:LandingComponent},
    {path:"car/:searchvector",component:CarSpecificComponent},
    {path:"filtered/cars",component:SearchfilterComponent},
   {path:"all",component:AllfetchedcarsComponent},
   {path:"myliked/cars",component:MyfavcarsComponent}
    ])    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
