import { createAction,props } from "@ngrx/store";
export var saveCartocomparision  = createAction(
"saveCar",
props<{ slug: string }>()
)