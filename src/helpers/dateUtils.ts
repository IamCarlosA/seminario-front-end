
export const getDayOptions = () =>{
  const dayArr:any[] = [];
    // eslint-disable-next-line no-plusplus
    for (let day = 1; day <= 31; day++) {
      const formattedDay = day < 10 ? `0${day}` : day;
      dayArr.push({
        label:  formattedDay,
        value: formattedDay,
      });
    }


  return dayArr;
};

export const getYearOptions = () => {
  const yearStart = 1960;
  const yearEnd = (new Date).getFullYear();
  const yearArr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = yearStart; i <= yearEnd; i++) {
    yearArr.push({
      label: i,
      value: i
    });
  }
  return yearArr;
};

export const getMonthOptions = () => Array.from({length: 12}, (_, i) => i + 1);


export const getMonthsNamesOptions = [
  {
    label: "enero",
    value: "enero"
  },
  {
    label: "febrero",
    value: "febrero"
  },
  {
    label: "marzo",
    value: "marzo"
  },
  {
    label: "abril",
    value: "abril"
  },
  {
    label: "mayo",
    value: "mayo"
  },
  {
    label: "junio",
    value: "junio"
  },
  {
    label: "julio",
    value: "julio"
  },
  {
    label: "agosto",
    value: "agosto"
  },
  {
    label: "septiembre",
    value: "septiembre"
  },
  {
    label: "octubre",
    value: "octubre"
  },
  {
    label: "noviembre",
    value: "noviembre"
  },
  {
    label: "diciembre",
    value: "diciembre"
  },
];

export const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
