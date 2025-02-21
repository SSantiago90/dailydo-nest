import { TodosType } from 'src/todos/Todos.type';
const randomThrottle = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);
const THROTTLE  = randomThrottle(100,1200)

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
const days = [...weekdays, ...prevWeekDays, ...nextWeekDays];

const Oldmockdata = [
  {
    date: days[0],
    id: crypto.randomUUID(),
    task: 'Hola',
    done: false,
    isNote: 0,
    user: "67b233aba590c4674f8b3626",
  },
  {
    date: days[1],
    id: crypto.randomUUID(),
    task: 'Mundo',
    done: false,
    isNote: 0,
    user: "67b233b5a590c4674f8b3629",
  },
  {
    date: days[0],
    id: crypto.randomUUID(),
    task: 'React',
    done: false,
    isNote: 0,
    user: "67b233b5a590c4674f8b3629",
  },
  {
    date: days[3],
    id: crypto.randomUUID(),
    task: 'JS',
    done: true,
    isNote: 0,
    user: "67b233b5a590c4674f8b3629"
    
  },
  {
    date: days[3],
    id: crypto.randomUUID(),
    task: 'Vue',
    done: false,
    isNote: 0,
  },
  {
    date: days[0],
    id: crypto.randomUUID(),
    task: 'Tailwind',
    done: true,
    isNote: 0,
  },
  {
    date: days[6],
    id: crypto.randomUUID(),
    task: 'Hi',
    done: false,
    isNote: 0,
  },
  {
    date: days[0],
    id: crypto.randomUUID(),
    task: 'Bye',
    done: false,
    isNote: 0,
  },
  {
    date: days[6],
    id: crypto.randomUUID(),
    task: 'Do',
    done: true,
    isNote: 0,
  },
  {
    date: days[4],
    id: crypto.randomUUID(),
    task: 'Redo',
    done: false,
    isNote: 0,
  },
  {
    date: days[1],
    id: crypto.randomUUID(),
    task: 'Hello',
    done: false,
    isNote: 0,
  },
  {
    date: days[2],
    id: crypto.randomUUID(),
    task: 'World',
    done: false,
    isNote: 0,
  },
  {
    date: days[4],
    id: crypto.randomUUID(),
    task: 'Jest',
    done: true,
    isNote: 0,
  },
  {
    date: days[5],
    id: crypto.randomUUID(),
    task: 'TypeScript',
    done: false,
    isNote: 0,
  },
  {
    date: days[7],
    id: crypto.randomUUID(),
    task: 'React Native',
    done: false,
    isNote: 0,
  },
  {
    date: days[8],
    id: crypto.randomUUID(),
    task: 'Angular',
    done: true,
    isNote: 0,
  },
  {
    date: days[9],
    id: crypto.randomUUID(),
    task: 'Ember',
    done: false,
    isNote: 0,
  },
  {
    date: days[10],
    id: crypto.randomUUID(),
    task: 'Backbone',
    done: false,
    isNote: 0,
  },
  {
    date: days[11],
    id: crypto.randomUUID(),
    task: 'React Router',
    done: true,
    isNote: 0,
  },
  {
    date: days[12],
    id: crypto.randomUUID(),
    task: 'Redux',
    done: false,
    isNote: 0,
  },
  {
    date: days[13],
    id: crypto.randomUUID(),
    task: 'Next.js',
    done: false,
    isNote: 0,
  },
  {
    date: days[14],
    id: crypto.randomUUID(),
    task: 'Svelte',
    done: true,
    isNote: 0,
  },
  {
    date: days[16],
    id: crypto.randomUUID(),
    task: 'Preact',
    done: false,
    isNote: 0,
  },
  {
    date: days[16],
    id: crypto.randomUUID(),
    task: 'Vue.js',
    done: false,
    isNote: 0,
  },
  {
    date: days[6],
    id: crypto.randomUUID(),
    task: 'Que',
    done: false,
    isNote: 1,
  },
  {
    date: days[7],
    id: crypto.randomUUID(),
    task: 'Tal',
    done: false,
    isNote: 2,
  },
  {
    date: days[8],
    id: crypto.randomUUID(),
    task: 'Te',
    done: false,
    isNote: 3,
  },
  {
    date: days[8],
    id: crypto.randomUUID(),
    task: 'fué',
    done: false,
    isNote: 3,
  },

] as TodosType[];

const mockdata = [
  {
    date: days[0],
    id: crypto.randomUUID(),
    task: 'Hola',
    done: false,
    isNote: 0,
    userId: "67b233aba590c4674f8b3626",
  },
  {
    date: days[1],
    id: crypto.randomUUID(),
    task: 'Mundo',
    done: false,
    isNote: 0,
    useuserIdr: "67b233baa590c4674f8b362c",
  },
  {
    date: days[0],
    id: crypto.randomUUID(),
    task: 'React',
    done: false,
    isNote: 0,
    userId: "67b233b5a590c4674f8b3629",
  },
  {
    date: days[3],
    id: crypto.randomUUID(),
    task: 'JS',
    done: true,
    isNote: 0,
    userId: "67b233b5a590c4674f8b3629"    
  },

] as TodosType[];

async function getDataAsync() {
  return new Promise((res) => {
    setTimeout(() => {
      res(mockdata);
    }, THROTTLE);
  });
}

// get all notes
export async function getNotesAsnyc(): Promise<TodosType[]> {
  const notes = mockdata.filter((todo) => todo.isNote !== 0);
  return new Promise((res) => {
    setTimeout(() => {
      res(
        notes.filter(
          (todo) =>            
          {
            return {...todo, date: normalizeDate(todo.date)}
          },
        ),
      );
    }, THROTTLE);
  });
}

// get all todos from monday to sunday for given date
export async function getWeeklyTodosForDay(date: Date): Promise<TodosType[]> {
  const normalizedWeek = getWeekdays(date).map(normalizeDate);
  return new Promise((res) => {
    setTimeout(() => {
      res(
        mockdata.filter(
          (todo) =>
            todo.isNote === 0 &&
            normalizedWeek.includes(normalizeDate(todo.date)),
        ),
      );
    }, THROTTLE);
  });
}

export default getDataAsync;
export { mockdata }
