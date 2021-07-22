

import { IDateProvider } from "../IDateProvider";
import dayjs from "dayjs";


export class DateProvider implements IDateProvider{
  
  
  addDays(days: number) {
    return dayjs().add(days, "days").toDate()
  }


}