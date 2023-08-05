// eslint-disable-next-line no-unused-vars
import Swal from "sweetalert2";
import { PandaboardApiInstance } from "./api";

interface ZendeskData {
  email: string;
  name: string;
  phone: string;
  creditTime?: number;
  vehicleId?: string | number;
}

const fetchZendesk = async (data: ZendeskData) => PandaboardApiInstance
    .post("zendesk/interested", data)
    .then((res) => 
      // Swal.fire({
      //   text: "¡Correo enviado!",
      //   icon: "success",
      //   confirmButtonText: "Aceptar"
      // });
      // window.open(
      //   `https://api.whatsapp.com/send?phone=525544894819&text=Hola%20estoy%20interesado%20en%20continuar%20el%20proceso%20de%20compra%20del%20vehiculo%20${data.vehicleId}`,
      //   "_blank"
      // );
       res.data
    )
    .catch((err: any) => {
      throw err.response.data;
    });

export default fetchZendesk;
