import { DailySchedule, TimeSlot, Gym } from "../domain/suggestion.domain";
import { v4 as uuidv4 } from "uuid";

// this is place holder for mock data
// TODO: get Data from DB

export const getGymsSessions = async (): Promise<Gym[]> => {
  let gymsWeekSessions: Gym[] = [];
  gymsData.forEach((gym: any) => {
    const _gymWeekSessions: Gym = {
      id: gym.id,
      city: gym.city,
      name: gym.name,
      code: gym.code,
      score: gym.score,
      location: {
        latitude: gym.address.latitude,
        longitude: gym.address.longitude,
      },
      weekSchedule: getWeeklySchedule(gym.timeSlots),
    };
    gymsWeekSessions.push(_gymWeekSessions);
  });
  return gymsWeekSessions;
};

const getWeeklySchedule = (timeSlots: TimeSlot[]): DailySchedule[] => {
  let dailySchedule: DailySchedule[] = [];
  _weeks1.forEach((w) => {
    const week: DailySchedule = {
      id: w.id,
      code: w.code,
      day: w.day,
      date: w.date,
      dailyTimeSlots: getDailyTimeSlots(w.date, timeSlots),
    };
    dailySchedule.push(week);
  });
  return dailySchedule;
};

const getDailyTimeSlots = (date: string, slots: TimeSlot[]): TimeSlot[] => {
  let _slots: TimeSlot[] = [];
  slots.forEach((slot) => {
    const s: any = {
      id: uuidv4(),
      time: slot,
      dateAndTime: `${date} ${slot}`,
      type: "general",
      available: true,
    };
    _slots.push(s);
  });
  return _slots;
};
// format yyyy-mm-dd
const _weeks1 = [
  { day: "MONDAY", id: 1, code: "mon", date: "2021-07-06" },
  { day: "TUESDAY", id: 2, code: "tue", date: "2021-02-07" },
  { day: "WEDNESDAY", id: 3, code: "wed", date: "2021-07-08" },
  { day: "THURSDAY", id: 4, code: "thu", date: "2021-04-09" },
  { day: "FRIDAY", id: 5, code: "fri", date: "2021-03-10" },
];

const gymsData = [
  {
    id: 1001,
    city: "LA",
    name: "gym1",
    code: "101",
    score: 0.3,
    address: { latitude: 33.9540723, longitude: 118.3636729 },
    timeSlots: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"],
  },
  {
    id: 1002,
    city: "LA",
    name: "gym2",
    code: "102",
    score: 0.9,
    address: { latitude: 34.002827, longitude: -118.331835 },
    timeSlots: ["10:00 AM", "12:00 PM", "2:00 PM", "3:00 PM"],
  },
  {
    id: 1003,
    city: "LA",
    name: "gym3",
    score: 0,
    code: "103",
    address: { latitude: 33.9988632, longitude: -118.3498971 },
    timeSlots: ["11:00 AM", "1:00 PM", "3:00 PM"],
  },
];
