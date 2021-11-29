import { Pipe, PipeTransform } from "@angular/core";
import * as _ from "underscore";

@Pipe({
    name: "dataHider"
})
export class DataHiderPipe implements PipeTransform {
    transform(value: number | string | undefined) {
        if (_.isString( value )) {
            var intvalue = parseInt(value);

            if (!_.isUndefined(intvalue) && intvalue == 0) {
                return '';
            }
        } else if (value == 0) {
            return '';
        }

        return value;
    }
}