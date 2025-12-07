// Utilice extencion de VS Live Server para ver el html en el navegador

// referencias(videos o contenido) usadas:
'https://www.youtube.com/watch?v=54THW3xgbD0'
'https://norfipc.com/codigos/como-crear-usar-botones-paginas-html5.php#google_vignette'
'https://www.hazunaweb.com/curso-de-html/listas/'

// no vi manera de verlos de 10 en 10 sin guardarlos primero,
// entonces los voy a guardar en un array para poder paginarlos
let todosLosPosts = [];
// creo la variable de paginas para ya que estan paginadas poder llevar control de eso
let paginaactual = 1;

// hacer get como dice la pagina
function pedirDatos() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {todosLosPosts = json;})
        .then(() => {mostrarPostsPaginados(paginaactual)})
}

// le estoy pidiendo 
function mostrarPostsPaginados(pagina) {
    paginaactual = pagina;
    // hago la variable posts como el div donde van los posts
    const posts = document.getElementById('posts');
    // los pongo de 10 en 10
    const inicio = (pagina - 1) * 10;
    const fin = inicio + 10;
    const postDeLaPagina = todosLosPosts.slice(inicio, fin);
    
    // Limpiamos el contenido anterior y mostramos el título de la página
    let htmlContent = `<h2>Página ${paginaactual}</h2>
    <ul style="list-style-type: none; padding: 0;">`;

    // mostramos la lista de posts
    postDeLaPagina.forEach(post => {
        // ponemos los post en lista del formato solo e sun bloque con borde y un link para ver detalles, este llama la funcion de los detalles
        htmlContent += `
            <li style="border: 1px solid #eee; margin-bottom: 5px; padding: 8px;">
                ${post.id}. <b>${post.title}</b>
                <a href="#" onclick="verDetalles(${post.id})">Ver detalles</a>
            </li>
        `;
    });
    
    htmlContent += `</ul>`; // cierro la lista 

    // pongo el contenido en el html 
    posts.innerHTML = htmlContent;

    botonesas();
}

function botonesas() {
    const posts = document.getElementById('posts');
    let botonesHtml = '<div style="margin-top: 20px;">';

    // Botón Anterior
    if (paginaactual > 1) {
        botonesHtml += `<button onclick="mostrarPostsPaginados(${paginaactual - 1})">Anterior</button>`;
    }
    // Botón Siguiente
    if (paginaactual < 10) {
        botonesHtml += `<button onclick="mostrarPostsPaginados(${paginaactual + 1})">Siguiente</button>`;
    }
    botonesHtml += '</div>';
    posts.innerHTML += botonesHtml;
}

function verDetalles(postId) {
    const posts = document.getElementById('posts');
    posts.innerHTML = '<h2>Cargandooooooooo</h2>'; 

    // hacer get de post/(id) como dice la pagina
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then(postID => {
            // hacer get de post/(id) con comentarios como dice la pagina, esto para poder poner los cometarios junto con el contenido del post
            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                .then(response => response.json())
                .then(comentarios => {
                    
                    // ponemos los detalles del post,  indicando que post es, su titulo y el cuerpo
                    let htmlDetalles = `
                        <button onclick="mostrarPostsPaginados(${paginaactual})">Volver</button>
                        <hr>
                        <h2>Detalles del Post número ${postID.id}</h2>
                        <p><b>Título:</b> ${postID.title}</p>
                        <p><b>Cuerpo:</b> ${postID.body}</p>
                        <hr>
                        <h4>Comentarios (${comentarios.length}):</h4>
                        <ul style="list-style-type: none; padding: 0;">
                    `;
                    
                    // hacemos que por cada comentario muestre el que envia el mail con el comentario que hizo, y estos van con el mismo formato que los posts
                    comentarios.forEach(comentario => {
                        htmlDetalles += `
                            <li style="border: 1px solid #eee; margin-bottom: 5px; padding: 8px;">
                                <b>De:</b> ${comentario.email}<br>
                                ${comentario.body}
                            </li>
                        `;
                    });

                    htmlDetalles += `</ul>`;
                    posts.innerHTML = htmlDetalles; // volvemos a mostrar el contenido en el html
                });
        })
}

pedirDatos();