import { TodosType } from 'src/types/Todos.type';
import { NotesType } from './types/Notes.type';

type DaylistType = {
  date: Date;
  todos: TodosType[];
};
function getWeekdays(today: Date = new Date()): Date[] {
  const startOfWeek = new Date(today);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(currentDate.getDate() + i);
    weekdays.push(new Date(currentDate));
  }
  return weekdays;
}

function normalizeDate(date: Date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// get the 7 days from this week (Mon-Sun)
const weekdays = getWeekdays();
// expand days arrays adding 7 days forward and 7 days backwards
// for each day -> create a new date -> it uses a new date for each of the 7 days, setting the date to the next/previous week
const nextWeekDays = weekdays.map(
  (day) => new Date(new Date(day).setDate(day.getDate() + 7)),
);
const prevWeekDays = weekdays.map(
  (day) => new Date(new Date(day).setDate(day.getDate() - 7)),
);
// Group next week + this week + prevweek
const days = [...prevWeekDays, ...weekdays, ...nextWeekDays];

const mockdata = [
  {
    date: days[0],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Hola',
    done: false,
  },
  {
    date: days[1],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Mundo',
    done: false,
  },
  {
    date: days[0],
    id: crypto.randomUUID().slice(0, 7),
    task: 'React',
    done: false,
  },
  {
    date: days[3],
    id: crypto.randomUUID().slice(0, 7),
    task: 'JS',
    done: true,
  },
  {
    date: days[3],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Vue',
    done: false,
  },
  {
    date: days[0],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Tailwind',
    done: true,
  },
  {
    date: days[6],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Hi',
    done: false,
  },
  {
    date: days[0],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Bye',
    done: false,
  },
  {
    date: days[6],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Do',
    done: true,
  },
  {
    date: days[4],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Redo',
    done: false,
  },
  {
    date: days[1],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Hello',
    done: false,
  },
  {
    date: days[2],
    id: crypto.randomUUID().slice(0, 7),
    task: 'World',
    done: false,
  },
  {
    date: days[4],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Jest',
    done: true,
  },
  {
    date: days[5],
    id: crypto.randomUUID().slice(0, 7),
    task: 'TypeScript',
    done: false,
  },
  {
    date: days[7],
    id: crypto.randomUUID().slice(0, 7),
    task: 'React Native',
    done: false,
  },
  {
    date: days[8],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Angular',
    done: true,
  },
  {
    date: days[9],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Ember',
    done: false,
  },
  {
    date: days[10],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Backbone',
    done: false,
  },
  {
    date: days[11],
    id: crypto.randomUUID().slice(0, 7),
    task: 'React Router',
    done: true,
  },
  {
    date: days[12],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Redux',
    done: false,
  },
  {
    date: days[13],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Next.js',
    done: false,
  },
  {
    date: days[14],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Svelte',
    done: true,
  },
  {
    date: days[16],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Preact',
    done: false,
  },
  {
    date: days[16],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Vue.js',
    done: false,
  },
   
] as TodosType[];

const mockDataNotes = [
  {
    date: days[6],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Que',
    done: false,
    position: 1
  },
  {
    date: days[7],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Tal',
    done: false,
    position: 2
  },
  {
    date: days[8],
    id: crypto.randomUUID().slice(0, 7),
    task: 'Te fué',
    done: false,
    position: 3
  },
] as NotesType[];

async function getDataAsync() {
  return new Promise((res) => {
    setTimeout(() => {
      res(mockdata);
    }, 1000);
  });
}

export async function getNotesAsnyc() : Promise<NotesType[]> {
  return new Promise((res) => {
    setTimeout(() => {
      res(mockDataNotes);
    }, 1000);
  });
}

export async function getTodosForDay(date: Date): Promise<TodosType[]> {
  const normalizedWeek = getWeekdays(date).map(normalizeDate);
  return new Promise((res) => {
    setTimeout(() => {
      res(
        mockdata.filter((todo) =>
          normalizedWeek.includes(normalizeDate(todo.date)),
        ),
      );
    }, 1000);
  });
}

export default getDataAsync;
