import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DateProvider implements IDateProvider{
  
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
  compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date);
    const start_date_utc = this.convertToUTC(start_date);
    
    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }
  addDays(days: number) {
    return dayjs().add(days, "days").toDate()
  }
}