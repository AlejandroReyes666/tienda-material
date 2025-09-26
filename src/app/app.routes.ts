import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/login/login/login.component';
import { ProductsComponent } from './features/products/products/products.component';
import { ContactComponent } from './features/contact/contact/contact.component';
import { AboutUsComponent } from './features/aboutUs/about-us/about-us.component';
import { WorkWithUsComponent } from './features/work-with-us/work-with-us.component';
import { SalesComponent } from './features/sales/sales.component';
import { CartComponent } from './features/cart/cart.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ConfirmPurshasesComponent } from './features/confirm-purshases/confirm-purshases.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductsComponent,canActivate: [AuthGuard] },
    { path: 'contact', component: ContactComponent },
    { path: 'workwithus', component: WorkWithUsComponent },
    {path:'aboutus', component:AboutUsComponent},
    {path:'sales', component: SalesComponent}, // Asegúrate de importar SalesComponent en tu módulo
    {path:'shoppingcart',component:CartComponent},
    {path:'confirmPurshase',component:ConfirmPurshasesComponent},
    { path: '**', redirectTo: '' } // redirecciona a Inicio si no encuentra ruta


];
