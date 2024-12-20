import {createReducer,on} from "@ngrx/store"
import { addToWishList,RemoveFromWish } from "./actions.wishList"

var initialWishList:string[] = []
export var wishListReducer = createReducer(
initialWishList,
on(addToWishList,(state,action)=>{
return [...state,action.carSlug]
}),
on(RemoveFromWish,(state,action)=>{
let idxCar = state.indexOf(action.carSlug)
return [...state.slice(0,idxCar),...state.slice(idxCar + 1)]
})


)

