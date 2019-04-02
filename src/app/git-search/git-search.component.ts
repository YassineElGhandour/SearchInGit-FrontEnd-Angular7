import { Component, OnInit, ViewChild } from '@angular/core';
import { GitSearchService } from './git-search.service'
import {MatPaginator, MatTableDataSource} from '@angular/material';
import Swal from 'sweetalert2';
import { PeriodicElement } from './periodic-element'

@Component({
  selector: 'app-git-search',
  templateUrl: './git-search.component.html',
	styleUrls: ['./git-search.component.css'],
	providers: [GitSearchService]
})
export class GitSearchComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;

	dataSource: MatTableDataSource<PeriodicElement>
	displayedColumns: string[] = ['owner', 'name', 'informations'];
	  
	constructor(private searchInGitServices: GitSearchService) { 
	}

	ngOnInit() {
	}

	searchInGit(search: string) {
		this.searchInGitServices.searchInGitFunction(search).subscribe(
			response => {
				const ELEMENT_DATA: PeriodicElement[] = response['repositories']
				this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA)
				this.dataSource.paginator = this.paginator
			},
			error =>  console.log(error))
	}

	alertInformations(url: any, desc: any, lng :any, followers: any){
		Swal.fire({
			title: '<strong>Informations</strong>',
			html:
				'<br>'+
				'<div>'+
					'<strong>URL</strong> : ' + url + ''
				+'</div>'+
				'<div>'+
					'<strong>Description</strong> : ' + desc + ''
				+'</div>'+
				'<div>'+
					'<strong>Language</strong> : ' + lng + ''
				+'</div>'+
				'<div>'+
					'<strong>Followers</strong> : ' + followers + ''
				+'</div>'
				,
			showCloseButton: true,
			focusConfirm: false,
			confirmButtonText:
			  '<i class="fa fa-thumbs-up"></i> Quit'
		  })
	}	
}