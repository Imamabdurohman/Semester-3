students = [
    ("Andi", 78),
    ("Budi", 65),
    ("Citra", 85),
    ("Dewi", 72),
    ("Eka", 90)
]

def mergeSort(arr):
    if len(arr) <= 1:
        return arr
    else:
        mid = len(arr) // 2
        left = mergeSort(arr[:mid])
        right = mergeSort(arr[mid:])
        return merge(left, right)

def merge(left, right):
    nL, nR = len(left), len(right)
    i = j = 0
    result = []
    while i < nL and j < nR:
        if left[i][1] <= right[j][1]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    if i < nL:
        result.extend(left[i:])
    if j < nR:
        result.extend(right[j:])
    return result

sorted_students_merge = mergeSort(students)
print("Hasil Merge Sort:")
for student in sorted_students_merge:
    print(student)