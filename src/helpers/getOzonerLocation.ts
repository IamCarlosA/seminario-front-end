export interface IOzonerGeolocation {
  latitude: number;
  longitude: number;
  createdAt: string;
}

export const getOzonerLocation = async (): Promise<IOzonerGeolocation> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve({
          latitude: coords.latitude,
          longitude: coords.longitude,
          createdAt: new Date().toISOString(),
        });
      },
      (err) => {
        console.log("No se pudo obtener la geolozalización del ozoner!");
        console.log(err);
        reject();
      }
    );
  });
};
