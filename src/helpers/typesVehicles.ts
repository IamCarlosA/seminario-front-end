export const typesVehicles = (type: string | undefined): string => {
  switch (type) {
    case "bike":
      return "Bicicleta Mecánica";
    case "ebike":
      return "Bicicleta Eléctrica ⚡";
    case "scooter":
      return "Patín Eléctrico ⚡";
    case "emotorcycle":
      return "Moto Eléctrica ⚡";
    case "motorcycle":
      return "Motocicleta";
    default:
      return "error";
  }
};

export interface IColorOptions {
  value: string;
  label: string;
}



export const colorOptions: IColorOptions[] = [
  { value: "pink", label: "Rosa" },
  { value: "purple", label: "Morado" },
  { value: "blue", label: "Azul" },
  { value: "orange", label: "Anaranjado" },
  { value: "green", label: "Verde" },
  { value: "white", label: "Blanco" },
  { value: "gray", label: "Gris" },
  { value: "red", label: "Rojo" },
  { value: "black", label: "Negro" },
  { value: "yellow", label: "Amarillo" },
  { value: "graphite", label: "Grafito" },
];
