import { COUNTRY } from "./country.constants";

export const QUESTIONS = (iso: string) => [
  {
    question: "¿Por cuánto tiempo puedo usar la bicicleta?",
    answer:
      "El alquiler de los vehículos en Ozon es por suscripción mensual. La puedes usar el tiempo que quieras y las veces que quieras, siempre y cuando pagues anticipadamente el alquiler cada mes.",
  },
  {
    question: "¿Tengo límite de cobertura?",
    answer: "No, ¡puedes usar la bicicleta como si fuera tuya!",
  },
  {
    question: "¿Cómo funciona el pago para alquilar mi vehículo?",
    answer:
      "1. Una vez escoges el vehículo que quieres alquilar debes hacer un registro básico\n" +
      "2. Haces el pago del alquiler del vehículo más otros beneficios extra que quieras obtener (envío a domicilio, seguro contra robo, etc.)\n" +
      "3. Una vez hagas el pago, nuestro equipo hará una validación de tu identidad y se contactará contigo para coordinar la entrega del vehículo.\n" +
      "4. En el momento que recibas el vehículo empieza a contar la mensualidad, y el pago deberá renovarse cada mes. \n" +
      "5. En caso que no la quieras seguir utilizando debes enviar un correo a soporte@ozon.mobi solicitando la devolución del vehículo. Esto debe hacerse 2 días antes de que venza tu mensualidad.",
  },
  {
    question: "¿En qué momento empieza a contar la mensualidad?",
    answer: "El día que recibes el vehículo.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Por seguridad de los vehículos pedimos que los pagos se hagan con tarjeta de crédito.\n" +
      "Sin embargo, también aceptamos tarjetas virtuales o prepagadas (Nequi, Rappicard, TPaga etc.) que puedes recargar con efectivo 😊.",
  },
  {
    question: "¿En dónde me entregan mi vehículo?",
    answer:
      "Puedes escoger recogerlo en nuestro taller o pagar por el envío hasta tú domicilio. Hacemos entrega a domicilio únicamente dentro de las ciudades donde tenemos sede.",
  },
  {
    question: "¿Qué pasa si me roban el vehículo que alquilé?",
    answer:
      "Si pagaste el seguro contra robo solo debes pagar un deducible del 10%, equivalente a una mensualidad de ese vehículo. Esto siempre y cuando nos entregues la denuncia juramentada ante fiscalía.\n" +
      "Si NO cuentas con seguro contra robo debes pagar el valor del vehículo, equivalente a diez (10) veces el valor de la mensualidad de ese vehículo.",
  },
  {
    question:
      "¿Qué pasa si mi vehículo necesita una reparación o mantenimiento?",
    answer:
      "Debes llevarlo a nuestro taller. Allá lo revisamos y lo arreglamos sin ningún costo. Esto siempre y cuando se demuestre que los daños al vehículo NO fueron causados por un mal uso del usuario.",
  },
  {
    question:
      "¿Es obligatorio el uso del casco cuando me muevo en bici o patineta?",
    answer:
      "NO es obligatorio, pero recomendamos que uses uno. Puede ser buena protección en caso de un accidente.",
  },
  {
    question: "¿Debo entregar mi vehículo una vez haga la inscripción?",
    answer:
      "Si, una vez hagas la inscripción nuestro personal de soporte se comunicará contigo para coordinar la entrega y guardarla en nuestra bodega. Puedes escoger si llevarla a nuestro taller o que la recojan en la dirección que desees dentro de la ciudad",
  },
  {
    question: "¿En qué condiciones debo entregar mi vehículo?",
    answer:
      "Nuestro equipo de mantenimiento hará una revisión tecnomecánica para garantizar que la bicicleta esté en condiciones óptimas de alquiler. En caso que no lo esté, ofrecemos la opción de hacer el mantenimiento en el taller de Ozon.",
  },
  {
    question:
      "¿Cuánto cuesta el envío y el mantenimiento de entrada de mi vehículo?",
    answer:
      iso === COUNTRY.CO.iso
        ? "Tienes un bono de $60.000 COP que lo puedes utilizar en lo siguiente: Envío de tu vehículo al taller: $20.000 COP, Devolución de tu vehículo del taller a tu domicilio: $20.000 COP, Mantenimiento de entrada (en caso que lo necesite): Precio según el caso. El bono solamente cubre los gastos de mantenimiento de entrada, NO de mantenimientos futuros."
        : "Tienes un bono de $60.000 COP que lo puedes utilizar en lo siguiente: Envío de tu vehículo al taller: $20.000 COP, Devolución de tu vehículo del taller a tu domicilio: $20.000 COP, Mantenimiento de entrada (en caso que lo necesite): Precio según el caso. El bono solamente cubre los gastos de mantenimiento de entrada, NO de mantenimientos futuros.",
  },
  {
    question: "¿Cuando entrego mi vehículo, que me dan en garantía?",
    answer:
      "Te entregamos un acta de entrega de vehículo con todos tus datos y los de tu vehículo",
  },
  {
    question:
      "¿Cuánto es el tiempo mínimo que debe permanecer mi vehículo en la plataforma?",
    answer: "Tres meses",
  },
  {
    question: "¿Mi vehículo está asegurado por robo y daños?",
    answer:
      "Ozon asegura tu vehículo por robo y daños hasta por 10 veces el valor del alquiler.",
  },
  {
    question: "¿Mi vehículo va a recibir mantenimiento?",
    answer:
      "Mientras el vehículo esté alquilado, los costos asociados al mantenimiento correctivo del vehículo, serán asumidos por OZON. En caso de requerir reemplazo de componentes especiales el costo será asumido por el dueño del vehículo.",
  },
  {
    question: "¿Cuánto dinero recibo por inscribir mi vehículo a Ozon?",
    answer:
      "Recibes el valor del alquiler que definiste en el registro menos una comisión del 30% para Ozon por la prestación del servicio",
  },
  {
    question: "¿Cómo recibo el dinero?",
    answer:
      "Cuando entregas tu vehículo debes dejar tus datos de cuenta bancaria en el acta de entrega. Una vez tu vehículo sea alquilado recibirás una notificación y a partir de ese momento recibirás la consignación mensual.",
  },
  {
    question: "¿Qué costo tiene el servicio?",
    answer:
      "El costo de inscribir tu vehículo a la plataforma es completamente gratis. Ozon cobra una comisión del 30% en caso de ser alquilado. ",
  },
  {
    question: "¿Qué pasa si necesito mi vehículo de vuelta?",
    answer:
      "Debes notificar a Ozon que quieres tu vehículo de vuelta. Si tu vehículo se encuentra alquilado, Ozon lo pedirá al usuario que lo está usando y deberá devolverlo al final del periodo (siguiente corte de fecha de la mensualidad) para devolvértelo. En caso que tu vehículo no esté alquilado debe cumplir el mínimo de tres meses en la plataforma y posterior se te devolverá en el momento que desees.",
  },
];
