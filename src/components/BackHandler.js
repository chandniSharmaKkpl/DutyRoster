import React, {useState, useCallback, useEffect} from 'react';
import {BackHandler} from 'react-native'; 

export default function useBackButton(handler) {
    // Frustration isolated! Yay! 🎉
    // useEffect(() => {
    //   BackHandler.addEventListener("hardwareBackPress", handler);
  
    //   return () => {
    //     BackHandler.removeEventListener(
    //       "hardwareBackPress",
    //       handler
    //     );
    //   };
    // }, []);
  }