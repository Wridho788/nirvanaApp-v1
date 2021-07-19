import moment from "moment";
import { Platform } from "react-native";
import Snackbar from "react-native-snackbar";

export function emailValidation(email) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
        return false;
    }else {
        return true
    }
}

export function dateFormat(date, format){
    return moment(date).utc().format(format)
}

export function showSnackBar(message){
    
    if(Platform.OS == 'ios'){
      Snackbar.show({
        text: message,
        duration: Snackbar.LENGTH_SHORT,
      });
    }else if(Platform.OS == 'android'){
      setTimeout(() => { 
        Snackbar.show({
          text: message,
          duration: Snackbar.LENGTH_SHORT,
        });
      }, 300)
    }
}

export function capitalize(str){
    return String(str).charAt(0).toUpperCase() + String(str).slice(1)
}

export function spacingUpperCase(str){
    return String(str).replace(/([A-Z])/g, " $1")
}

export function convertPrice(number){
   return "Rp. " + String(number).replace(/(.)(?=(\d{3})+$)/g,'$1.')

}

export const verticalAnimation = {
    gestureDirection: 'vertical',
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.height, 0],
              }),
            },
          ],
        },
      };
    },
  };