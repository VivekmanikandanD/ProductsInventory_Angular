import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productFilter'
})
export class ProductsFilterPipe implements PipeTransform{
    transform(value: any[], args: string): any[] {
        //console.log(value);
        //console.log(args);
        let searchFilter: string = args ? args.toLocaleLowerCase() : null;
        return searchFilter ? value.filter(product => 
            product.productname.toLocaleLowerCase().includes(searchFilter) != false) : value;
    }
}
