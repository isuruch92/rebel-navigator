# RebelNavigator

## Project Overview and Approach

### Architectural Decisions

- I chose **Angular** as the framework because it's where I have the most strength.

- I tried to add as more details as possible for entities to render 

- I have utilized **Angular Materials** for the theming and components because it is really easy and familiar to use and customize

- I tried to make the UI look nice as possible and also carefully considered about the responsiveness in different screens

- For State Management, I have choosed **RxJS** observables and subjects because this is not that of a complicated project with a lot of modules and a lot of state to manage, so going for redux or something third party would be an overkill

- For rendering the map, I have considered different libraries, OpenLayers, Leaflet and Angular Google Maps, and had experimented with each of them to identify what is easier to integrate. Finally I went with the **OpenLayers** because its feature-rich and has a lot of examples and also its not that hard to integrate to Angular once you get the hang of it. And I believe it will surely be benifitial for me going forward.

- I have used Angular **Standalone components** feature for this application so that the unnecessary NgModules complexity is removed. Its really each to work with Standalone components.

- I focused more on **separation of concerns** so that I structured the components and services with their own responsibility for more readability, scalability and maintainability.

- I tried to follow **reactive programming pattern** as much as possible to better use of RxJS library and for better performance of the app.

- When fetching entities, rather than making a separate network call for each entity, I decided to fetch them all and filter and process them using RxJS operators, so that I need to make just 1 network call to get the entities. (I believe this approach is better suited for this project because there are not a lot of entities in the API)

- I added a simple error handling mechanism with toast messages to the user (this definitely can be improved more)

- While I considered incorporating routing, given the nature of this project as a simple dashboard, routing to different components seemed unnecessary. Instead, I opted for a modal to provide additional details. Nonetheless, I included routing specifically within the Main Dashboard component for a more seamless user experience.

- I also tried to cover as much as the unit tests as possible. 

- All in all, I tried to balance every aspect of the project as much as I can and surely had a lot of fun and learning doing it. Kudos to whoever made this great assignment.

##


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
