import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  GridItemHTMLElement,
  GridStack,
  GridStackNode,
  GridStackWidget,
} from 'gridstack';
import { LocalStorageService } from '../services/localstorage.service';
import { combineLatest } from 'rxjs';
import * as widgetSelectors from '../store/selectors/widget.selectors';
import * as weatherSelectors from '../store/selectors/currentweather.selectors';
import * as airpollutionSelectors from '../store/selectors/airpollution.selectors';
import * as weatherActions from '../store/actions/currentweather.actions';
import * as airPollutionActions from '../store/actions/airpollution.actions';
import { updateWidget } from '../store/actions/widget.actions';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard.container.html',
  styleUrl: './dashboard.container.css',
})
export class DashboardContainerComponent {
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
  temperatureUnit$ = this.store.select(weatherSelectors.selectTemperatureType);

  grid!: GridStack;
  initialState$ = this.store.select(widgetSelectors.selectInitial);
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
    if (this.localService.getItem('airComponents') !== null) {
      const storedComponentsString: any =
        this.localService.getItem('airComponents');
      const storedComponents = JSON.parse(storedComponentsString);
      this.store.dispatch(
        airPollutionActions.setSelectedAirComponents({
          SelectedAirComponents: storedComponents,
        })
      );
    }

    if (this.localService.getItem('chartType') !== null) {
      const storedChartType: any = this.localService.getItem('chartType');
      this.store.dispatch(
        airPollutionActions.setChartType({ ChartType: storedChartType })
      );
    }

    if (this.localService.getItem('city') !== null) {
      const storedCity: any = this.localService.getItem('city');
      this.store.dispatch(
        weatherActions.setCityValue({ cityValue: storedCity })
      );
    }

    if (this.localService.getItem('temperatureType') !== null) {
      const storedTemperatureType: any =
        this.localService.getItem('temperatureType');
      this.store.dispatch(
        weatherActions.setTemperatureType({
          temperatureType: storedTemperatureType,
        })
      );
    }

    combineLatest([
      this.store.select(weatherSelectors.selectCity),
      this.store.select(weatherSelectors.selectTemperatureType),
    ]).subscribe(([city, temperatureType]) => {
      this.store.dispatch(
        weatherActions.getWeatherData({ city, temperatureType })
      );
      this.store.dispatch(airPollutionActions.getAirPollution({ city }));
    });
  }

  ngAfterViewInit(): void {
    this.grid = GridStack.init({
      cellHeight: 100,
      margin: 5,
      float: true,
      columnOpts: {
        breakpointForWindow: true,
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
    this.resetStorage();
  }

  updateCityValue(city: string) {
    this.store.dispatch(
      weatherActions.setCityValue({
        cityValue: city,
      })
    );
    this.localService.setItem('city', city);
  }

  resetStorage() {
    this.localService.clear();
  }

  setChartType(value: string) {
    this.store.dispatch(airPollutionActions.setChartType({ ChartType: value }));
    this.localService.setItem('chartType', value);
  }

  setTemperatureType(value: any) {
    this.store.dispatch(
      weatherActions.setTemperatureType({ temperatureType: value })
    );
    this.localService.setItem('temperatureType', value);
  }

  setSelectedAirComponents(airComponents: any) {
    this.store.dispatch(
      airPollutionActions.setSelectedAirComponents({
        SelectedAirComponents: airComponents,
      })
    );
    this.localService.setItem('airComponents', JSON.stringify(airComponents));
  }
}
