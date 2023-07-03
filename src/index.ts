/* eslint-disable no-console */
window.Webflow ||= [];
window.Webflow.push(() => {
  function getAllDataFromLocalStorage(ttl: number): Record<string, unknown> {
    const keys = Object.keys(localStorage);
    const data: Record<string, unknown> = {};

    for (const key of keys) {
      try {
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
          const item = JSON.parse(itemStr);
          if (Date.now() - item.timestamp > ttl) {
            // If the data is expired, remove it from localStorage
            localStorage.removeItem(key);
          } else {
            data[key] = item.data;
          }
        }
      } catch (e) {}
    }

    return data;
  }

  const timerTime = 80 * 1000;
  getAllDataFromLocalStorage(timerTime);
  interface StoredData<T> {
    timestamp: number;
    data: T;
  }

  class LocalStorageHandler<T> {
    // eslint-disable-next-line no-useless-constructor
    constructor(private key: string, private defaultValue: T, private ttl: number = 60 * 1000) {}

    getData(): T {
      const rawData = localStorage.getItem(this.key);

      if (!rawData) {
        this.setData(this.defaultValue);
        return this.defaultValue;
      }

      const storedData: StoredData<T> = JSON.parse(rawData);

      if (Date.now() - storedData.timestamp > this.ttl) {
        this.setData(this.defaultValue);
        return this.defaultValue;
      }

      return storedData.data;
    }

    setData(data: T): void {
      const dataToStore: StoredData<T> = {
        timestamp: Date.now(),
        data: data,
      };

      localStorage.setItem(this.key, JSON.stringify(dataToStore));
    }
  }

  const elementsToChange = document.querySelectorAll(
    '.writer-status__circle'
  ) as NodeListOf<HTMLElement>;
  const textToChange = document.querySelectorAll('.writer-status__text') as NodeListOf<HTMLElement>;
  const writersList = document.querySelectorAll('.writer-status__photo') as NodeListOf<HTMLElement>;

  const writersNames: string[] = [];
  writersList.forEach((writer) => {
    const alt = writer.getAttribute('alt');
    if (alt !== null) {
      writersNames.push(alt);
    }
  });

  function updateStatus() {
    for (let i = 0; i < writersNames.length; i++) {
      const circle = elementsToChange[i] as HTMLElement;
      const text = textToChange[i] as HTMLElement;
      let color, status;

      const handler = new LocalStorageHandler<boolean>(writersNames[i], Math.random() < 0.6);

      if (handler.getData()) {
        color = '#319052';
        status = 'Online';
      } else {
        color = '#A9A6BA';
        status = 'Offline';
      }

      circle.style.backgroundColor = color;
      text.innerHTML = status;
      text.style.color = color;
    }
  }

  updateStatus();
  setInterval(updateStatus, 10 * 1000);

  // function randomizeStatus() {
  //   const elementsToColorize = Math.floor(writersList.length * 0.6); // 60% елементів

  //   const randomizedIndexes = new Set<number>();

  //   // Генерувати випадкові унікальні індекси для вибраних елементів
  //   while (randomizedIndexes.size < elementsToColorize) {
  //     const randomIndex = Math.floor(Math.random() * writersList.length);
  //     randomizedIndexes.add(randomIndex);
  //   }

  //   const writers: { name: string; color: string; status: string }[] = JSON.parse(
  //     localStorage.getItem('writers') || '[]'
  //   );

  //   // Застосувати зміни до елементів
  //   for (let i = 0; i < writersNames.length; i++) {
  //     const foundWriter = writers.find((writer) => writer.name === writersNames[i]);

  //     const circle = elementsToChange[i] as HTMLElement;
  //     const text = textToChange[i] as HTMLElement;
  //     let color, status;

  //     if (randomizedIndexes.has(i)) {
  //       color = '#319052';
  //       status = 'Online';
  //     } else {
  //       color = '#A9A6BA';
  //       status = 'Offline';
  //     }

  //     circle.style.backgroundColor = color;
  //     text.innerHTML = status;
  //     text.style.color = color;

  //     if (!foundWriter) {
  //       writers.push({
  //         name: writersNames[i],
  //         color,
  //         status,
  //       });
  //     }
  //   }

  //   const lastExecutionTime = Date.now();
  //   localStorage.setItem('lastExecutionTime', lastExecutionTime.toString());

  //   localStorage.setItem('writers', JSON.stringify(writers));

  //   console.log('randomizeStatus');
  // }

  // const timerTime = 60 * 1000;
  // const writersString = localStorage.getItem('writers');
  // const lastExecutionTime = localStorage.getItem('lastExecutionTime');
  // const currentTime = Date.now();

  // function showWriters(writers: { name: string; color: string; status: string }[]) {
  //   for (let i = 0; i < writersNames.length; i++) {
  //     const foundWriter = writers.find(
  //       (writer: { name: string }) => writer.name === writersNames[i]
  //     );
  //     if (foundWriter) {
  //       const circle = elementsToChange[i] as HTMLElement;
  //       circle.style.backgroundColor = foundWriter.color;

  //       const text = textToChange[i] as HTMLElement;
  //       text.innerHTML = foundWriter.status;
  //       text.style.color = foundWriter.color;
  //     }
  //   }
  // }

  // function checkEndExecute() {
  //   if (
  //     writersString &&
  //     lastExecutionTime &&
  //     currentTime - Number(lastExecutionTime) <= timerTime
  //   ) {
  //     const writersStorage = JSON.parse(writersString);
  //     showWriters(writersStorage);
  //     setInterval(randomizeStatus, timerTime);
  //   } else {
  //     randomizeStatus();
  //     setInterval(randomizeStatus, timerTime);
  //   }
  // }

  // checkEndExecute();
});
