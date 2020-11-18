import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ProductService } from '../product.service';
import { MatSnackBar } from '@angular/material';
import { Products } from '../products';

@Component({
  selector: 'app-topviewedproducts',
  templateUrl: './topviewedproducts.component.html',
  styleUrls: ['./topviewedproducts.component.css']
})
export class TopviewedproductsComponent implements OnInit,AfterViewInit {
  
  products:Products[];

  productlabels=[];
  isviewedproduct=[];
  topviewedproductsobj:Products[];
  customizedtopviewedproductsobj:Products[];
  public myChart: Chart;

  @ViewChild('topviewedchart',{static:false})
  private topviewedChartComponent: Chart;

  constructor(private productsvc:ProductService,private _snackBar: MatSnackBar) { }
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = this.productlabels; //['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [
    { data: this.isviewedproduct, label: 'Products' }
  ];

  ngAfterViewInit(){
    
  }

  ngOnInit() {
    this.productsvc.getProducts().subscribe((products:Products[])=>
    {
      this.products=products;
      this.topviewedproductsobj=products;

      this.products.forEach(_=>{
        this.productlabels.push(_.productname);
        this.isviewedproduct.push(_.isViewed);
      });
    },
    
    err=>{
      console.log("Top viewed products error "+err);
      this._snackBar.open("There were some errors fetching products, Please check after some time", "x", {
        duration: 2000,
      });

    });
  }

  customizetopviewedproducts(getvalue){
    console.log("getvalue "+getvalue);
    
    if(getvalue=="top3"){
      this.customizedtopviewedproductsobj = this.topviewedproductsobj.sort((a,b) => b.isViewed-a.isViewed).slice(0,3);

      this.customizedtopviewedproductsobj.forEach(_=>{
        this.productlabels.push(_.productname);
        this.isviewedproduct.push(_.isViewed);
      });
      //this.myChart.destroy(); //destroy prev chart instance

      this.barChartLabels=[];
      this.barChartData[0].data=[];
      this.barChartLabels=this.productlabels;
      this.barChartData[0].data=this.isviewedproduct;

      //console.log(JSON.stringify( this.customizedtopviewedproductsobj)); 
    }
    else if(getvalue=="top5"){
      this.customizedtopviewedproductsobj = this.topviewedproductsobj.sort((a,b) => b.isViewed-a.isViewed).slice(0,5);

      this.customizedtopviewedproductsobj.forEach(_=>{
        this.productlabels.push(_.productname);
        this.isviewedproduct.push(_.isViewed);
      });
      //this.myChart.destroy(); //destroy prev chart instance

      this.barChartLabels=[];
      this.barChartData[0].data=[];
      this.barChartLabels=this.productlabels;
      this.barChartData[0].data=this.isviewedproduct;

      //console.log(JSON.stringify( this.customizedtopviewedproductsobj)); 
    }
    else if(getvalue=="top10"){
      this.customizedtopviewedproductsobj = this.topviewedproductsobj.sort((a,b) => b.isViewed-a.isViewed).slice(0,10);

      this.customizedtopviewedproductsobj.forEach(_=>{
        this.productlabels.push(_.productname);
        this.isviewedproduct.push(_.isViewed);
      });
      //this.myChart.destroy(); //destroy prev chart instance

      this.barChartLabels=[];
      this.barChartData[0].data=[];
      this.barChartLabels=this.productlabels;
      this.barChartData[0].data=this.isviewedproduct;

      //console.log(JSON.stringify( this.customizedtopviewedproductsobj)); 
    }
  }

}
