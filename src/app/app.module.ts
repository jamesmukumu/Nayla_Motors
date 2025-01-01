import { NgModule,isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {MatDialogModule} from "@angular/material/dialog"
import {RouterModule} from '@angular/router';
import {MatSelectModule} from "@angular/material/select"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import {MatCardModule,MatCardImage} from '@angular/material/card';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component'
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatButton} from '@angular/material/button';
import { FilterbysearchComponent } from './filterbysearch/filterbysearch.component'
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import { AccordionModule } from 'primeng/accordion';
import { FileUploadModule } from 'primeng/fileupload';
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
import { SellcarComponent } from './sellcar/sellcar.component';
import {MatStepperModule} from '@angular/material/stepper'
import { StepperModule } from 'primeng/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { HttpClientModule } from '@angular/common/http';
import { ScrollTopModule } from 'primeng/scrolltop';
import { RelatedcarComponent } from './relatedcar/relatedcar.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { StoreModule,ActionReducer,ActionReducerMap,MetaReducer } from '@ngrx/store';
import {ToastModule} from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderLaptopsComponent } from './components/header-laptops/header-laptops.component'
import {MatListModule} from "@angular/material/list";
import { SideBarComponent } from './components/side-bar/side-bar.component'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatBadgeModule} from "@angular/material/badge"
import { MatTableModule } from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { localStorageSync } from 'ngrx-store-localstorage';
import { wishListReducer } from './redux/reducer.wishlist';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PopUpComponent } from './components/pop-up/pop-up.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete"
  
const reducers:ActionReducerMap<any> = {
wishlist:wishListReducer
}
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (typeof window !== 'undefined') {
      return localStorageSync({ keys: ['wishlist'], rehydrate: true })(reducer)(state, action);
    }
    return reducer(state, action);
  };
}


const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

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
    SellcarComponent,
    RelatedcarComponent,
    HeaderLaptopsComponent,
    SideBarComponent,
    WishlistComponent,
    PopUpComponent,
    
  ],
  imports: [
    
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,   
    MatCardModule, 
    MatDividerModule,   
    MatCardImage,
    MatBadgeModule,
    ScrollTopModule,
    MatSidenavModule,
    ToastModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatSnackBarModule,
   StoreModule.forRoot(reducers,{metaReducers}),
    MatExpansionModule,
    MatTableModule,
    MatStepperModule,
    MatListModule,
    MatTabsModule,
    LazyLoadImageModule,
   StepperModule,
   AccordionModule,
    MatButton,
    HttpClientModule,
 FileUploadModule,
    MessagesModule,
    TableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
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
    {path:"relatedcar/:carSlug",component:RelatedcarComponent},
    {path:"filtered/cars",component:SearchfilterComponent},
   {path:"myliked/cars",component:MyfavcarsComponent},
   {path:"sell/car",component:SellcarComponent},
   {path:"wishlist", component:WishlistComponent}
    ]),
   
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
