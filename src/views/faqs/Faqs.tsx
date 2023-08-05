/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Box, SvgIcon } from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { useHistory } from "react-router-dom";

import { ReactComponent as SearchIcon } from "@ecommerce-ozon/design_system/dist/public/static/icons/search.svg";

import faqHands from "static/images/faqs/faqHands.png";
import faqMoto from "static/images/faqs/faqMoto.png";
import { useStyles } from "./faqs.styles";

export default function Faqs() {
  // const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  const [search, setSearch] = useState<any>(null);
  const [searchedWord, setSearchedWord] = useState<string>("");
  const [topic, setTopic] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "FAQs en Ozon";
    //  ReactGA.send({ hitType: "pageview", page: history.location.pathname });
  }, []);

  const questions = {
    buy: [
      {
        title: "Tengo dudas sobre el proceso de compra.",
        questions: [
          {
            title: "¿Qué requisitos piden?",
            answer: "Son realmente muy pocos:",
            list: [
              "Validación digital de identidad con: INE/CURP",
              "Comprobante de domicilio no mayor a 3 meses",
              "Certificado de trabajo o afiliación a plataforma",
              "Firma de contrato compraventa y pagaré",
            ],
          },
          {
            title:
              "¿Para la validación de identidad que documentos debo enviar?",
            list: [
              "Foto de tu INE",
              "Foto de tu licencia de conducción",
              "Una foto de tu cara sin tapabocas ni lentes",
              "Comprobante de domicilio a tu nombre",
              "Tu certificación de trabajo o si trabajas para plataformas nos envías la imagen de tu perfil en cada una de ellas",
            ],
          },
          {
            title: "¿Debo tener historial crediticio?",
            answer:
              "En Ozon estamos para ayudarte a cumplir tus sueños, no te preocupes no necesitas historial crediticio.",
          },
          {
            title:
              "¿Puedo continuar con el proceso si estoy reportado en buró?",
            answer:
              "Uno de los beneficios de la compra de tu moto en Ozon es ¡NO CHECAMOS BURÓ! 😎¿Qué esperas? cómprala ya.",
          },
          {
            title: "¿Qué debo presentar para el certificado de trabajo?",
            answer:
              "Comprobante de nómina que contiene el registro patronal o constancia laboral, que se solicita al patrón y que contenga el registro patronal y la clave de la empresa para la que trabajas.",
          },
          {
            title: "¿Cuánto se demora la validación de los datos?",
            answer:
              "¡Es casi que inmediato! Por mucho en una hora ya te tendremos respuesta.",
          },
          {
            title: "¿Cuándo se firma el contrato?",
            answer:
              "Tan pronto pases la validación de identidad se agenda una cita para verifiques el  estado del vehículo y ahí mismo se firma el contrato y pagaré de compraventa.",
          },
          {
            title: "¿Después de cuánto tiempo puedo retirar mi moto?",
            answer:
              "Tan pronto realices el pago a la cuenta bancaria de Ozon de la primera cuota semanal + el depósito de 385 MXN. Así podrás retirar la moto ese mismo día y sentir la libertad de la carretera con Ozon.",
          },
          {
            title: "¿En dónde puedo ir a mirar y comprar mi moto?",
            answer:
              "Cuando apartes tu moto podrás ir a verla y probarla tú mismo en nuestro taller ubicado en Calle Manuel Gutiérrez Nájera 85ª, Colonia Obrera, Alcaldía Cuauhtémoc, CDMX. C.P.06800.",
          },
        ],
      },
      {
        title: "Tengo dudas sobre los pagos semanales.",
        questions: [
          {
            title: "¿Si agendó una cita para ver la moto debo pagar algo?",
            answer:
              "Claro que no, la cita es para que veas y pruebes tú mismo la que va a ser tu próxima moto, porque en Ozon la confianza es nuestra moneda de cambio.",
          },
          {
            title: "¿Puedo realizar abonos?",
            answer:
              "¡Claro que sí! En caso de realizar pagos adelantados, Ozon emitirá una nueva Tabla de Amortización, con los importes y fechas para el pago de cada uno de los abonos restantes pero no se reduce la tasa de interés ni el valor final de la moto.",
          },
          {
            title: "¿Hay que cancelar algún enganche?",
            answer:
              "¡No! Sabemos lo tedioso que es el enganche. Por eso nosotros para poder retirar la moto solo cobramos un depósito de  385 MXN, el cual será devuelto tan pronto se haya finalizado el pago de todos los abonos acordados para la motocicleta en cuestión.",
          },
          {
            title: "¿Debo cancelar una cuota inicial?",
            answer:
              "No te preocupes por eso, retirar y estrenar tu moto es muy fácil. Tan solo tienes que hacer un pequeño pago:  la primera cuota semanal + el depósito de 385 MXN.",
          },
          {
            title: "¿Cómo funcionan los abonos?",
            answer:
              "Con Ozon compras tu motocicleta en un plazo de 12 meses pagando los abonos de manera semanal.",
          },
          {
            title: "¿Qué pasa si me atraso con un abono?",
            answer:
              "Lo ideal es que no te atrases ni un día. De igual manera en Ozon somos una familia que busca ponerse en tus zapatos por eso si llegas a tener algún problema con el pago llamanos de inmediato y buscaremos cómo solucionarlo. Sin embargo, cuando haya un gran atraso en la cuota se debe pagar una pena moratoria y nosotros en cualquier momento podemos tomar la decisión de recoger la moto.",
          },
          {
            title: "¿Qué métodos de pago aceptan?",
            answer:
              "Por seguridad de los vehículos pedimos que los pagos se hagan con tarjeta de crédito. Sin embargo, también aceptamos transferencias, tarjetas prepagadas o en efectivo en distintos comercios.",
          },
        ],
      },
      {
        title: "Características de producto e inventario.",
        questions: [
          {
            title: "¿Qué marcas manejan?",
            answer:
              "Manejamos de todas las marcas. ¡Estamos renovando el stock semanalmente para que estés pendiente y encuentres la marca que buscas!",
          },
          {
            title:
              "¿Cómo me aseguro que la moto esté en buenas condiciones antes de comprarla?",
            answer:
              "Por seguridad de los vehículos pedimos que los pagos se hagan con tarjeta de crédito. Sin embargo, también aceptamos transferencias, tarjetas prepagadas o en efectivo en distintos comercios.",
          },
          {
            title: "¿Cada cuanto hay nuevas motos?",
            answer:
              "¡Estamos renovando el stock semanalmente! Para que estés pendiente y encuentres la moto que buscas no olvides seguirnos en nuestras redes sociales y ser parte de la familia Ozon.",
          },
          {
            title: "¿Qué tipos de cilindraje manejan?",
            answer: "Manejamos motos con cilindraje entre 100cc a 250cc.",
          },
          {
            title: "¿Qué modelos manejan?",
            answer: "Manejamos motocicletas con modelos superiores a 2017.",
          },
        ],
      },
      {
        title: "Seguimiento luego de la venta.",
        questions: [
          {
            title: "¿Qué pasa si ya no quiero la moto y la devuelvo?",
            answer:
              "Si deseas devolver la moto, tienes que pagar una pena convencional por no cumplir los pagos.",
          },
          {
            title: "¿Cómo debo tener asegurada la moto?",
            answer:
              "Puedes escoger la aseguradora que prefieras o si deseas podemos contratar directamente los seguros en cuestión a nombre tuyo con la empresa aseguradora que elija Ozon.",
          },
          {
            title: "¿Qué debo hacer en casos de accidentes o daños?",
            answer:
              "La moto deberá estar previamente asegurada y tú tendrás que asumir cualquier riesgo por pérdidas, deterioros o menoscabos, parcial o total, del vehículo.",
          },
          {
            title: "¿Qué pasa si llegan a robarme la moto?",
            answer:
              "Desde el primer día que se te entrega la moto ya queda al cuidado tuyo. Sin embargo,  nosotros te brindamos apoyo para la recuperación en caso de que seas víctima de robo, ayudándote a ubicar la moto.",
          },
        ],
      },
    ],
    sell: [
      {
        title: "Tengo dudas sobre el proceso para vender mi moto.",
        questions: [
          {
            title: "¿Qué datos piden de la moto?",
            list: [
              "🏍️Marca moto",
              "🛵Modelo",
              "🗓️Año",
              "⛽Cilindraje",
              "📈Kilometraje",
              "💰Valor que pides por la moto",
            ],
          },
          {
            title: "¿Qué requisitos debe tener la moto?",
            list: [
              "Cilindraje: 100cc- 250cc",
              "Año: modelo 2019 o mayor",
              "Kilometraje: menos de 20.0000km",
            ],
          },
          {
            title: "¿Cómo me hacen la oferta de compra?",
            answer:
              "Tan pronto nos envíes los datos de tu moto, debes enviarnos una foto de ella y  así mismo indicarnos si tiene algún detalle estético o mecánico para hacerte una buena oferta. ",
          },
          {
            title: "¿En qué condiciones debo entregar mi moto?",
            answer:
              "Nuestro equipo de mantenimiento hará una revisión tecnomecánica para garantizar que la bicicleta esté en condiciones óptimas de alquiler. En caso que no lo esté, ofrecemos la opción de hacer el mantenimiento en el taller de Ozon.",
          },
          {
            title: "¿Cómo es el proceso de entrega de mi moto?",
            answer:
              "Agendamos una cita contigo de la forma que te quede mas comodo: ",
            list: [
              "La puedes llevar directamente a nuestro taller ubicado en la Calle Manuel Gutiérrez Nájera 85ª, Colonia Obrera, Alcaldía Cuauhtémoc, CDMX. México C.P.06800.",
              "O si deseas te enviamos a uno de nuestros mecánicos para que cheque tu moto en tu domicilio, este servicio tendría un costo de 200 pesos si te ubicas en Ciudad de México o 300 pesos si estas en el Estado de México, este valor lo descontaremos del valor final de tu moto.",
            ],
          },
          {
            title: "¿Cuánto tiempo demora el proceso de compra?",
            answer:
              "¡Es sorprendemente rápido! Tan pronto agendes la cita con nosotros revisamos tu moto y te hacemos la oferta final. Si aceptas, ese mismo día firmamos contrato, ¡te transferimos el dinero y hacemos el traspaso!",
          },
          {
            title:
              "¿Debo estar al día en el pago de los impuestos y ¿Dónde queda el taller para poder llevar mi moto?",
            answer:
              "Nuestro taller está ubicado en la Calle Manuel Gutiérrez Nájera 85ª, Colonia Obrera, Alcaldía Cuauhtémoc, CDMX. México C.P.06800.",
          },
          {
            title: "¿Qué ocurre si tengo pagos pendientes de mi moto?",
            answer:
              "Sí, debes estar al corriente con tus pagos. Nosotros nos eximimos de cubrir cualquier adeudo que resulte con anterioridad a la fecha de la venta de la motocicleta.",
          },
        ],
      },
      {
        title: "Tengo dudas sobre el pago de la venta.",
        questions: [
          {
            title: "¿Si agendo una cita para que vean mi moto debo pagar algo?",
            answer:
              "Este servicio tendría un costo de 200 pesos si te ubicas en Ciudad de México o 300 pesos si estás en el Estado de México, este valor lo descontaremos del valor final de tu moto.",
          },
          {
            title: "¿La oferta de compra que me ofrecen es el valor fijo?",
            answer:
              "No, el precio de oferta inicial es un precio máximo que puede reducirse en caso de que cuando se realice la revisión de la moto se encuentren detalles de la moto que deban repararse para que funcione al 100% mecánica, eléctrica y estéticamente.	",
          },
          {
            title: "¿En cuanto tiempo me giran la plata por mi moto?",
            answer:
              "¡En cuestión de minutos! Tan pronto lleves la moto al taller o te hagamos la visita y revisemos la moto, la transacción se te haria en máximo 30 minutos",
          },
          {
            title: "¿Cómo recibo el dinero?",
            answer:
              "Cuando entregues tu motocicleta nos brindas los datos de cuenta bancaria en el contrato de compraventa  y te realizamos ¡la transacción en cuestión de minutos!",
          },
        ],
      },
    ],
  };

  function searchWord() {
    let arr: any = [];
    if (searchedWord !== "") {
      const lowerCaseWord = searchedWord.toLowerCase();
      questions.buy.map((item) => {
        arr = arr.concat(
          item.questions.filter(
            (subItem) =>
              subItem.title?.toLowerCase().includes(lowerCaseWord) ||
              subItem.answer?.toLowerCase().includes(lowerCaseWord) ||
              subItem.list?.some((li) =>
                li.toLowerCase().includes(lowerCaseWord)
              )
          )
        );
      });
      questions.sell.map((item) => {
        arr = arr.concat(
          item.questions.filter(
            (subItem) =>
              subItem.title?.toLowerCase().includes(lowerCaseWord) ||
              subItem.answer?.toLowerCase().includes(lowerCaseWord) ||
              subItem.list?.some((li) =>
                li.toLowerCase().includes(lowerCaseWord)
              )
          )
        );
      });
      setSearch(arr);
    } else {
      setTopic(null);
      setSearch(null);
    }
  }

  const QuestionBox = ({ question }: { question: any }) => {
    const [active, setActive] = useState<boolean>(false);

    function toggleActive() {
      setActive(!active);
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        className={classes.questionBox}
        style={{ color: active ? "#FE8A02" : "#67737E" }}
        onClick={toggleActive}
      >
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          {question.title}
          <div>{active ? "▲" : "▼"}</div>
        </Box>
        {active && (
          <Box
            display="flex"
            flexDirection="column"
            className={classes.questionBoxSub}
          >
            {question.answer && (
              <p style={{ margin: "16px 0 0 0" }}>{question.answer}</p>
            )}
            {question.list && (
              <ul>
                {question.list.map((list: any, index: any) => (
                  <li key={index} style={{ marginTop: "8px" }}>
                    {list}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container style={{ paddingTop: "2rem", marginBottom: "2rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "32px" }}>
        Hola, ¿cómo podemos ayudarte?
      </h2>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <input
          placeholder="Busqueda"
          className={classes.filterInput}
          onChange={(event) => setSearchedWord(event?.target.value)}
        />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          className={classes.filterButton}
          style={{ width: "88px" }}
          onClick={() => searchWord()}
        >
          <SvgIcon style={{ width: "22px" }}>
            <SearchIcon fill="white" />
          </SvgIcon>
        </Box>
      </Box>
      <Box
        className="my-12 w-screen px-2 md:px-8 xl:px-24"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        {search ? (
          <Box display="flex" flexDirection="column" style={{ width: "100%" }}>
            <Box display="flex" flexDirection="column">
              {search.map((question: any, index: any) => (
                <QuestionBox key={index} question={question} />
              ))}
            </Box>
          </Box>
        ) : (
          <>
            {topic ? (
              <Box
                display="flex"
                flexDirection="column"
                style={{ width: "100%" }}
              >
                <h1 className={classes.sectionTitle}>{topic.title}</h1>
                <Box display="flex" flexDirection="column">
                  {topic.questions.map((question: any, index: any) => (
                    <QuestionBox key={index} question={question} />
                  ))}
                </Box>
              </Box>
            ) : (
              <Box
                justifyContent="space-between"
                style={{
                  maxWidth: "1148px",
                  width: "1148px",
                  display: "flex",
                  flexDirection: matches ? "column" : "row",
                  alignItems: matches ? "center" : "flex-start",
                }}
              >
                <Box
                  flexDirection="column"
                  alignItems="flex-start"
                  className={classes.section}
                  display="flex"
                >
                  <img
                    src={faqHands}
                    alt="faqHands"
                    className={classes.image}
                  />
                  <h1 className={classes.sectionTitle}>
                    ¿Cómo es el proceso para vender mi moto?
                  </h1>
                  {questions.sell.map((section, index) => (
                    <h2
                      key={index}
                      className={classes.subQuestion}
                      onClick={() => setTopic(section)}
                    >
                      ➜{`  ${section.title}`}
                    </h2>
                  ))}
                </Box>
                <Box
                  flexDirection="column"
                  alignItems="flex-start"
                  className={classes.section}
                  display="flex"
                >
                  <img src={faqMoto} alt="faqMoto" className={classes.image} />
                  <h1 className={classes.sectionTitle}>
                    ¿Cómo es el proceso para comprar una moto?
                  </h1>
                  {questions.buy.map((section, index) => (
                    <h2
                      key={index}
                      className={classes.subQuestion}
                      onClick={() => setTopic(section)}
                    >
                      ➜{`  ${section.title}`}
                    </h2>
                  ))}
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}
