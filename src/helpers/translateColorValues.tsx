/*
  ColorOptions coming from BE
  const colorOptions: any[] = [
  { value: "yellow", label: "Amarillo" },
  { value: "orange", label: "Anaranjado" },
  { value: "blue", label: "Azul" },
  { value: "white", label: "Blanco" },
  { value: "graphite", label: "Grafito" },
  { value: "gray", label: "Gris" },
  { value: "purple", label: "Morado" },
  { value: "black", label: "Negro" },
  { value: "red", label: "Rojo" },
  { value: "pink", label: "Rosa" },
  { value: "green", label: "Verde" },
];
* */

export const translateColorValues =  (selectedFilters:any) => {

  if(!selectedFilters) return {};

  const selectedColor = selectedFilters.color;
  const defaultSource = "Blanco";

  const sources: { [key: string]: string; } = {
    "pink": "Rosa",
    "purple": "Morado",
    "blue": "Azul",
    "orange": "Anaranjado",
    "green": "Verde",
    "white": "Blanco",
    "gray": "Gris",
    "red": "Rojo",
    "black": "Negro",
    "yellow": "Amarillo",
    "graphite": "Grafito",
  };

  // eslint-disable-next-line consistent-return
  return {
    ...selectedFilters,
     color: sources[selectedColor] || defaultSource
  };
};
