function paintersAlgorithm(faces) {
	quickSort(faces, 0, faces.length - 1);
}

function quickSort(arr, left, right) {

	if (left < right) {
		pivot = right;
		partitionIndex = partition(arr, pivot, left, right);

		quickSort(arr, left, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1, right);
	}
	return arr;
}

function partition(arr, pivot, left, right) {
	var pivotValue = arr[pivot].center.z,
		partitionIndex = left;

	for (var i = left; i < right; i++) {
		if (arr[i].center.z > pivotValue) {
			swap(arr, i, partitionIndex);
			partitionIndex++;
		}
	}
	swap(arr, right, partitionIndex);
	return partitionIndex;
}

function swap(arr, i, j) {
	var temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}

