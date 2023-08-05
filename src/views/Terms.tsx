import Container from "@material-ui/core/Container";
import React, { useEffect } from "react";

const TermsHTML = `
<h1 style="text-align: center;"><b>AVISO LEGAL</b></h1>
&nbsp;


<span style="font-weight: 400;">El aviso sobre ciertos términos y condiciones de navegación que a continuación se presenta (el “</span><span style="font-weight: 400;">Aviso Legal</span><span style="font-weight: 400;">”)  constituye un acuerdo íntegro entre Ozon, S. de R.L. de C.V., sus filiales y/o subsidiarias y/o sus partes relacionadas (el “</span><span style="font-weight: 400;">Prestador</span><span style="font-weight: 400;">”), con domicilio en [GOLDSMITH 40 INT 16, POLANCO IV SECCIÓN, MIGUEL HIDALGO, MIGUEL HIDALGO, 11550], dirección electrónica: <a href="https://www.ozon.mobi">https://www.ozon.mobi</a> (el “</span><span style="font-weight: 400;">Sitio</span><span style="font-weight: 400;">”), y con correo electrónico de contacto </span><a href="mailto:soportemx@ozon.mobi"><span style="font-weight: 400;">soportemx@ozon.mobi</span></a><span style="font-weight: 400;">; y cualquier usuario del Sitio. La utilización del Sitio, por parte de cualquier persona, le atribuye la calidad de usuario (el “</span><span style="font-weight: 400;">Usuario</span><span style="font-weight: 400;">”) y ello implica su adhesión plena e incondicional a este Aviso Legal. En consecuencia, es responsabilidad única y exclusiva del Usuario, leer previamente este Aviso Legal y sus modificaciones correspondientes, cada vez que accede al Sitio. Si, en cualquier momento, el Usuario no estuviera de acuerdo total o parcialmente con el presente Aviso Legal, deberá abstenerse inmediatamente de usar el Sitio.</span>

&nbsp;
<h3><b>ACCESO, UTILIZACIÓN Y ESTANCIA EN EL SITIO</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El acceso y utilización del Sitio tiene carácter gratuito para los Us</span><span style="font-weight: 400;">uarios. El Usuario no estará obligado a registrarse o inscribirse en el Sitio. Los servicios ofrecidos a través del Sitio están dirigidos a toda persona con capacidad jurídica para obligarse de conformidad con los términos y condiciones aplicables una vez que el Usuario decide crear un usuario y contraseña para transaccionar mediante el Sitio. </span><span style="font-weight: 400;">El Usuario es el único responsable frente al Prestador, y cualquier tercero, respecto de su conducta al acceder, consultar y proporcionar información al Sitio y de las consecuencias que se puedan derivar de una utilización, con fines o efectos ilícitos o contrarios al objeto del Sitio, su contenido, elaborado o no por el Prestador, publicado o no bajo su nombre de forma oficial; así como aquellas consecuencias que se puedan derivar de la utilización contraria al contenido del Aviso Legal que sea lesiva de los intereses o derechos de terceros, o que de cualquier forma pueda dañar, inutilizar o deteriorar el Sitio e impedir el normal disfrute de otros Usuarios.</span>

&nbsp;
<h3><b>OBJETO</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador </span><span style="font-weight: 400;">pone a disposición del Usuario el Sitio, ya sea que se trate de un sitio patrocinado, administrado por intermedio de un tercero o alojado por un tercero, </span><span style="font-weight: 400;">facilitando el acceso a los Usuarios a información diversa proporcionada por el Prestador o por personas vinculadas a dicha información de manera directa o indirecta (los “</span><span style="font-weight: 400;">Contenidos</span><span style="font-weight: 400;">”). El Usuario reconoce que el uso del Sitio no le confiere ningún derecho de propiedad sobre el mismo, o cualquiera de sus elementos o Contenidos. El Prestador se reserva el derecho a modificar, total o parcialmente, en cualquier momento y sin aviso previo, la presentación, configuración, información, Contenidos y en general cualquier parte o aspecto relacionado directa o indirectamente con el Sitio.</span>

&nbsp;

<span style="font-weight: 400;">El Usuario reconoce que las descripciones de los servicios expuestos en el Sitio se realizan de forma ilustrativa, y tendrán el alcance y las especificaciones comunes, básicas y simples que regularmente el mercado ofrece, salvo cuando dichos alcances y especificaciones se detallan en el Sitio o en los términos y condiciones que regulen una transacción comercial entre el Usuario y el Prestador. De igual forma, reconoce que la información contenida y/o publicada a través del Sitio, tiene fines meramente informativos sobre los servicios que proporciona el Prestador.</span>

&nbsp;

<span style="font-weight: 400;">El Prestador a través de su plataforma ofrece un catálogo de motocicletas que podrá separar y comprar (el “Producto”). Sin embargo, el Prestador no garantiza la solución efectiva total de todas las necesidades del Cliente. El Cliente reconoce que las descripciones de los Productos contenidas en el Sitio se realizan de forma ilustrativa, y tendrán el alcance y las especificaciones comunes, básicas y simples, que regularmente ofrece el mercado, salvo cuando dichos alcances y especificaciones se especifiquen en el Sitio. Dentro de la Plataforma el Usuario podrá tener acceso a los siguientes módulos y de acuerdo a los siguientes criterios:</span>

&nbsp;
<ol>
 \t<li>
<h4><b> Búsqueda de motocicletas</b></h4>
</li>
</ol>
<span style="font-weight: 400;">Filtros de búsqueda</span>

<span style="font-weight: 400;">El Usuario podrá facilitar su búsqueda de Productos en nuestro catálogo a través de filtros pre establecidos, estos filtros reorganizan la información presentada en pantalla de acuerdo a características de los vehículos (Año, Cilindraje, Marca, kilometraje).</span>

<span style="font-weight: 400;">El Prestador se reserva el derecho de sacar nuevos productos, sin restricción alguna de periodicidad, cantidad, ingredientes, usos y características del mismo. Asimismo, </span><span style="font-weight: 400;">el Prestador se reserva el derecho a retirar, reponer o cambiar los Productos mediante el simple cambio en el contenido del Sitio. Asimismo, el Prestador tiene la facultad de dejar de ofrecer, sin previo aviso y en cualquier momento, el acceso a los Productos publicados. En caso de que un Producto se encuentre en oferta, el Prestador lo indicará en forma clara, detallando el tiempo de validez de la misma.</span>

<span style="font-weight: 400;">Toda la información acerca de los Productos, mediante el Sitio, se proporciona con fines informativos. Es responsabilidad única del Cliente, leer y comprender las especificaciones del Producto e instrucciones de uso, y, en su caso, tomar las precauciones necesarias. El Prestador no garantiza que las descripciones o su contenido esté libre de errores. Si el Cliente considera que un Producto no cumple con su descripción, el único recurso del que dispone será devolverlo, siempre y cuando sea devuelto sin haberse utilizado y conforme a la Política de Devoluciones.</span>

<span style="font-weight: 400;">Precio</span><span style="font-weight: 400;">. Salvo que se indique lo contrario, el precio de lista o precio sugerido que aparece en cada Producto representa el precio de venta al público. Salvo que se indique de otra manera, todos los precios publicados en el Sitio se encuentran expresados en pesos mexicanos, y se presentan con el Impuesto al Valor Agregado (IVA) incluido. El Prestador se reserva el derecho de modificar el precio en cualquier momento y sin necesidad de previo aviso.</span>
<ol start="2">
 \t<li>
<h4><b> Búsqueda por capacidad de crédito</b></h4>
</li>
</ol>
<span style="font-weight: 400;">El Usuario podrá visualizar y acceder a los vehículos que mejor se le acomoda a su perfil financiero mediante un formulario de información financiera que analiza y muestra las opciones sugeridas. Los datos podrán ser son los siguientes y están sujetos al Aviso de Privacidad publicado en la Plataforma: </span>
<ul>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Ingresos brutos mensuales</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Egresos brutos mensuales</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Estado civil</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Personas con las que comparte vivienda (Ej. esposa, hijos, amigos)</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Número de responsables a cargo</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Número de Hijos</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Actividad económica</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Nombre de la empresa empleadora</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Sector de la empresa empleadora o actividad económica</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Correo electrónico</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Número celular</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">INE o CURP</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Fotografía personal de identificación</span></li>
</ul>
<ol start="2">
 \t<li>
<h4><b> Agendamiento de citas</b></h4>
</li>
</ol>
<span style="font-weight: 400;">Una vez seleccionado el Producto de su elección utilizando o no los criterios de búsqueda, el Usuario deberá proporcionar su información de contacto en caso de que desee  agendar una cita en alguno de los Hubs en la Ciudad de México. El Prestador coordinará una cita con el Usuario en las fechas habilitadas que son a partir de dos días de la fecha actual en horarios de 10:00 AM a 5 PM y podrán ser modificados por el Prestador. Una vez seleccionada la fecha y hora se genera un correo automático con la información relevante y un enlace de contacto con soporte, a partir de este punto adquisición recoge al usuario y le hace el seguimiento a su proceso a través de WhatsApp.</span>
<ol start="3">
 \t<li>
<h4><b> Compra de Vehículos </b></h4>
</li>
</ol>
<span style="font-weight: 400;">Los usuarios que deseen vender su vehículo deben llenar un formulario en el cual nos brindan la información relevante del mismo que es:</span>
<ul>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Año del vehículo</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Cilindraje del vehículo</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Marca del vehículo</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Kilometraje del vehículo</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Fotografía</span></li>
</ul>
<span style="font-weight: 400;">Con esta información se calcula una oferta tentativa para el cliente y se le envía toda la información de la oferta al correo electrónico, esta oferta puede variar en el peritaje que se le haga al vehículo en el Hub. Para determinar si el vehículo es viable para compra este debe seguir ciertas reglas:</span>
<ul>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">El modelo no debe de tener más de 3 años de antigüedad a la fecha de compra.</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Idealmente no debe poseer más de 1.000 Km de uso (si es el caso el precio se ve afectado).</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">El modelo del vehículo debe estar contemplado en nuestra lista de elegibles y nuestro simulador de precios.</span></li>
</ul>
<ol start="4">
 \t<li>
<h4><b> Lista de espera de vehículo</b></h4>
</li>
</ol>
<span style="font-weight: 400;">Los Productos expuestos en la Plataforma versan en dos categorías: los vehículos disponibles y los vehículos No disponibles, en la categoría de No disponibles se habilita la funcionalidad de entrar en lista de espera para el Producto, donde el Usuario podrá manifestar su interés en el modelo en específico  proporcionando para tal efecto sus datos de contacto (Correo, celular, nombre, apellido) para ser contactado una vez el Producto esté disponible. </span>
<ol start="5">
 \t<li>
<h4><b> Apartado de vehículo</b></h4>
</li>
</ol>
<span style="font-weight: 400;">Los Productos disponibles son elegibles para ser apartados, esto significa que el usuario puede retirarlos de la oferta del sitio web si paga la cantidad señalada que será sumada al crédito del Producto en caso de concretar la compra, en caso contrario, es decir que no se haya concretada la compra, será devuelto a través de un Tercero designado para procesar pagos.</span>
<ol start="6">
 \t<li>
<h4><b> Soporte</b></h4>
</li>
</ol>
<span style="font-weight: 400;">Los Usuarios a través de la plataforma podrán acceder a canales de soporte oficiales como: Correo de soporte oficial, WhatsApp de Soporte (Chatbot/Asesor) y Línea de soporte por chat con Zendesk (Chatbot/Asesor). Los canales de soporte estarán disponibles todos los días de la semana de 10 am a 5 pm.</span>

&nbsp;
<h3><b>CONTENIDOS</b></h3>
<span style="font-weight: 400;">El Usuario se compromete a:</span>
<ol>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">utilizar el Sitio y sus Contenidos de acuerdo a las leyes aplicables y de orden público, absteniéndose de realizar acto que menoscabe, deteriore, inutilice o dañe la imagen y/o información divulgada por el Prestador o de alguna manera lesione derechos o intereses de terceras personas, vinculadas directa o indirectamente a éste; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">no copiar, difundir, modificar, reproducir, distribuir o utilizar de manera alguna con o sin fines de lucro los contenidos y los elementos utilizados en el Sitio, a menos que se cuente con la autorización expresa y por escrito del Prestador; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">no modificar o manipular las marcas, logotipos, avisos comerciales, nombres comerciales y signos distintivos en general del Prestador, del Sitio o de las personas vinculadas con el Prestador (salvo que cuente con su autorización por escrito); </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">suprimir, eludir o modificar los Contenidos y los elementos utilizados en el Sitio, así como los dispositivos técnicos de protección, o cualquier mecanismo o procedimiento establecido en el Sitio.</span></li>
</ol>
&nbsp;

<span style="font-weight: 400;">Queda excluida de los puntos anteriores, aquella información generada a través del Sitio para uso y manejo del Usuario, misma que podrá ser impresa y/o copiada para los intereses que más convengan al mismo. En caso de que el Usuario sea una persona moral, se apegará a lo dispuesto por el artículo 148, fracción IV de la Ley Federal del Derecho de Autor.</span>

<span style="font-weight: 400;">El Usuario reconoce y acepta que el uso del Sitio y de los Contenidos, es bajo su exclusiva y estricta responsabilidad, por lo que el Prestador no será, en ningún momento y bajo ninguna circunstancia, responsable por cualquier desperfecto o problema que se presente en el equipo de cómputo (hardware) o programas de cómputo (software) que utilice el Usuario para acceder o navegar en cualquier parte del Sitio.</span>

<span style="font-weight: 400;">El Prestador</span><span style="font-weight: 400;"> tiene derecho a realizar, durante intervalos temporales definidos, campañas promocionales para promover el registro de nuevos miembros en su Sitio. El Prestador se reserva el derecho de modificar los términos y condiciones de las compras o contrataciones de servicios, así como de proceder a la exclusión de cualquiera de los mismos.</span>

<span style="font-weight: 400;">El Prestador declara que todos los Contenidos, y los elementos utilizados en el Sitio, se encuentran debidamente registrados y protegidos bajo las autoridades y leyes correspondientes en México. El Usuario se obliga a respetar todos los derechos contenidos en el Aviso de Derecho de Autor establecido en el Sitio.</span>

<span style="font-weight: 400;">Imprecisiones en el Sitio</span><span style="font-weight: 400;">.</span> <span style="font-weight: 400;">El Contenido y/o el Sitio, pueden contener inexactitudes y/o errores tipográficos. El Prestador no garantiza la exactitud del Contenido y se reserva el derecho, a su entera discreción, de corregir cualquier error u omisión en cualquier parte del Sitio y a realizar cualquier cambio en las características, funcionalidad o Contenido en cualquier momento. El Prestador, así como cualquier persona relacionada y/o afiliada al mismo, incluyendo, sin limitar, directores, apoderados, representantes, administradores, empleados, accionistas y/o agentes, presentes o anteriores, o aliados, no serán responsables de errores u omisiones en los Contenidos.</span>
<h3><b>SITIOS Y CONTENIDOS AJENOS AL PRESTADOR
</b></h3>
<span style="font-weight: 400;">El Prestador podrá hacer uso de su derecho de publicación de cualquier material informativo y/o de sitios o subsitios propiedad de terceros, vinculados o no al Prestador, que considere de interés para los Usuarios. No obstante lo anterior, el Prestador se deslinda de toda responsabilidad, del acceso y/o uso que realice el Usuario de la información ahí contenida y/o del uso, origen y destino de la información que se desprenda de ligas distintas (vínculo, hipervínculo, </span><i><span style="font-weight: 400;">link</span></i><span style="font-weight: 400;">).</span>

<span style="font-weight: 400;">Toda publicación realizada dentro del Sitio, por parte del Usuario, no genera obligación de pago ante terceros por razón de promoción, publicación y/o manejo de información y/o imagen, a menos que se cuente con un contrato previamente firmado con el Prestador.</span>

&nbsp;
<h3><b>RESPONSABILIDAD RESPECTO A LOS CONTENIDOS</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador no asume responsabilidad alguna derivada, de manera enunciativa más no limitativa de: (i) la utilización que el Usuario pueda hacer de los materiales de este Sitio, o de los Contenidos, o de los sitios web de enlace, ya sean prohibidos o permitidos, en infracción de los derechos de propiedad intelectual y/o industrial de contenidos de la web o de terceros; (ii) los eventuales daños y perjuicios al Usuario causados por un funcionamiento normal o anormal de las herramientas de búsqueda, de la organización o la localización de los Contenidos y/o acceso al Sitio y, en general, de los errores o problemas que se generen en el desarrollo o instrumentación de los elementos técnicos que el Sitio facilite al Usuario; (iii) los contenidos de aquellas páginas a las que el Usuario pueda acceder desde enlaces incluidos en el Sitio, ya sean autorizados o no; (iv) los actos u omisiones de terceros, independientemente de la relación que dichos terceros pudieran tener con el Prestador; (v) el acceso de menores de edad a los Contenidos, así como el envío de información personal que estos pudieran realizar; (vi) las comunicaciones o diálogos en el transcurso de los debates, foros, chats y comunidades virtuales que se organicen a través de o en torno al Sitio de enlace, ni responderá, por tanto, de los eventuales daños y perjuicios que sufra el Usuario a consecuencia de dichas comunicaciones y/o diálogos; etc. </span>

&nbsp;
<h3><b>RESPONSABILIDAD RESPECTO A FALLAS DE LAS TECNOLOGÍAS DE INFORMACIÓN Y COMUNICACIÓN </b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador no será responsable, en forma alguna, cuando se produzcan: </span>
<ol>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Errores o retrasos en el acceso al Sitio a la hora de introducir los datos en el formulario de solicitud; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">La lentitud o imposibilidad de recepción por parte de los destinatarios de la confirmación de la solicitud o cualquier anomalía que pueda surgir por incidencias, ya sean debidas a problemas en la red Internet, caso fortuito o fuerza mayor o cualquier u otra contingencia imprevisible y ajena al Prestador; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Fallos o incidencias que pudieran producirse en las comunicaciones, ya sea borrándose o por transmisiones incompletas, de manera que no se garantiza que los servicios del Sitio estén constantemente operativos; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">De los errores o daños producidos al Sitio por un mal uso del servicio por parte del Usuario u otros usuarios; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">De la no operatividad o problemas en la dirección de correo electrónico facilitada por el Usuario para el envío de la confirmación de la solicitud realizada. </span></li>
</ol>
<span style="font-weight: 400;">En todos los casos expuestos, el compromiso del Prestador será realizar su mejor esfuerzo para solucionar los problemas que estén a su alcance, y ofrecer todo el apoyo necesario al Usuario para llegar a una solución rápida y satisfactoria de la incidencia. </span>

&nbsp;
<h3><b>EXCLUSIÓN DE GARANTÍAS Y DE RESPONSABILIDAD</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Usuario es el único responsable del uso que haga al Sitio y su Contenido. El Usuario reconoce que la información del SItio y de los servicios del Prestador se proporcionan “como están”, sin ninguna garantía expresa o implícita de comerciabilidad o de aptitud para un fin determinado. El </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">no garantiza la precisión ni la integridad de la información, textos, gráficos, enlaces u otros elementos contenidos en el Sitio o Contenido. El </span><span style="font-weight: 400;">Prestador no garantiza la operación ininterrumpida o libre de todo error del Sitio y/o su Contenido. Puesto que toda la información referida en el Sitio y su Contenido se encuentra en la nube, el Prestador no controla ni garantiza la ausencia de virus en los Contenidos, ni la ausencia de otros elementos en los Contenidos que puedan producir alteraciones en el sistema informático del Usuario (software y/o hardware) o en los documentos electrónicos almacenados en su sistema informático. </span>

<span style="font-weight: 400;">Todo material descargado u obtenido de un modo distinto al previsto en el Sitio, será bajo responsabilidad y riesgo único del Usuario, respecto de los daños que pudiera causar en el sistema informático del dispositivo a través del cual realice su conexión y/o la pérdida de datos que derive de la descarga de ese material. En ningún caso, ni el </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">ni sus proveedores serán responsables de daño alguno derivado del uso del Sitio o Contenido, o de no poder usarlos </span><span style="font-weight: 400;">(EN PARTICULAR, SIN LIMITACIÓN ALGUNA, DE LOS DAÑOS DIRECTOS O INDIRECTOS, MORALES, INCIDENTALES, EXCESIVOS, REMOTOS Y/O EVENTUALES, PERJUICIOS, LUCRO CESANTE, INTERRUPCIÓN DE LA ACTIVIDAD COMERCIAL O PÉRDIDA DE INFORMACIÓN O DATOS Y/O INFRACCIONES DE SEGURIDAD), aún cuando se hubiera advertido al Prestador de dicha posibilidad. </span>

&nbsp;
<h3><b>RETIRO DEL ACCESO AL SITIO Y/O A LOS CONTENIDOS</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador se reserva el derecho a negar o retirar el acceso al Sitio, o sus Contenidos, en cualquier momento, sin responsabilidad alguna para el Prestador y sin previo aviso al Usuario o usuarios que incumplan de manera total o parcial con las condiciones aquí establecidas y/o que realicen acciones o actos tendientes a: </span>
<ol>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">“Asediar" o de otra manera acosar o molestar a otros usuarios;</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Hacerse pasar como representante o empleado del Prestador, realizando declaraciones falsas o de otro modo erróneas de su vinculación con el Prestador;</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Recopilar o almacenar datos personales de otros Usuarios en relación con la conducta y las actividades prohibidas; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Falsificar encabezados o manipular identificadores del Sitio, con la finalidad de ocultar el origen de los Contenidos;</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Cargar, publicar, enviar por correo electrónico, transmitir o proporcionar de otro modo, cualquier contenido respecto del cual no tenga derecho a transmitir, en virtud de los términos contenidos en la Ley Federal de Protección a la Propiedad Industrial (“</span><span style="font-weight: 400;">LFPPI</span><span style="font-weight: 400;">”), la Ley Federal del Derecho de Autor (“</span><span style="font-weight: 400;">LFDA</span><span style="font-weight: 400;">”), y la Ley Federal de Protección de Datos Personales en Posesión de Particulares  (“</span><span style="font-weight: 400;">LFPDPPP</span><span style="font-weight: 400;">”) o de relaciones contractuales protegidos por convenios de confidencialidad y no divulgación; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Cargar, publicar, enviar por correo electrónico, transmitir o proporcionar de otro modo, materiales que contengan virus informáticos o cualquier otro código informático, archivos o programas diseñados para interrumpir, destruir o limitar la funcionalidad del software, hardware o de equipos de telecomunicaciones conectados al Sitio; </span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Hacer uso del Sitio de una manera que pudiera dañar, deshabilitar, recargar o alterar los servidores del Prestador o las conexiones de redes;</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Ignorar requisitos, procedimientos, políticas o normas de redes conectadas al Sitio que pudieran interferir con el uso y goce del Sitio por parte de cualquier tercero; y</span></li>
 \t<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Acceder de manera no autorizada a cuentas, sistemas informáticos o redes conectadas a los servidores del Prestador, a través de ataques propios de piratas informáticos, el descifrado de contraseñas o cualquier otro método para obtener o tratar de obtener materiales o información con cualquier medio que no se ofrece intencionalmente a través del Sitio. </span></li>
</ol>
&nbsp;

<span style="font-weight: 400;">El Usuario acepta indemnizar y mantener en paz y a salvo al </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">y sus funcionarios, agentes, empleados, socios, proveedores y licenciantes frente a cualquier reclamo o demanda, así como a cubrir los honorarios razonables de abogados, que promueva cualquier tercero en contra del </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">a causa del contenido que el Usuario envíe, publique, transmita o proporcione de un modo distinto al previsto en el Sitio. </span><span style="font-weight: 400;">Lo anterior, sin perjuicio del derecho del Prestador de </span><span style="font-weight: 400;">realizar las acciones judiciales necesarias para reclamar los daños y perjuicios que dichas acciones por parte del Usuario pudieran causarle</span><span style="font-weight: 400;">. </span>

&nbsp;
<h3><b>PROPIEDAD </b><b>INDUSTRIAL Y DERECHO DE AUTOR</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador autoriza al Usuario a utilizar el Sitio, exclusivamente bajo los términos aquí expresados, sin que ello implique que concede al Usuario licencia o autorización alguna, o algún tipo de derecho distinto al antes mencionado, respecto de la Propiedad Industrial y Derecho de Autor del Prestador,  entendiéndose como ello: todas las marcas registradas y/o usadas en México o en el extranjero por el Prestador; todo derecho sobre invenciones (patentadas o no), diseños industriales, modelos de utilidad, información confidencial, nombres comerciales, secretos industriales, avisos comerciales, reservas de derechos, nombres de dominio; así como todo tipo de derechos patrimoniales sobre obras y creaciones protegidas por derechos de autor y demás formas de propiedad industrial o intelectual reconocida o que lleguen a reconocer las leyes correspondientes</span><span style="font-weight: 400;">.</span>

<span style="font-weight: 400;">El Usuario reconoce y acepta que el Prestador es legítimo propietario, o tiene los derechos necesarios, sobre el Sitio, incluidos los nombres comerciales del Prestador, marcas comerciales, marcas de servicio, logotipos, nombres de dominio y otras características distintivas de la marca contenidas en ellos (las “</span><span style="font-weight: 400;">Marcas Registradas del Prestador</span><span style="font-weight: 400;">”), independientemente de que esos derechos estén registrados o no, y de cualquier lugar del mundo en el que puedan existir esos derechos, y que están protegidos por las leyes y tratados internacionales sobre protección a la propiedad industrial y derecho de autor. Por lo anterior, el Usuario acepta que las Marcas Registradas del Prestador no podrán ser objeto de copia, reproducción, modificación, publicación, carga, envío, transmisión o distribución en modo alguno. Salvo indicación expresa en contrario en este documento, el Prestador no concede al Usuario ningún derecho expreso ni implícito en virtud de patentes, derecho de autor, marcas comerciales o información de secretos industriales. El Usuario reconoce y conviene que el Sitio, así como todos los diseños del mismo, son y, serán en todo momento, propiedad del Prestador.</span>

<span style="font-weight: 400;">Retroalimentación</span><span style="font-weight: 400;">. En caso de que el Usuario proporcione algún comentario al Prestador respecto de la funcionalidad y el rendimiento del Sitio (incluida la identificación de posibles errores y mejoras), en este acto, el Usuario autoriza al Prestador para que haga uso, sin restricción, de todos los derechos, títulos e intereses sobre los comentarios expresados. Lo anterior, sin que ello se considere como un derecho moral del Usuario para requerir participación o retribución monetaria alguna, o restricción en el uso de dichos comentarios para su explotación por parte del Prestador.</span>
<h3></h3>
<h3><b>DATOS DE CARÁCTER PERSONAL</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">En cumplimiento a los términos previstos en la LFPDPPP, el Prestador, </span><span style="font-weight: 400;">como responsable del tratamiento de sus datos personales, hace del conocimiento del Usuario que la información que el Usuario provea en este Sitio será tratada de conformidad con lo indicado en el Aviso de Privacidad contenido en el Sitio. </span><span style="font-weight: 400;">Para utilizar o gozar de algunos de los Contenidos, es necesario que el Usuario proporcione previamente al Prestador ciertos datos de carácter personal (“</span><span style="font-weight: 400;">Datos Personales</span><span style="font-weight: 400;">”). </span>

<span style="font-weight: 400;">Al acceder al Sitio, o a cualquiera de los Contenidos en que los Datos Personales son requeridos, el Usuario está autorizando al Prestador a realizar análisis y estudios con base en ellos. El Usuario se obliga a proporcionar Datos Personales verdaderos y fidedignos. En caso de que el Usuario diera información falsa o confusa, el Prestador no asume responsabilidad alguna de los resultados que dichos actos ocasionen al Usuario, teniendo la facultad de negar el acceso al Sitio y sus Contenidos, sin perjuicio de que pueda requerir las indemnizaciones a que hubiere lugar. </span>

&nbsp;
<h3><b>INDICADORES DE DATOS</b></h3>
<b>
</b><span style="font-weight: 400;">La información que el Usuario provea en el Sitio, real o histórica, se procesa y ordena, para que genere indicadores de datos, mismos que el Prestador podrá usar para tomar decisiones pertinentes a su negocio, siempre de manera estadística y no individualizada. El Usuario, en este acto, autoriza el acceso al Prestador a la información proporcionada y generada en el Sitio, en términos del presente documento y del Aviso de Privacidad.</span>

&nbsp;
<h3><b>USO DE COOKIES</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador informa </span><span style="font-weight: 400;">al Usuario que, mediante el uso de cookies y tecnologías similares, busca: i) garantizar la mejor experiencia posible en el Sitio; y ii) proporcionar al Usuario información sobre sus preferencias de servicios y de mercadeo, ayudándolo así a obtener la información adecuada. En caso de que el Usuario requiera de mayor información respecto al uso de cookies y tecnologías similares, el </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">pone a su disposición la Política de Uso de Cookies. </span>

&nbsp;
<h3><b>COMPATIBILIDAD DE LOS DISPOSITIVOS ELECTRÓNICOS </b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Usuario será responsable de obtener los dispositivos o hardware que sean compatibles con el Sitio, toda vez que el Prestador no garantiza que este funcione correctamente en cualquier dispositivo. De igual manera, el Usuario acepta no utilizar dispositivos, software o cualquier otro medio tendiente a interferir tanto en las actividades y/u operaciones del Sitio, como en las bases de datos y/o a la información que se contenga en el mismo.</span>

&nbsp;
<h3><b>DURACIÓN Y TERMINACIÓN</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Sitio y los Contenidos tienen una duración indefinida. Sin embargo, el </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">podrá dar por terminado o suspender temporalmente, en cualquier momento y sin necesidad de previo aviso, el Sitio y/o cualquiera de los Contenidos.</span>

&nbsp;
<h3><b>OTRAS DISPOSICIONES</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Usuario acepta que una versión impresa del presente Aviso Legal, y de cualquier comunicación enviada y/o recibida en forma electrónica, será admisible como medio probatorio en cualquier procedimiento judicial y/o administrativo.</span>

&nbsp;
<h3><b>DIVISIBILIDAD</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">En caso de que cualquier término, condición o estipulación contenida en el presente Aviso Legal se determine ineficaz, ilegal o sin efecto, el mismo podrá ser excluido del cuerpo del presente y el restante continuará en vigor y efecto en forma tan amplia como en derecho proceda.</span>

&nbsp;
<h3><b>DERECHOS</b></h3>
<span style="font-weight: 400;">Cualquier derecho que no se haya conferido expresamente en este documento, se entiende reservado al </span><span style="font-weight: 400;">Prestador.</span>

&nbsp;
<h3><b>ACTUALIZACIONES </b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Prestador podrá revisar y actualizar, en cualquier momento, el presente Aviso Legal, manteniendo en todo momento el acceso libre a todo Usuario que desee conocerlo. El Prestador </span><span style="font-weight: 400;">se reserva el derecho de modificar, en cualquier momento, la presentación y configuración del Sitio, así como el presente Aviso Legal. Por ello, el </span><span style="font-weight: 400;">Prestador </span><span style="font-weight: 400;">recomienda al Usuario dar lectura atenta cada vez que acceda al Sitio. No obstante lo anterior, el Usuario siempre dispondrá este Aviso Legal en el Sitio, de forma visible y accesible en cualquier momento. </span><span style="font-weight: 400;">Algunas cláusulas de este Aviso Legal</span> <span style="font-weight: 400;">pueden estar supeditadas a términos y condiciones designados expresamente y que se encuentren en el SItio o en determinados sitios web.</span>

&nbsp;
<h3><b>LEY APLICABLE Y JURISDICCIÓN</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">En todo lo relacionado con la interpretación y cumplimiento de lo aquí dispuesto, por el solo hecho de acceder al Sitio, el Usuario acepta someterse a las legislación federal de México y a la jurisdicción de los tribunales competentes en la Ciudad de [</span><span style="font-weight: 400;">*</span><span style="font-weight: 400;">], México; renunciando a cualquier otra jurisdicción que, por razón de sus domicilios presentes o futuros, pudiese corresponderles.</span>

&nbsp;
<h3><b>ACEPTACIÓN DEL AVISO LEGAL</b><b></b></h3>
&nbsp;

<span style="font-weight: 400;">El Usuario reconoce que, mediante el ingreso y uso del Sitio, manifiesta su aceptación expresa y adhesión al presente Aviso Legal</span><span style="font-weight: 400;">, en </span><span style="font-weight: 400;">la versión publicada al momento en que se acceda al Sitio, en términos de lo establecido por los artículos 1803 y 1834 Bis del Código Civil Federal, 80, 81, 89 y demás relativos y aplicables del Código de Comercio y la legislación aplicable para la República Mexicana. </span><span style="font-weight: 400;">Es responsabilidad única y exclusiva del Usuario, leer previamente este Aviso Legal, y sus modificaciones correspondientes, cada vez que accede al Sitio, por lo que si en cualquier momento, el Usuario no estuviera de acuerdo, total o parcialmente con el presente Aviso Legal, deberá abstenerse inmediatamente de acceder al Sitio y su Contenido. Por lo anterior, con la aceptación del presente Aviso Legal, el Usuario consiente expresamente sujetarse al mismo, por lo que manifiesta haber leído el contenido de todas y cada una de las disposiciones y ratifica su contenido.</span>

&nbsp;

<span style="font-weight: 400;">Fecha de primera emisión: [26 de Agosto 2022</span><span style="font-weight: 400;">].</span>

<span style="font-weight: 400;">Fecha de última modificación: [</span><span style="font-weight: 400;">26 de Agosto 2022</span><span style="font-weight: 400;">].</span>
`;

export const Terms = () => {
  // const { country } = useSelector((state: RootState) => state.countryReducer);

  // const [markdown, setMarkdown] = useState("");

  // useEffect(() => {
  //   const terms = country === COUNTRY.CO.iso ? termsCo : termsMx;
  //   fetch(terms)
  //     .then((res) => res.text())
  //     .then((text) => setMarkdown(text));
  // }, []);

  const scrollTop = () => {
    window.focus();
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <Container style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      {/* <ReactMarkdown children={markdown} /> */}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{
        __html: TermsHTML
      }} />
    </Container>
  );
};
