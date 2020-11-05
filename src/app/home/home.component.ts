import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/todo.service';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    p: number = 1;
    todos: Todo[] = [];
    todo: Todo = new Todo();
    errorCuestionario: boolean = false;
    mostrarSoloTitulos: boolean = false;
    titulos: string[] = [];
    estadisticas: any = {
        true: "",
        false: ""
    }
    constructor(private _todoService: TodoService) {}

    ngOnInit() {
        this.mostrarTodos();
        this.getEstadisticas();
    }

    mostrarTodos() {
        this._todoService.getTodos().subscribe(
            todos => {
                this.todos = todos
                this.mostrarSoloTitulos = false;
            }
        );
    }
    mostrarCompletados() {
        this._todoService.getTodos('true').subscribe(
            todos => {
                this.todos = todos
                this.mostrarSoloTitulos = false;
            }
        );

    }
    mostrarPendientes() {
        this._todoService.getTodos('false').subscribe(
            todos => {
                this.todos = todos
                this.mostrarSoloTitulos = false;
            }
        );
    }
    mostrarTitulos() {
        this._todoService.getTitulos().subscribe(
            titulos => {
                this.titulos = titulos;
                this.mostrarSoloTitulos = true;
            });
    }

    getEstadisticas() {
        this._todoService.getEstadisticas().subscribe(
            (data: any) => {
                this.estadisticas = data;
            })
    }

    filtrarUser(event: Event) {
        let userId: number = +(event.target as HTMLInputElement).value;
        console.log(userId);
        if (userId != null && userId > 0)
            this.buscarPorUsuario(userId);
        else
            this.mostrarTodos();

    }
    buscarPorUsuario(userId: number) {
        this._todoService.getTodoByUserId(userId).subscribe(data => {
            this.todos = data;
        })
    }


    guardarTodo(forma: NgForm) {
        console.log("entra por aqui");
        if (forma.valid == true) {
            this.errorCuestionario = false;
            // PARA EVITAR EL ALIASSING
            let todoNuevo: Todo = new Todo();
            todoNuevo = Object.assign({}, this.todo);


            this._todoService.create(this.todo).subscribe(data => {
                // Asignamos la id que nos devuelve la api a nuestro nuevo cuestionario
                todoNuevo.id = data.id;
                this.todos.unshift(todoNuevo);
                Swal.fire('', 'Se ha creado una nueva tarea!!', 'success')
            });
            // Introducimos el nuevo cuestionario en local
            // Reseteamos el form
            forma.reset();
        } else {
            Swal.fire('', 'Se ha produccido un error con los datos, revise el formulario!', 'error')
            this.errorCuestionario = true;
        }
    }

}
