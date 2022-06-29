import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { map } from 'rxjs/operators';
import { Product } from '../product';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
//for  Excell..
import * as XLSX from 'xlsx';
//import html2canvas for image creation.
import html2canvas from 'html2canvas';




(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

//const path=require('path');

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	products: any = [];
	rows: any = new Array();
	size: any;
	//src='../../assets/image/nature.jpg';

	@ViewChild('table3', {static: true}) 'table3': ElementRef  
	constructor(private productService: ProductService) {
	}

	ngOnInit(): void {
		this.productService.getProductsSmall().pipe(map((data) => {
			//console.log(path._dirname());
			return data;
		})).subscribe(data => {
			console.log();
			//  this.size = Object.keys(data.length);
			//  console.log(this.size);
			return this.products = data;
		})

		// this.products = [
		//   {
		//     name: 'Amol',
		//     dept: 'IT'
		//   },
		//   {
		//     name: 'Sikander',
		//     dept: 'IT'
		//   },
		//   {
		//     name: 'Neha',
		//     dept: 'IT'
		//   },
		//   {
		//     name: 'Diksha',
		//     dept: 'IT'
		//   }
		// ];
	}
	
	image(){
		html2canvas(this.table3.nativeElement).then((canvas)=>{
		const base64image=canvas.toDataURL("image/png");
		const anchor=document.createElement("a");
		anchor.setAttribute("href",base64image);
		anchor.setAttribute("download","table_image.png");
		anchor.click();
		anchor.remove();
	});
}
	async createPdfFormat() {
		this.rows = [];
	
		this.rows.push([
			{ text: 'id', bold: true },
			{ text: 'code', bold: true },
			{ text: 'name', bold: true },
			{ text: 'description', bold: true }
		]);
		for (let i = 0; i < this.products.data.length; i++) {
			this.rows.push([
				{ 'text': this.products.data[i].id },
				{ 'text': this.products.data[i].code },
				{ 'text': this.products.data[i].name },
				{ 'text': this.products.data[i].description }
			]);
		}

		//console.log('ALEX', this.rows)

		var docDefinition = {
			// pageMargins:[40,40,40,100],
			content: [
				{text:'My Header', color:'orange', bold:true, italics:true,padding:[0,'auto',0,'auto']},
				// {
				// // 	image:'../../assets/image/nature.jpg',
				// image: 'data:../../assets/image/nature.jpg;base64,...encodedContent...'
				//  },
				'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines', 'ghjhjhhjk',
				{ text: "very good", style: 'header' },
				'Following design new table for dummyb data',
				// {
			 	// 	image: this.src,				  
			 	//   	width:'100px'	
				// 	// height:'100px'
				//  },
				{
					table: {
						widths: ['25%', '25%', '25%'],

						body: [
							['Column 1', 'Coludfgdfgfgdfgdfmn 2', 'Column 3'],
							[
								{ text: 'One value goes here', lineHeight: 2 },
								{ text: 'Another one here', lineHeight: 2 },
								{ text: 'OK?', lineHeight: 2 }
							]
						]
					}
				},

				{ text: 'how many days are you give chokolate?', style: 'substyle' },
				'Here now Second Table is designed now.',
				// {
				// 	table: {
				// 		widths: [],
				// 		body: this.rows
				// 	}
				// }

			]
		};

		//for image code external
		
		pdfMake.createPdf(docDefinition).open();
	}

	// getBase64ImageFromURL(url) {
	// 	return new Promise((resolve, reject) => {
	// 	  var img = new Image();
	// 	  img.setAttribute("crossOrigin", "anonymous");
	// 	  img.onload = () => {
	// 		var canvas = document.createElement("canvas");
	// 		canvas.width = img.width;
	// 		canvas.height = img.height;
	// 		var ctx = canvas.getContext("2d");
	// 		ctx.drawImage(img, 0, 0);
	// 		var dataURL = canvas.toDataURL("image/png");
	// 		resolve(dataURL);
	// 	  };
	// 	  img.onerror = error => {
	// 		reject(error);
	// 	  };
	// 	  img.src = url;
	// 	});
	//   }



	//export data in excell file --function
	exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, `${'excell'+Date.now()+'.xlsx'}`);
 
  }

 }
