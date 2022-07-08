import { identifierModuleUrl } from '@angular/compiler';
import { RESTORED_VIEW_CONTEXT_NAME } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  users: Array<User> = [];
  userId: string | null = "";

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private actRoute: ActivatedRoute,
    private route: Router) { 

    this.userForm = this.formBuilder.group({
      id: this.generateId(),
      name: "",
      surname: "",
      age: "",
      profission: ""
    })
  }

  ngOnInit(): void {
    this.generateId();
    this.actRoute.paramMap.subscribe(
      params => {
        this.userId = params.get("form_id");

        if(this.userId !== null){
          this.userService.getUserById(this.userId).subscribe(
            result => {
              this.userForm.patchValue({
                id: result[0].id,
                name: result[0].name,
                surname: result[0].surname,
                age: result[0].age,
                profission: result[0].profission
              })
            }
          )
        }
      }
    )
  }

  generateId(): any{

    this.userService.getUsers().subscribe(
      result => {
        console.log(Number(result.slice(-1)[0].id)+1);
        return Number(result.slice(-1)[0].id)+1;
        },
      error => {
        console.log("Erro ao obter id do usuário!");
        return 0;
      }
    );
  }

  createUser(){
    this.userService.createUser(this.userForm.value).subscribe(
      result => {
        console.log(`Usuário ${result.name} ${result.surname}[${result.id}] cadastrado com sucesso.`);
      },
      (err) => {
        this.route.navigate(['/']);
      }
    );

    this.userForm.value.id = this.generateId();
  }

  updateUser(){
    if(this.userId !== null){
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        result => {
          console.log(`Usuário Atualizado com Sucesso! Detalhes: ${result}`);
        },
        (err) => {
          this.route.navigate(['/']);
        }
      );
    }
  }

  actionButton(){
    if(this.userId !== null){
      this.updateUser();
    }else{
      this.createUser();
    }

  }

}
