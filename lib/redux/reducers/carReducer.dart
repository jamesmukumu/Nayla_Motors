import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';
import 'package:nayla_motor_car/redux/actions/addToWishList.dart';


CarRed carsReducer(CarRed state,dynamic action){
if (action is AddWishList ){
  return CarRed(carSlugs: [...state.carSlugs,action.carSlug]);
}else{
  return state;
}


}