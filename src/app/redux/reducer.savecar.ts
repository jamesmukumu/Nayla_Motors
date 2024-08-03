import { createReducer,on } from "@ngrx/store";
import { saveCartocomparision } from "./action.savecartocompare";
var initialState:string[]  = []

export var saveCarReducer = createReducer(
initialState,
on(saveCartocomparision,(state,action)=>[...state,action.slug])
)
       