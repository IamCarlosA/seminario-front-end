import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Typography } from "@ecommerce-ozon/design_system";

export const AccordionFaqs = () => {
  const Faqs = [
    {
      title: "¿Cuánto tiempo demora el proceso de compra?",
      description: `
  ¡Es sorprendemente rápido! Tan pronto agendes la cita con nosotros revisamos tu moto y te hacemos la oferta final. Si aceptas, ese mismo día firmamos contrato, ¡te transferimos el dinero y hacemos el traspaso!
      `,
    },
    {
      title: "¿Qué ocurre si tengo pagos pendientes de mi moto?",
      description: `
Debes estar al corriente con tus pagos. Nosotros nos eximimos de cubrir cualquier adeudo que resulte con anterioridad a la fecha de la venta de la motocicleta.`,
    },
    {
      title: "¿En qué condiciones debo entregar mi moto?",
      description: `
Nuestro equipo de mantenimiento hará una revisión tecnomecánica para garantizar que la bicicleta esté en condiciones óptimas de alquiler. En caso que no lo esté, ofrecemos la opción de hacer el mantenimiento en el taller de Ozon.
        `,
    },
  ];
  return (
    <div className="w_100_per">
      {Faqs.map((faq, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography weight="600" scale="small" className="text_neutral_700">
              {faq.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography weight="400" scale="small" className="text_neutral_700">
              {faq.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};
