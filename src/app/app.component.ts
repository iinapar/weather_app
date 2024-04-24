import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  GridItemHTMLElement,
  GridStack,
  GridStackNode,
  GridStackWidget,
} from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import * as widgetSelectors from './store/selectors/widget.selectors';
import * as weatherSelectors from './store/selectors/currentweather.selectors';
import * as airpollutionSelectors from './store/selectors/airpollution.selectors';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getWeatherData } from './store/actions/currentweather.actions';
import * as airPollutionActions from './store/actions/airpollution.actions';
import { updateWidget } from './store/actions/widget.actions';
import { LocalStorageService } from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'weather_app';
  @ViewChildren('gridStackItem') gridstackItems!: QueryList<
    ElementRef<GridItemHTMLElement>
  >;
  currentWeather$ = this.store.select(weatherSelectors.selectAllWeatherData);
  widgets$ = this.store.select(widgetSelectors.selectWidgets);
  airPollution$ = this.store.select(airpollutionSelectors.selectAirPollution);
  airPollutionComponents$ = this.store.select(
    airpollutionSelectors.selectAirPollutionComponents
  );
  airComponents$ = this.store.select(airpollutionSelectors.selectAirComponents);
  chartType$ = this.store.select(airpollutionSelectors.selectChartType);
  dayLength$ = this.store.select(weatherSelectors.selectDayLength);
  grid!: GridStack;
  initialState$ = this.store.select(widgetSelectors.selectInitial);
  cityInputFormControl: FormControl = new FormControl('');
  cityInputValue$: any;
  selectedAirComponents$: any = this.store.select(
    airpollutionSelectors.selectFilteredAirPollutionComponents
  );

  constructor(
    private store: Store,
    private localService: LocalStorageService
  ) {}

  ngOnInit(): void {
    // Tarkistetaan löytyykö widgettien tiedot local storagesta
    if (this.localService.getItem('widgets') !== null) {
      // Jos löytyy, haetaan ne storagesta
      const storedWidgetsString: any = this.localService.getItem('widgets');
      // Muutetaan JSON-string objetiksi
      const storedWidgets = JSON.parse(storedWidgetsString);
      // Päivitetään storeen storagesta löytyvät tiedot
      storedWidgets.forEach((widget: any) => {
        this.store.dispatch(updateWidget(widget));
      });
    }

    this.store.select(weatherSelectors.selectCity).subscribe((city) => {
      this.store.dispatch(getWeatherData({ city: city }));
      this.store.dispatch(airPollutionActions.getAirPollution({ city: city }));
    });
    this.cityInputFormControl.setValue(this.cityInputValue$);
  }

  ngAfterViewInit(): void {
    this.grid = GridStack.init({
      cellHeight: 100,
      margin: 5,
      float: true,
      columnOpts: {
        breakpointForWindow: true, // test window vs grid size
        breakpoints: [{ w: 700, c: 1 }],
      },
    }).on('change added', (event: Event, nodes: GridStackNode[]) =>
      this.onChange(nodes)
    );

    this.onChange();

    this.gridstackItems.changes.subscribe(() => {
      const layout: GridStackWidget[] = [];
      this.gridstackItems.forEach((ref) => {
        const n =
          ref.nativeElement.gridstackNode ||
          this.grid.makeWidget(ref.nativeElement).gridstackNode;
        if (n) layout.push(n);
      });
      this.grid.load(layout);
    });
  }

  onChange(list = this.grid.engine.nodes) {
    list.forEach((item: any) => {
      const widget = {
        id: item._id,
        x: item.x,
        y: item.y,
        h: item.h,
        w: item.w,
      };
      this.store.dispatch(updateWidget(widget));
    });
    let updatedWidgets: any;
    this.widgets$.subscribe((data: any) => (updatedWidgets = data));

    // Tallennetaan päivitetyt widgetit localstorageen
    this.localService.clear();
    this.localService.setItem('widgets', JSON.stringify(updatedWidgets));
  }

  resetToDefaultOrder() {
    this.initialState$.forEach((initial) => {
      initial.forEach((widget) => {
        this.grid.engine.nodes.forEach((node: any) => {
          if (node._id === widget.id) {
            this.grid.update(node.el!, {
              w: widget.w,
              h: widget.h,
              x: widget.x,
              y: widget.y,
            });
          }
        });
      });
    });
  }

  updateCityValue() {
    this.store.dispatch(
      getWeatherData({ city: this.cityInputFormControl.value })
    );
  }

  resetStorage() {
    this.localService.clear();
  }

  setChartType(value: string) {
    this.store.dispatch(airPollutionActions.setChartType({ ChartType: value }));
  }

  setSelectedAirComponents(airComponents: any) {
    this.store.dispatch(
      airPollutionActions.setSelectedAirComponents({
        SelectedAirComponents: airComponents,
      })
    );
  }
}
