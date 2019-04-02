import { Injectable } from '@angular/core'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GitSearchService {

	baseurl = 'http://127.0.0.1:3001'
	httpOptions = {
    headers: new HttpHeaders({
			'Content-Type':  'application/json',
    })
  } 

	constructor(private http: HttpClient) { }

	searchInGitFunction(search): Observable<any> {
    return this.http.post(this.baseurl + '/api/search/', {"search": search}, this.httpOptions)
  }

}