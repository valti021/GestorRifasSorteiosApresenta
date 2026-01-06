document.addEventListener('DOMContentLoaded', () => {
    carregarRifas();
});

async function carregarRifas() {
    try {
        const response = await fetch('./dados-landing-page/data/local.json');
        const dados = await response.json();

        const template = document.querySelector('.rifa-card-example');
        const grid = template.parentElement;

        // remove o template da tela
        template.remove();

        dados.forEach(item => {
            const chave = Object.keys(item)[0];
            const dadosCard = item[chave];

            const card = template.cloneNode(true);
            preencherCard(card, dadosCard);

            grid.appendChild(card);
        });

    } catch (erro) {
        console.error('Erro ao carregar rifas:', erro);
    }
}

function preencherCard(card, dados) {
    // textos
    card.querySelector('.title').textContent = dados.title;
    card.querySelector('.texto').textContent = dados.description;
    card.querySelector('.price').textContent = dados.price;
    card.querySelector('.tickets-sold').append(` ${dados['tickets-sold']}`);
    card.querySelector('.draw-date').append(` ${dados['draw-date']}`);

    // imagens
    const imgContainer = card.querySelector('.img-container');
    const btnLeft = card.querySelector('.btn-left');
    const btnRight = card.querySelector('.btn-right');

    const imagens = Object.values(dados.img || {});
    let index = 0;

    function renderImagem(i) {
        imgContainer.innerHTML = '';

        const img = document.createElement('img');
        img.src = imagens[i];
        img.alt = dados.title;
        img.style.width = '100%';

        imgContainer.appendChild(img);

        btnLeft.style.display = i > 0 ? 'block' : 'none';
        btnRight.style.display = i < imagens.length - 1 ? 'block' : 'none';
    }

    if (imagens.length > 0) {
        if (imagens.length > 1) {
            btnLeft.style.display = 'block';
            btnRight.style.display = 'block';

            btnLeft.onclick = () => {
                if (index > 0) {
                    index--;
                    renderImagem(index);
                }
            };

            btnRight.onclick = () => {
                if (index < imagens.length - 1) {
                    index++;
                    renderImagem(index);
                }
            };
        }

        renderImagem(0);
    }
}
