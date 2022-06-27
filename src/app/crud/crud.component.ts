import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EmployeeModel } from '../model/employee.model';
import { ApiService } from '../shared/api.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as XLSX from 'xlsx';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
// const path = require('path');
// import { NgToastService} from 'ng-angular-popup';
@Component({
	selector: 'app-crud',
	templateUrl: './crud.component.html',
	styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
	EmployeeForm!: FormGroup;
	//EmployeeData!: any;
	showAdd!: boolean;
	showUpdate!: boolean;
	employeemodelobj: EmployeeModel = new EmployeeModel();
	id: any = null;
	EmployeeData: any = [];

	//next
	rows: any = new Array();
	size: any;
	// src = "../../assets/image/nature.jpg";


	//url
	url: any = [];
	constructor(
		//private formControl: FormControl,
		private fb: FormBuilder,
		private apiservice: ApiService,
		// private toast:NgToastService

	) { }



	ngOnInit() {
		this.EmployeeForm = this.fb.group(
			{
				id: [''],
				firstName: [''],
				lastName: [''],
				email: [''],
				mobile: [''],
				address: [''],
				salary: ['']
			})

		this.getEmployeeDetails();
		this.url = this.getCurrentURLArray();
		//console.log(this.url);
		// let p1 = path.join(__dirname, this.src)
		// console.log(p1);
	}

	getEmployeeDetails() {
		this.apiservice.getEmployee().subscribe((res) => {
			//console.log(res);
			this.EmployeeData = res;
			//console.log("FIRST=>",this.EmployeeData);
			// this.EmployeeData.pipe(
			// 	filter(a => a.salary > 20000)
			// )

		});
	}

	clickAddEmployee() {
		this.EmployeeForm.reset();
		//alert('reset data success..!');
		this.showAdd = true;
		this.showUpdate = false;
	}

	postEmployeeDetails() {
		this.employeemodelobj.firstname = this.EmployeeForm.value.firstName;
		this.employeemodelobj.lastname = this.EmployeeForm.value.lastName;
		this.employeemodelobj.email = this.EmployeeForm.value.email;
		this.employeemodelobj.mobile = this.EmployeeForm.value.mobile;
		this.employeemodelobj.address = this.EmployeeForm.value.address;
		this.employeemodelobj.salary = this.EmployeeForm.value.salary;

		this.apiservice.postEmployee(this.employeemodelobj)
			.subscribe(res => {
				//console.log(res);
				alert('Employee Added Successfully..!');
				//this.toast.success({detail:"Add Success",summary:"Employee Added successfully..!",duration:5000})
				let ref = document.getElementById('cancel');
				ref?.click();
				this.EmployeeForm.reset();
				this.getEmployeeDetails();
			},
				err => {
					alert('Something Went Wrong!');
					//this.toast.error({detail:"Error Notification",summary:"Something Went Wrong, Not Added Employee.",duration:5000})

				})
	}



	onEdit(row: any) {
		this.showAdd = false;
		this.showUpdate = true;
		this.id = row.id;
		this.EmployeeForm.patchValue({
			firstName: row.firstname,
			lastName: row.lastname,
			email: row.email,
			salary: row.salary,
			address: row.address,
			mobile: row.mobile
		});
		// this.EmployeeForm.controls['firstName'].setValue(row.firstname);
		// this.EmployeeForm.controls['lastName'].setValue(row.lastname);
		// this.EmployeeForm.controls['email'].setValue(row.email);
		// this.EmployeeForm.controls['salary'].setValue(row.salary);
		// this.EmployeeForm.controls['address'].setValue(row.address);
		// this.EmployeeForm.controls['mobile'].setValue(row.mobile);
	}

	updateEmployee() {
		this.employeemodelobj.firstname = this.EmployeeForm.value.firstName;
		this.employeemodelobj.lastname = this.EmployeeForm.value.lastName;
		this.employeemodelobj.email = this.EmployeeForm.value.email;
		this.employeemodelobj.mobile = this.EmployeeForm.value.mobile;
		this.employeemodelobj.address = this.EmployeeForm.value.address;
		this.employeemodelobj.salary = this.EmployeeForm.value.salary;
		this.employeemodelobj.id = this.id;

		this.apiservice.updateEmployee(this.employeemodelobj, this.id).subscribe(res => {
			console.log(this.id)
			alert('updated Successfully..!');
			//this.toast.success({detail:"Update Success",summary:"Employee Updated successfully..!",duration:5000})


			let ref = document.getElementById('cancel');
			ref?.click();
			this.EmployeeForm.reset();
			this.getEmployeeDetails();
		}, () => {
			alert('Not Updated Employee');
			//this.toast.error({detail:"UPDATE Error Notification",summary:"Not Updated Employee.",duration:5000})

		}
		)
	}

	deleteEmployee(row: any) {
		//alert(Number(row.id));
		//console.log('row.id', row)

		this.apiservice.deleteEmployee(row.id).subscribe(() => {
			alert('Employee Deleted successfully..!');
			//this.toast.success({detail:"Delete Success",summary:"Employee Deleted successfully..!",duration:5000})

			this.getEmployeeDetails();
		}, () => {
			alert('Something Went Wrong, Not Deleted Employee');
			//this.toast.error({detail:"Error Notification",summary:"Something Went Wrong, Not Deleted Employee.",duration:5000})

		}
		);

		// await this.apiservice.deleteEmployee(row.id).subscribe(()=> {
		// 	alert('EmployeeDeleted Successfully..!');
		// 	this.getEmployeeDetails();
		// });
	}





	//for crud operation
	getCurrentURLArray() {
		let w = window.location.href;
		let splitURL = w.toString().split("/");
		//console.log(splitURL);
		return splitURL;
	}

	async createPdfFormat() {
		this.rows = [];

		this.rows.push([
			{ text: 'Employee Name', bold: true },
			// { text: 'lastname', bold: true },
			{ text: 'email', bold: true },
			{ text: 'mobile', bold: true },
			{ text: 'address', bold: true },
			{ text: 'salary', bold: true },
			{ text:'Image', bold: true}
		]);

		for (let i = 0; i < this.EmployeeData.length; i++) {

			this.rows.push([
				{ 'text': this.EmployeeData[i].firstname+' '+this.EmployeeData[i].lastname },
				// { 'text': this.EmployeeData[i].lastname },
				{ 'text': this.EmployeeData[i].email },
				{ 'text': this.EmployeeData[i].mobile },
				{ 'text': this.EmployeeData[i].address },
				{ 'text': this.EmployeeData[i].salary },
				{'text':{ image: await this.getBase64ImageFromURL("assets/img/nature.png")	},
					width: 2,
					height: 2
					// margin: [0, 20],
					// border: [0, 0]
				}

			]);


		}

		var docDefinition = {
			content: [
				{
					table: {
						body: [//tbody start
							[//tr -1 start (could be multiple in one TBODY)
								{//td - 1 (could be multiple in one TR)
									text: 'My Header',
									border: [0],
									color: 'orange',
									bold: true,
									italics: true,
									alignment: 'center',
									padding: [0, 'auto']
								}
							]//tr close
						],//tbody close
						widths: ['100%'], // vary as per number of columns
					}
				},
				'\n',
				{
					text: 'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
				},
				'\n',
				{
					table: {
						widths: ['15%', '15%', '*', '15%', '15%', '15%'],
						body: this.rows
					}
				},
				{
					table: {
						widths: ['100%'],
						body: [
							[
								{
									image: await this.getBase64ImageFromURL("assets/img/nature.png"),
									width: 200,
									height: 200,
									margin: [0, 20],
									border: [0, 0]
								}
							]
						]
					}
				},
			]
		};
		pdfMake.createPdf(docDefinition).open();
	}

	getBase64ImageFromURL(url: any) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.setAttribute('crossOrigin', 'anonymous');
			img.onload = () => {
				const canvas = document.createElement('canvas');
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx: any = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				const dataURL = canvas.toDataURL('image/png');
				resolve(dataURL);
			};
			img.onerror = error => {
				reject(error);
			};
			console.log(url, "IMAGE");
			img.src = url;
		});
	}

	exportexcel(): void {
		/* pass here the table id */
		let element = document.getElementById('excel-table');
		const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

		/* generate workbook and add the worksheet */
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

		/* save to file */
		XLSX.writeFile(wb, `${'excell' + Date.now() + '.xlsx'}`);

	}
}
