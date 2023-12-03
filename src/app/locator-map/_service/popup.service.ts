import {Injectable} from '@angular/core';
import {Options} from "ol/Overlay";
import {Overlay} from "ol";
import {Marker} from "../../_model/marker.model";
import {EntityDetails} from "../../_model/entity-details.model";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popup!: Overlay;
  private availableIcons = [4, 8, 13, 15, 16, 20, 21, 22, 24, 27];

  public getPopupOptions(anchorId: string): Options {
    return {
      element: document.getElementById(anchorId)!,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -50]
    };
  }

  public setPopup(popup: Overlay): void {
    this.popup = popup;
  }

  public getPopup(): Overlay {
    return this.popup
  }

  public showPopup(coordinates: [number, number], marker: Marker, entity: EntityDetails): void {
    this.popup.getElement()!.innerHTML = `
      <div style="display: flex; align-items: center;">
        <img src="assets/icons/${this.availableIcons.includes(entity.id) ? entity.id : 'icon-generic-character'}.svg"
            alt="Icon" style="width: 24px; height: 24px; margin-right: 8px;">
        <div>
          <div style="font-weight: bold;">${entity.name}</div>
          <div>ID: ${marker?.id}</div>
          ${marker?.distance ? `<div>Distance: <span>${marker.distance.toFixed(2)} km</span></div>` : ''}
        </div>
      </div>
    `;

    this.popup.setPosition(coordinates);
  }

  public hidePopup(): void {
    this.popup.setPosition(undefined);
  }
}
