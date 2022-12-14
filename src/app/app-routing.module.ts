import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConductorGuard } from '../guards/conductor.guard';
import { PasajeroGuard } from '../guards/pasajero.guard';

const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
  },
  {
    path: 'plan-viaje',
    loadChildren: () => import('./pages/plan-viaje/plan-viaje.module').then( m => m.PlanViajePageModule),
    canActivate:[PasajeroGuard]
  },
  {
    path: 'new-vehiculo',
    loadChildren: () => import('./pages/new-vehiculo/new-vehiculo.module').then( m => m.NewVehiculoPageModule),
    canActivate:[ConductorGuard]
  },
  {
    path: 'ruta-actual',
    loadChildren: () => import('./pages/ruta-actual/ruta-actual.module').then( m => m.RutaActualPageModule),
    canActivate:[ConductorGuard]
  },
  {
    path: 'perfil-conductor',
    loadChildren: () => import('./pages/perfil-conductor/perfil-conductor.module').then( m => m.PerfilConductorPageModule),
    canActivate:[ConductorGuard]
  },
  {
    path: 'aceptar-viaje',
    loadChildren: () => import('./pages/aceptar-viaje/aceptar-viaje.module').then( m => m.AceptarViajePageModule),
    canActivate:[ConductorGuard]
  },
  {
    path: 'mis-viajes',
    loadChildren: () => import('./pages/mis-viajes/mis-viajes.module').then( m => m.MisViajesPageModule),
    canActivate:[PasajeroGuard]
  },
  {
    path: 'buscar-viaje',
    loadChildren: () => import('./pages/buscar-viaje/buscar-viaje.module').then( m => m.BuscarViajePageModule),
    canActivate:[PasajeroGuard]
  },
  {
    path: 'solicitar-viaje',
    loadChildren: () => import('./pages/solicitar-viaje/solicitar-viaje.module').then( m => m.SolicitarViajePageModule),
    canActivate:[PasajeroGuard]
  },
  {
    path: 'viaje-reservado',
    loadChildren: () => import('./pages/viaje-reservado/viaje-reservado.module').then( m => m.ViajeReservadoPageModule),
    canActivate:[PasajeroGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),

  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/faq/faq.module').then( m => m.FaqPageModule),
  
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule)
  },
  {
    path: 'perfil-pasajero',
    loadChildren: () => import('./pages/perfil-pasajero/perfil-pasajero.module').then( m => m.PerfilPasajeroPageModule)
  },
  {
    path: 'en-camino',
    loadChildren: () => import('./pages/en-camino/en-camino.module').then( m => m.EnCaminoPageModule)
  },
  {
    path: 'en-camino-conductor',
    loadChildren: () => import('./pages/en-camino-conductor/en-camino-conductor.module').then( m => m.EnCaminoConductorPageModule)
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
