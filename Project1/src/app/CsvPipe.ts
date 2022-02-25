import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
 
@Pipe({
  name: 'csvPipe'
})
export class CsvPipe implements PipeTransform {
 
  constructor() {
  }
 
  transform(value: string, args?: any): string {
    return value.replace("\"","");
  }
 
}