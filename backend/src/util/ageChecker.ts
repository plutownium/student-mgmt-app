export function studentIsAtLeastTen(studentDOB: Date): boolean {
    const currentDate = new Date();
    const tenYearsAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 10));
    return studentDOB > tenYearsAgo;
}
