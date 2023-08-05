
export const getColorLabelEs = (colorLabelEn:string)=> {
  switch(colorLabelEn) {
    case "pink": {
      return  "ROSA";
    }
    case "white": {
      return  "BLANCO";
    }
    case "purple": {
      return  "MORADO";
    }
    case "blue": {
      return  "AZÚL";
    }
    case "green": {
      return  "VERDE";
    }
    case "gray": {
      return  "GRIS";
    }
    case "red": {
      return  "ROJO";
    }
    case "black": {
      return  "NEGRO";
    }
    case "yellow": {
      return  "AMARILLO";
    }
    case "graphite": {
      return  "GRAFITO";
    }
    case "orange": {
      return  "Anarajando";
    }
    default: {
      return  colorLabelEn;
    }
  }
};
