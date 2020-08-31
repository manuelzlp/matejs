# matejs

FAQ - Preguntas técnicas

¿Para qué sirve mate.js?
Esta librería te permite crear componentes HTML reutilizables. En cada componente puedes incluir variables y funciones condicionales básicas y actualizar el componente en cualquier momento.

¿Cómo instalo mate.js?
No es necesario instalar nada, simplemente descargas mate.js y lo incluyes un tu página como cualquier script. Por ejemplo, <script src="assets/mate.js"></script> suponiendo que mate.js se encuentra en la carpeta assets en el mismo directorio que tu página web.

¿Cómo creo un componente?
Los componentes se definen entre los tags <elements></elements>. Por ejemplo:

<elements>
  <componente1>
    Esto es un componente. Puedo incluir variables entre llaves, por ejemplo: {{variable1}}
  </componente1>
</elements>

¿Cómo muestro un componente en pantalla?
Los componentes se muestran dentro de contenedores. Para crear un contenedor, crea un <div id="nombreDelContenedor"></div>. Luego, debes crear variables para tus contenedores y componentes. Por ejemplo:

<script>
  var contenedor1 = new Container('nombreDelContenedor'); // el nombre del contenedor es la ID del div
  var elemento1 = new Element('componente1'); // el nombre de un elemento es el tag definido dentro de <elements></elements>
  
  contenedor1.add(elemento1); // añadimos el elemento al contenedor
  contenedor1.render(); // esta función muestra en pantalla todos los elementos asociados al contenedor
</script>

También puedes añadir un array de componentes a un contenedor. Por ejemplo:

<script>

var menu = new Container('menu');
var botones = [];
botones[0] = new Element('boton').set({caption: 'haz click aquí.'});
botones[1] = new Element('boton').set({caption: 'volver atrás'});
botones[2] = new Element('boton').set({caption: 'continuar'});

menu.add(botones); // cada elemento del array es añadido al contenedor

</script>

¿Cómo defino la/s variable/s de un componente?
Utilizando la función elemento.set({variable: 'valor', variable2: 'segundo valor'});
Luego de cambiar una variable, debes ejecutar la función render() del contenedor para actualizar el componente en pantalla.

¿Puedo usar condicionales dentro de un componente?
Sí. La sintaxis para esto es: {{if:variable=valor}} código a mostrar si la condición es verdadera {{endif}}
No hay límite de variables ni de condiciones a utilizar en un elemento. La librería reemplazará cada aparición de {{variable}}.

¿Cómo elimino un componente de un contenedor?
Mediante la función contenedor.remove(elemento);
También puedes eliminar un array de elementos.

¿Cómo puedo reiniciar un contenedor?
La función contenedor.clearElements() elimina todos los elementos del contenedor.

FAQ - Sobre el desarrollo de mate.js

¿Por qué escribiste esta librería?
Porque necesitaba poder reciclar componentes y las librerías que encontré en Internet me parecían demasiado complejas y pesadas. Mate.js es una herramienta práctica que funciona muy bien para proyectos sencillos.

¿Vas a seguir desarrollando mate.js?
Sí. Hay muchas funciones que quiero incluir, manteniendo siempre la idea de simplicidad y limpieza de código.

¿Puedo colaborar en el desarrollo de mate.js?
Sí. Cualquiera puede modificarlo, optimizarlo y añadir funcionalidades.

¿Puedo utilizar mate.js en mis proyectos?
Sí. Mate.js es libre y de código abierto.
