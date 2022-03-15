import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customTime'
})
export class CustomTimePipe extends DatePipe implements PipeTransform {
  override transform(value: any, args?: any): any {
    // transformed values will be in minutes
    let hours = (parseInt(value) / (60)).toFixed(1);
    let days = (parseInt(value) / (60 * 24)).toFixed(1);
    if (parseInt(value) < 60) return value + " mins";
    else if (parseInt(hours) < 24) return hours + " h";
    else return days + " Days";
  }
}