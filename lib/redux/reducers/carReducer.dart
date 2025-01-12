import 'package:nayla_motor_car/redux/reducers/carReducerClass.dart';
import 'package:nayla_motor_car/redux/actions/addToWishList.dart';
import 'package:nayla_motor_car/redux/actions/pop.dart';

CarRed carsReducer(CarRed state,dynamic action){
if (action is AddWishList ){
  return CarRed(carSlugs: [...state.carSlugs,action.carSlug]);
}else if (action is PopWishList){
  return CarRed(
    carSlugs: action.carSlugs
  );
}else{
  return state;
}


}