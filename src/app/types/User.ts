import { Address } from './Address';
import { BillingUserData } from './Billing';
import { Car } from './Car';
import CreatedUpdatedProps from './CreatedUpdatedProps';
import { Data } from './Table';
import { Tag } from './Tag';

export interface User extends Data, CreatedUpdatedProps {
  id: string;
  issuer: boolean;
  name: string;
  firstName: string;
  fullName: string;
  tags: Tag[];
  plateID: string;
  email: string;
  phone: Date;
  mobile: string;
  notificationsActive: boolean;
  notifications: UserNotifications;
  address: Address;
  iNumber: string;
  costCenter: boolean;
  status: string;
  image: string | null;
  role: string;
  locale: string;
  language: string;
  numberOfSites: number;
  activeComponents?: string[];
  scopes: string[];
  companies: string[];
  sites: string[];
  sitesAdmin: string[];
  sitesOwner: string[];
  userHashID: number;
  tenantHashID: number;
  eulaAcceptedHash: string;
  eulaAcceptedVersion: number;
  eulaAcceptedOn: Date;
  billingData: BillingUserData;
}

export interface UserNotifications {
  sendSessionStarted: boolean;
  sendOptimalChargeReached: boolean;
  sendEndOfCharge: boolean;
  sendEndOfSession: boolean;
  sendUserAccountStatusChanged: boolean;
  sendNewRegisteredUser: boolean;
  sendUnknownUserBadged: boolean;
  sendChargingStationStatusError: boolean;
  sendChargingStationRegistered: boolean;
  sendOcpiPatchStatusError: boolean;
  sendSmtpError: boolean;
  sendUserAccountInactivity: boolean;
  sendPreparingSessionNotStarted: boolean;
  sendOfflineChargingStations: boolean;
  sendBillingSynchronizationFailed: boolean;
  sendSessionNotStarted: boolean;
  sendCarCatalogSynchronizationFailed: boolean;
  sendComputeAndApplyChargingProfilesFailed: boolean;
  sendEndUserErrorNotification: boolean;
  sendBillingNewInvoice: boolean;
}

export interface UserDefaultTagCar {
  car?: Car;
  tag?: Tag;
}

export interface UserToken {
  id?: string;
  role?: string;
  name?: string;
  email?: string;
  mobile?: string;
  firstName?: string;
  locale?: string;
  language?: string;
  currency?: string;
  tagIDs?: string[];
  tenantID: string;
  tenantName?: string;
  userHashID?: string;
  tenantHashID?: string;
  scopes?: readonly string[];
  companies?: string[];
  sites?: string[];
  sitesAdmin?: string[];
  sitesOwner?: string[];
  activeComponents?: string[];
}

export interface UserCar extends Data, CreatedUpdatedProps {
  id: string;
  user: User;
  carID: string;
  default?: boolean;
  owner?: boolean;
}

export interface UserSite extends Data {
  user: User;
  siteID: string;
  siteAdmin: boolean;
  siteOwner: boolean;
}

export enum UserButtonAction {
  EDIT_USER = 'edit_user',
  EDIT_TAG = 'edit_tag',
  CREATE_USER = 'create_user',
  CREATE_TAG = 'create_tag',
  DELETE_TAG = 'delete_tag',
  ACTIVATE_TAG = 'activate_tag',
  DEACTIVATE_TAG = 'deactivate_tag',
  DELETE_USER = 'delete_user',
  SYNCHRONIZE_BILLING_USER = 'billing_synchronize_user',
  BILLING_FORCE_SYNCHRONIZE_USER = 'billing_force_synchronize_user',
  SYNCHRONIZE_BILLING_USERS = 'billing_synchronize_users',
  ASSIGN_SITES_TO_USER = 'assign_sites_to_user',
  EXPORT_USERS = 'export_users',
  NAVIGATE_TO_TAGS = 'navigate_to_tags',
  NAVIGATE_TO_USER = 'navigate_to_user'
}

export enum UserStatus {
  PENDING = 'P',
  ACTIVE = 'A',
  DELETED = 'D',
  INACTIVE = 'I',
  BLOCKED = 'B',
  LOCKED = 'L',
  UNKNOWN = 'U',
}

export enum UserRole {
  SUPER_ADMIN = 'S',
  ADMIN = 'A',
  BASIC = 'B',
  DEMO = 'D',
  UNKNOWN = 'U',
}
