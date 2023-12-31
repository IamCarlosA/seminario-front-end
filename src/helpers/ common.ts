
export const shuffleArray = (array: any[]): any[] => {
  const shuffledArray: any[] = [...array];

  // eslint-disable-next-line no-plusplus
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

