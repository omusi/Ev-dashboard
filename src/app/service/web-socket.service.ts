import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SubjectInfo } from '../common.types';
import { ConfigService } from './config.service';
import * as io from 'socket.io-client';
import { Constants } from '../utils/Constants';

@Injectable()
export class WebSocketService {
  private centralRestServerServiceURL: String;
  private subjectChargingStations = new Subject<SubjectInfo>();
  private subjectChargingStation = new Subject<SubjectInfo>();
  private subjectCompanies = new Subject<SubjectInfo>();
  private subjectCompany = new Subject<SubjectInfo>();
  private subjectSites = new Subject<SubjectInfo>();
  private subjectSite = new Subject<SubjectInfo>();
  private subjectSiteAreas = new Subject<SubjectInfo>();
  private subjectSiteArea = new Subject<SubjectInfo>();
  private subjectUsers = new Subject<SubjectInfo>();
  private subjectUser = new Subject<SubjectInfo>();
  private subjectVehicles = new Subject<SubjectInfo>();
  private subjectVehicle = new Subject<SubjectInfo>();
  private subjectVehicleManufacturers = new Subject<SubjectInfo>();
  private subjectVehicleManufacturer = new Subject<SubjectInfo>();
  private subjectTransactions = new Subject<SubjectInfo>();
  private subjectTransaction = new Subject<SubjectInfo>();
  private subjectLogging = new Subject<SubjectInfo>();
  private socket;

  constructor() {
  }

  setcentralRestServerServiceURL(url) {
    this.centralRestServerServiceURL = url;
  }

  getSubjectCompanies(): Observable<SubjectInfo> {
    return this.subjectCompanies.asObservable();
  }

  getSubjectCompany(): Observable<SubjectInfo> {
    return this.subjectCompany.asObservable();
  }

  getSubjectSites(): Observable<SubjectInfo> {
    return this.subjectSites.asObservable();
  }

  getSubjectSite(): Observable<SubjectInfo> {
    return this.subjectSite.asObservable();
  }

  getSubjectSiteAreas(): Observable<SubjectInfo> {
    return this.subjectSiteAreas.asObservable();
  }

  getSubjectSiteArea(): Observable<SubjectInfo> {
    return this.subjectSiteArea.asObservable();
  }

  getSubjectUsers(): Observable<SubjectInfo> {
    return this.subjectUsers.asObservable();
  }

  getSubjectUser(): Observable<SubjectInfo> {
    return this.subjectUser.asObservable();
  }

  getSubjectVehicles(): Observable<SubjectInfo> {
    return this.subjectVehicles.asObservable();
  }

  getSubjectVehicle(): Observable<SubjectInfo> {
    return this.subjectVehicle.asObservable();
  }

  getSubjectVehicleManufacturers(): Observable<SubjectInfo> {
    return this.subjectVehicleManufacturers.asObservable();
  }

  getSubjectVehicleManufacturer(): Observable<SubjectInfo> {
    return this.subjectVehicleManufacturer.asObservable();
  }

  getSubjectTransactions(): Observable<SubjectInfo> {
    return this.subjectTransactions.asObservable();
  }

  getSubjectTransaction(): Observable<SubjectInfo> {
    return this.subjectTransaction.asObservable();
  }

  getSubjectChargingStations(): Observable<SubjectInfo> {
    return this.subjectChargingStations.asObservable();
  }

  getSubjectChargingStation(): Observable<SubjectInfo> {
    return this.subjectChargingStation.asObservable();
  }

  getSubjectLogging(): Observable<SubjectInfo> {
    return this.subjectLogging.asObservable();
  }

  initSocketIO() {
    // Check
    if (!this.socket) {
      // Connect to Socket IO
      this.socket = io(this.centralRestServerServiceURL);

      // Monitor Companies`
      this.socket.on(Constants.ENTITY_COMPANIES, () => {
        // Notify
        this.subjectCompanies.next();
      });

      // Monitor Company
      this.socket.on(Constants.ENTITY_COMPANY, (notifInfo) => {
        // Notify
        this.subjectCompany.next(notifInfo);
      });

      // Monitor Sites
      this.socket.on(Constants.ENTITY_SITES, () => {
        // Notify
        this.subjectSites.next();
      });

      // Monitor Site
      this.socket.on(Constants.ENTITY_SITE, (notifInfo) => {
        // Notify
        this.subjectSite.next(notifInfo);
      });

      // Monitor Site Areas
      this.socket.on(Constants.ENTITY_SITE_AREAS, () => {
        // Notify
        this.subjectSiteAreas.next();
      });

      // Monitor Site Area
      this.socket.on(Constants.ENTITY_SITE_AREA, (notifInfo) => {
        // Notify
        this.subjectSiteArea.next(notifInfo);
      });

      // Monitor Users
      this.socket.on(Constants.ENTITY_USERS, () => {
        // Notify
        this.subjectUsers.next();
      });

      // Monitor User
      this.socket.on(Constants.ENTITY_USER, (notifInfo) => {
        // Notify
        this.subjectUser.next(notifInfo);
      });

      // Monitor Vehicles
      this.socket.on(Constants.ENTITY_VEHICLES, () => {
        // Notify
        this.subjectVehicles.next();
      });

      // Monitor Vehicle
      this.socket.on(Constants.ENTITY_VEHICLE, (notifInfo) => {
        // Notify
        this.subjectVehicle.next(notifInfo);
      });

      // Monitor Vehicle Manufacturers
      this.socket.on(Constants.ENTITY_VEHICLE_MANUFACTURERS, () => {
        // Notify
        this.subjectVehicleManufacturers.next();
      });

      // Monitor Vehicle Manufacturer
      this.socket.on(Constants.ENTITY_VEHICLE_MANUFACTURER, (notifInfo) => {
        // Notify
        this.subjectVehicleManufacturer.next(notifInfo);
      });

      // Monitor Transactions
      this.socket.on(Constants.ENTITY_TRANSACTIONS, () => {
        // Notify
        this.subjectTransactions.next();
      });

      // Monitor Transaction
      this.socket.on(Constants.ENTITY_TRANSACTION, (notifInfo) => {
        // Notify
        this.subjectTransaction.next(notifInfo);
      });

      // Monitor Charging Stations
      this.socket.on(Constants.ENTITY_CHARGING_STATIONS, () => {
        // Notify
        this.subjectChargingStations.next();
      });

      // Monitor Charging Station
      this.socket.on(Constants.ENTITY_CHARGING_STATION, (notifInfo) => {
        // Notify
        this.subjectChargingStation.next(notifInfo);
      });

      // Monitor Logging
      this.socket.on(Constants.ENTITY_LOGGING, () => {
        // Notify
        this.subjectLogging.next();
      });
    }
  }

  resetSocketIO() {
    // Check: socket not initialised and user logged
    if (this.socket) {
      // Close
      this.socket.disconnect();
      // Clear
      this.socket = null;
    }
  }
}
