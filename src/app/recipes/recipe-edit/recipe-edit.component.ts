import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {ActivatedRoute , Params, Router} from '@angular/router'
import { RecipeService } from '../recipe.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-recipe-edit',
  standalone : true,
  imports : [ReactiveFormsModule , NgFor],
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

    id : number ;
    editMode = false;
    recipeForm : FormGroup;


  constructor(private route : ActivatedRoute , 
    private recipeService : RecipeService,
    private router : Router){}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    if(this.editMode){
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name , Validators.required),
              'amount' : new FormControl(ingredient.amount , [Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName , Validators.required),
      'imagePath' : new FormControl(recipeImagePath , Validators.required ),
      'description' : new FormControl(recipeDescription , Validators.required),
      'ingredients' : recipeIngredients,
    });
  }

    onSubmit(){

        // Don't need these values, instead we can put form values directly. 
        // const recipeName = this.recipeForm.value.name;
        // const recipeImagePath = this.recipeForm.value.imagePath;
        // const recipeDescription = this.recipeForm.value.description;
        // const recipeIngredients = this.recipeForm.value.ingredients;
      if(this.editMode){
        //const newRecipe = new Recipe(this.id , recipeName , recipeDescription ,recipeImagePath  , recipeIngredients);
        this.recipeService.updateRecipe(this.id , this.recipeForm.value);
      }
      else {
        //const newRecipe = new Recipe(this.recipeService.getRecipesSize() + 1 , recipeName , recipeDescription ,recipeImagePath  , recipeIngredients);
        this.recipeService.addRecipe(this.recipeForm.value );
      }
      this.onCancel();
    }

    onCancel(){
      this.router.navigate(['../'] , {relativeTo : this.route})
    }

    onDeleteIngredient(index : number){
     (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    onDeleteAllIngredients(){
      (<FormArray>this.recipeForm.get('ingredients')).clear();
    }
  
    get controls(){
      return (this.recipeForm.get('ingredients') as FormArray).controls;
    }

    onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name' : new FormControl(null , Validators.required),
          'amount' : new FormControl(null , [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }),
      )
    }
  }
