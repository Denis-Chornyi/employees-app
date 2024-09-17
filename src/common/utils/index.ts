import moment from 'moment';

type Worker = {
  name: string;
  email: string;
  tag: string;
  position: string;
  birthDate: string;
  sortedWorkers?: void;
};

export const getDisplayedEmployees = (
  employees: Worker[],
  positionValue: string | undefined,
  searchText: string | undefined,
  sortCriteria: 'alphabet' | 'birthday'
): Worker[] => {
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

export const groupedWorkers = (sortedWorkers: Worker[], sortCriteria: 'alphabet' | 'birthday') =>
  sortCriteria !== 'alphabet'
    ? sortedWorkers.reduce((acc, worker) => {
        const year = moment(worker.birthDate).format('YYYY');
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(worker);
        return acc;
      }, {} as Record<string, Worker[]>)
    : { '': sortedWorkers };
