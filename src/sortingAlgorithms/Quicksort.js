export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function quickSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx >= endIdx) return;
  const pivotIdx = partition(mainArray, startIdx, endIdx, auxiliaryArray, animations);
  quickSortHelper(mainArray, startIdx, pivotIdx - 1, auxiliaryArray, animations);
  quickSortHelper(mainArray, pivotIdx + 1, endIdx, auxiliaryArray, animations);
}

function partition(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  const pivotValue = mainArray[endIdx];
  let pivotIdx = startIdx;
  for (let i = startIdx; i < endIdx; i++) {
    animations.push({ bars: [i, endIdx], swap: false }); // Comparison animation
    if (mainArray[i] <= pivotValue) {
      animations.push({ bars: [i, pivotIdx], swap: true }); // Swap animation
      swap(mainArray, i, pivotIdx);
      pivotIdx++;
    }
  }
  animations.push({ bars: [pivotIdx, endIdx], swap: true }); // Swap pivot with the right position
  swap(mainArray, pivotIdx, endIdx);
  return pivotIdx;
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
