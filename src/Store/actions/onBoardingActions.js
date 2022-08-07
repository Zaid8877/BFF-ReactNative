import {OnBoardingStatus} from '../types/onBoarding';

export const setOnBoardingViewed = payload=>dispatch=>{
    dispatch({
        type:OnBoardingStatus,
        payload
    })
}
