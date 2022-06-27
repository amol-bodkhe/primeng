import { Component ,OnChanges,OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnChanges{
  title = 'primeng';
  currentTime:any;
  products: any = [];
  msg:any;
  
  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;

    setInterval(() => {
      this.currentTime = Date.now();
      let hour=new Date().getHours();
      //console.log(hour);
      if(hour>=5 && hour<=12)
      {
        this.msg="Good Morning."
      }
      else if(hour>=12 && hour<=16){
        this.msg="Good Afternoon."
      }
      else if(hour>=16 && hour<=19){
        this.msg="Good Evening."
      }
      else{
        this.msg="Good Night!"
      }
      }
      // console.log(this.currentTime);
    , 1000);
      }

  ngOnChanges() {
   
      
        }
  
}
