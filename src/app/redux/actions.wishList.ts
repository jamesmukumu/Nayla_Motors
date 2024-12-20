import {createAction,props} from '@ngrx/store'
export var addToWishList = createAction(
"addWishList",
props<{"carSlug":string}>()
)
export var RemoveFromWish =  createAction(
"removeFromWishList",
props<{"carSlug":string}>()
)
