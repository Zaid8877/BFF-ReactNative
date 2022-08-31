import React, {useEffect, useState} from "react";
import {Text} from "react-native";

const CallDurationComponent = ({joinSucceded, callEnded}) => {
    const [time, setTime] = useState(0)
    useEffect(()=>{
        if(joinSucceded){
            startTimerAndCalculateTime()
        }
        else{
            setTime(0)
        }
    },[joinSucceded, time])

    const startTimerAndCalculateTime=()=>{
        setTimeout(()=>{
            if(joinSucceded){
                setTime(time+1)
            }
        },1000)
    }
    const getConvertTime = () => {
        const d = Number(time);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        // var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "00";
        // var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "00";
        // var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "00";
        //
        var hDisplay = h > 0 ? h + " : " : "00 : ";
        var mDisplay = m > 0 ? m + " : " : "00 : ";
        var sDisplay = s > 0 ? s + "" : "00";
        return hDisplay + mDisplay + sDisplay;
    }
    const renderComponentData=()=>{
        if(joinSucceded || callEnded){
            return <Text style={{alignSelf: 'center', fontWeight: 'bold', marginBottom:20, fontSize: 26}}>{getConvertTime()}</Text>
        }
        else if(!joinSucceded){
            return null
        }
    }
    return renderComponentData();
}
export default CallDurationComponent
