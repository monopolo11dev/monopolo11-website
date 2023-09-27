// eslint-disable-next-line no-unused-vars
export type SetFunction = (setA: string[], setB: string[]) => string[];
// eslint-disable-next-line no-unused-vars
export type SingleSetFunction = (setA: string[]) => string[] | string;

export const setIntersection: SetFunction = (setA, setB) => {
  const res = setA.filter((value) => setB.includes(value));
  res.sort();
  return res;
};

export const setUnion: SetFunction = (setA: string[], setB: string[]) => {
  const tmp = setA.concat(setB);
  const res = Array.from(new Set(tmp));
  res.sort();
  return res;
};

export const setDifference: SetFunction = (setA: string[], setB: string[]) => {
  return setA.filter((x) => !setB.includes(x));
};

export const setSymmetricDifference: SetFunction = (setA, setB) => {
  const diferencia1 = setDifference(setA, setB);
  const diferencia2 = setDifference(setB, setA);
  return setUnion(diferencia2, diferencia1);
};

export const setCartesianProduct: SetFunction = (setA, setB) => {
  const res = [];
  for (let i = 0; i < setA.length; i++) {
    for (let j = 0; j < setB.length; j++) {
      res.push("(" + setA[i] + "," + setB[j] + ")");
    }
  }
  return res;
};

export const setPower: SingleSetFunction = (setA) => {
  const tmp: string[][] = [[]];
  for (let i = 0; i < setA.length; i++) {
    const len = tmp.length;
    for (let x = 0; x < len; x++) {
      let item = setA[i];
      let concat = tmp[x].concat(item);
      tmp.push(concat);
    }
  }
  let res = ["∅"];
  for (let i = 1; i < tmp.length; i++) {
    res.push(`(${tmp[i].toString()})`);
  }

  return res;
};

export const setCardinality = (set: string[]) => {
  return set.length.toString();
};

export const generateRandomSet = (universe: string[]): string[] => {
  let size = randomInt(universe.length);
  console.log(size);
  const result: string[] = [];
  let i = 1;
  while (i <= size) {
    let random = randomInt(universe.length);
    let itemFromUniverse = universe[random - 1];
    if (!result.includes(itemFromUniverse)) {
      result.push(itemFromUniverse);
      i++;
    }
  }
  return result;
};

export const removeFromSet = (element: string, arr: string[]): string[] => {
  const index = arr.indexOf(element);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const generateRange = (size: number): string[] => {
  return [...Array(size).keys()].map((i) => (i + 1).toString());
};

const randomInt = (max: number) => {
  return Math.round(Math.random() * (max - 1)) + 1;
};
