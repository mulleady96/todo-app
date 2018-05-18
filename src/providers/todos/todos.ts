import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TodosProvider {

  data: any;  

  constructor(public http: Http) {
    this.data = null;
  }

  getTodos(){

    if (this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('http://localhost:8080/api/todos')
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
    });
  }


  createTodo(todo){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:8080/api/todos', JSON.stringify(todo), {headers: headers})
    .subscribe(res => {
      console.log(res.json());
    });
  }


  deleteTodo(id){

    this.http.delete('http://localhost:8080/api/todos/' + id)
    .subscribe((res) => {
      console.log(res.json());
    });
  }

}
