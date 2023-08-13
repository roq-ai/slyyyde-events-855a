const mapping: Record<string, string> = {
  'check-ins': 'check_in',
  clients: 'client',
  'data-analyses': 'data_analysis',
  events: 'event',
  promotions: 'promotion',
  registrations: 'registration',
  sessions: 'session',
  users: 'user',
  venues: 'venue',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
