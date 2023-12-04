import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";
import { LocatorDashboardComponent } from "./locator-dashboard/locator-dashboard.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { StateService } from "./_service/state/state.service";
import { OverlayContainer } from "@angular/cdk/overlay";
import { Subject, takeUntil, tap } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    LocatorDashboardComponent,
    MatSidenavModule,
    AsyncPipe,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding("class") className = "theme-light";
  private darkClass = "theme-dark";
  private lightClass = "theme-light";
  private destroy$: Subject<void> = new Subject<void>();

  public toggleChange$ = this.stateService.themeToggle$.pipe(
    takeUntil(this.destroy$),
    tap((event: any) => {
      this.handleThemeChange(event);
    })
  );

  constructor(
    private stateService: StateService,
    private overlay: OverlayContainer
  ) {}

  private handleThemeChange(checked: boolean) {
    this.className = checked ? this.darkClass : this.lightClass;
    if (checked) {
      this.overlay.getContainerElement().classList.add(this.darkClass);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClass);
    }
  }
}
