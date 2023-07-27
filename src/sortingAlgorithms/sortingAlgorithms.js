export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }


 export  function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    
    const auxiliaryArray = array.slice();
    bubbleSortHelper(auxiliaryArray, animations);
    
    return animations;
  }
  
  function bubbleSortHelper(auxiliaryArray, animations) {
    const length = auxiliaryArray.length;
    
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        animations.push({ bars: [j, j + 1], swap: false }); // Comparison animation
        
        if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
          animations.push({ bars: [j, j + 1], swap: true }); // Swap animation
          swap(auxiliaryArray, j, j + 1);
        }
      }
    }
  }
  
  function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  

  export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
  
    selectionSortHelper(array, animations);
  
    return animations;
  }
  
  function selectionSortHelper(array, animations) {
    const length = array.length;
  
    for (let i = 0; i < length - 1; i++) {
      let minIndex = i;
  
      for (let j = i + 1; j < length; j++) {
        animations.push({ bars: [minIndex, j], swap: false }); // Comparison animation
  
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      animations.push({ bars: [i, minIndex], swap: true }); // Swap animation
      swap(array, i, minIndex);
    }
  }
  
  // function swap(array, i, j) {
  //   const temp = array[i];
  //   array[i] = array[j];
  //   array[j] = temp;
  // }
  