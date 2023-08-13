interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Event Organizer'],
  customerRoles: [],
  tenantRoles: ['Event Organizer', 'Event Manager'],
  tenantName: 'Client',
  applicationName: 'Slyyyde Events',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
