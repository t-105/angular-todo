import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Todo, Tags } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  // Models
  todos: Todo[];
  tags: Tags[];

  searchTag = '';
  orderByKey=''

  todoForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.getTags();
    this.initForm();
    this.todos = [];
  }

  initForm(): void {
    this.todoForm = new FormGroup({
      inputTitle: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      inputDescription: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      inputDueDate: new FormControl(null, Validators.required),
      inputPersonal: new FormControl(false),
      inputWork: new FormControl(false),
      inputImportant: new FormControl(false),
    })
  }

  // Get each tag to be used for tags inputs
  getTags() {
    this.tags = [
      {id: 1, name: 'Personal', isSelected: false},
      {id: 1, name: 'Work', isSelected: false},
      {id: 1, name: 'Important', isSelected: false}
    ]
  }


  // On click of a filter, make the searchTag equal to name of button being pressed, this will be passed to custom pipe
  tagFilter(name) {
    this.searchTag = name;
  }

  // On click of remove button, filter each todo and only return the one with the id not specified by the boutton
  deleteTodo (id:number) {
    this.todos = this.todos.filter((todo, index) => index !== id);
  }

  // Method to add a todo
  addTodo () {
    
    // This will filter through all the current tags, if isSelected is true, we will include them when adding a todo
    let filteredItemTags = this.tags.filter((tag) => tag.isSelected === true);
    if (this.todoForm.get('inputPersonal').value) {
      filteredItemTags.push(this.tags[0]);
    }
    if (this.todoForm.get('inputWork').value) {
      filteredItemTags.push(this.tags[1]);
    }
    if (this.todoForm.get('inputImportant').value) {
      filteredItemTags.push(this.tags[2]);
    }

    // push all inputs from form into the todos array of objects
    this.todos.push({
      title: this.todoForm.get('inputTitle').value,
      content: this.todoForm.get('inputDescription').value,
      duedate: this.todoForm.get('inputDueDate').value,
      itemTags: filteredItemTags,
      completed: false
    })

    this.initForm();
  }
  
  setOrderByKey(name) {
    this.orderByKey = name;
  }

  // When clicking the reset button, all todo items will be shown, rather than just the filtered ones.
  resetFilter() {
    this.searchTag='';
    this.orderByKey='';
  }

}

