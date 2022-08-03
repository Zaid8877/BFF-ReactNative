import Toast from 'react-native-root-toast';

export const showToast = (message = "This will be implemented later", duration = Toast.SHORT)=> {
        Toast.show(message, duration)
}
