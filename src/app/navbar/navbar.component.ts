import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { distinctUntilChanged, tap } from "rxjs";
import { StateService } from "../_service/state/state.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly LOGO_DEFAULT = "assets/rebel-alliance-logo.svg";
  private readonly LOGO_WHITE = "assets/rebel-alliance-logo-white.svg";

  public logoUrl = this.LOGO_DEFAULT;
  public themeControl = new FormControl(false);
  public isChecked$ = this.themeControl.valueChanges.pipe(
    distinctUntilChanged(),
    tap((event: any) => {
      this.logoUrl =
        this.logoUrl === this.LOGO_DEFAULT
          ? this.LOGO_WHITE
          : this.LOGO_DEFAULT;
      this.stateService.emitThemeToggle(event);
    })
  );

  constructor(private stateService: StateService) {}
}
