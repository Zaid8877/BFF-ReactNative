import { CommonActions} from "@react-navigation/native";
import { StackActions } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(name, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params
    })
  );
}

function push(name, params) {
  navigator.dispatch(
    StackActions.push(
      name,
      params
    )
  );
}


function goBack() {
  navigator.dispatch(CommonActions.goBack());
}


function openDrawer() {
  try{
    navigator.dispatch(DrawerActions.toggleDrawer());
    console.log('open drawer')
  }
  catch(err){
    console.log(err)
  }
}

function closeDrawer() {
  console.log('close drawer')
  navigator.dispatch(DrawerActions.closeDrawer());
}


export default {
  navigate,
  setTopLevelNavigator,
  goBack,
  push,
  openDrawer,
  closeDrawer
};