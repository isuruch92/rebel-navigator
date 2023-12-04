import { importProvidersFrom, APP_INITIALIZER } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { BrowserModule, bootstrapApplication } from "@angular/platform-browser";
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { provideRouter } from "@angular/router";
import { LocatorDashboardComponent } from "./app/locator-dashboard/locator-dashboard.component";

// this is just for showing the splash screen
export function loadCrucialData() {
  return function () {
    return delay(1800);
  };
}

export function delay(delay: number) {
  return function () {
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: loadCrucialData(),
    },
    importProvidersFrom(BrowserModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(MatDialogModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter([
      { path: "dashboard", component: LocatorDashboardComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "**", redirectTo: "dashboard", pathMatch: "full" },
    ]),
  ],
}).catch((err) => console.error(err));
