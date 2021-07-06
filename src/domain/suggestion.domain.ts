export interface Gym {
  id: number;
  city: string;
  name: string;
  code: string;
  score: number;
  location: Location;
  weekSchedule: DailySchedule[];
}

export interface DailySchedule {
  id: number;
  code: string;
  day: string;
  date: string;
  dailyTimeSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  time: string;
  dateAndTime: string;
  type: string;
  available: boolean;
}

export interface Location {
  latitude: string;
  longitude: string;
}
