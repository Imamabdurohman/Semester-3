students = [
    ("Andi", 78),
    ("Budi", 65),
    ("Citra", 85),
    ("Dewi", 72),
    ("Eka", 90)
]

def quickSort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[-1]
        left = [x for x in arr[:-1] if x[1] <= pivot[1]]
        right = [x for x in arr[:-1] if x[1] > pivot[1]]
        return quickSort(left) + [pivot] + quickSort(right)

sorted_students_quick = quickSort(students)
print("\nHasil Quick Sort:")
for student in sorted_students_quick:
    print(student)