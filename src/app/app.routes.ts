import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/login/login/login.component';
import { ProductsComponent } from './features/products/products/products.component';
import { ContactComponent } from './features/contact/contact/contact.component';
import { AboutUsComponent } from './features/aboutUs/about-us/about-us.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'contact', component: ContactComponent },
    {path:'aboutus', component:AboutUsComponent},
    { path: '**', redirectTo: '' } // redirecciona a Inicio si no encuentra ruta


];
