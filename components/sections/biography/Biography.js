/* Función principal para el efecto de máquina de escribir */
function typeWriter(element, text, speed) {
    return new Promise((resolve) => {
        let i = 0;
        element.innerHTML = '';
        
        /* Creamos el elemento visual del cursor */
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.innerHTML = '&nbsp;';
        element.appendChild(cursor);

        /* Función interna recursiva para escribir letra por letra */
        function type() {
            if (i < text.length) {
                cursor.before(text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                /* Removemos el cursor al terminar la línea actual */
                cursor.remove();
                resolve();
            }
        }
        type();
    });
}

/* Iniciamos la secuencia cuando el DOM esté listo */
document.addEventListener('DOMContentLoaded', async () => {
    /* Seleccionamos el título y guardamos su texto */
    const titleElement = document.querySelector('.bio-title');
    const titleText = titleElement.textContent;
    titleElement.textContent = '';

    /* Seleccionamos todos los párrafos y h2 dentro de la tarjeta */
    const elements = document.querySelectorAll('.bio-card h2, .bio-card p');
    const contentData = Array.from(elements).map(el => ({
        element: el,
        text: el.textContent
    }));

    /* Limpiamos el contenido inicial para que no se vea doble */
    elements.forEach(el => el.textContent = '');

    /* Ejecución secuencial con 'await' para que sea uno tras otro */
    await typeWriter(titleElement, titleText, 60);

    /* Pequeña pausa antes de empezar con la tarjeta */
    setTimeout(async () => {
        for (const item of contentData) {
            /* Velocidad ajustable: 30ms es rápido y fluido */
            await typeWriter(item.element, item.text, 30);
        }
    }, 500);
});