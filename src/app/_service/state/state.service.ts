import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Marker} from "../../_model/marker.model";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private sortedMarkersSubject = new BehaviorSubject<Marker[]>([]);
  public sortedMarkers$ = this.sortedMarkersSubject.asObservable();

  private themeToggleSubject = new BehaviorSubject<boolean>(false);
  public themeToggle$ = this.themeToggleSubject.asObservable();

  private markedEntitySubject = new BehaviorSubject<number>(0);
  public markedEntity$ = this.markedEntitySubject.asObservable();

  public emitSortedMarkers(markers: Marker[]): void {
    this.sortedMarkersSubject.next(markers);
  }

  public emitThemeToggle(value: boolean): void {
    this.themeToggleSubject.next(value);
  }

  public emitMarkedEntity(value: number): void {
    this.markedEntitySubject.next(value);
  }
}
