export interface IDateProvider{
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  addDays(days: number): Date
  dateNow(): Date;
}