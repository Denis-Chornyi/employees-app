import moment from 'moment';

type Employee = {
  name: string;
  email: string;
  tag: string;
  position: string;
  birthDate: string;
  sortedEmployees?: void;
};

export const getDisplayedEmployees = (
  employees: Employee[],
  positionValue: string | undefined,
  searchText: string | undefined,
  sortCriteria: 'alphabet' | 'birthday'
): Employee[] => {
  const filteredEmployees = employees.filter(
    ({ position, name, tag, email }) =>
      (!positionValue ||
        positionValue === 'everybody' ||
        position.toLowerCase() === positionValue.toLowerCase()) &&
      (!searchText ||
        [name, tag, email].some(field =>
          field?.toString().toLowerCase().includes(searchText.toLowerCase())
        ))
  );

  return filteredEmployees.sort((a, b) => {
    if (sortCriteria === 'alphabet') {
      return a.name.localeCompare(b.name);
    } else if (sortCriteria === 'birthday') {
      return new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
    } else {
      return 0;
    }
  });
};

export const groupedEmployees = (sortedEmployee: Employee[], sortCriteria: 'alphabet' | 'birthday') =>
  sortCriteria !== 'alphabet'
    ? sortedEmployee.reduce((acc, employee) => {
        const year = moment(employee.birthDate).format('YYYY');
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(employee);
        return acc;
      }, {} as Record<string, Employee[]>)
    : { '': sortedEmployee };
