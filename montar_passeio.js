// Dados dos atrativos e transfers, sem informações de preço
const atrativosData = [
    { id: 'andorinhas', name: "ANDORINHAS E GAIVOTAS", duration: "3 HORAS", time: "MANHÃ 9:00 / TARDE 15:00" },
    { id: 'betania-dia', name: "BETÂNIA (DIA INTEIRO)", duration: "DIA INTEIRO", time: "SAÍDA 9:00 / RETORNO 18:00" },
    { id: 'betania-meio', name: "BETÂNIA (MEIO PERÍODO)", duration: "3 HORAS", time: "MANHÃ 9:00 / TARDE 15:00" },
    { id: 'emendadas', name: "EMENDADAS", duration: "MEIO PERÍODO", time: "SAÍDA 13:30 / RETORNO 19:00" },
    { id: 'lagoa-america', name: "LAGOA DA AMÉRICA (VOADEIRA)", duration: "3 HORAS", time: "MANHÃ 9:00 / TARDE 15:00" },
    { id: 'travosa', name: "TRAVOSA", duration: "DIA INTEIRO", time: "SAÍDA 9:00 / RETORNO 18:00" },
    { id: 'rancharia', name: "RANCHARIA", duration: "DIA INTEIRO", time: "SAÍDA 9:00 / RETORNO 18:00" },
    { id: 'ponta-verde', name: "PONTA VERDE", duration: "DIA INTEIRO", time: "SAÍDA 9:00 / RETORNO 18:00" },
    { id: 'ponta-verde-barco', name: "PONTA VERDE (BARCO)", duration: "3 HORAS", time: "MANHÃ 9:00 / TARDE 15:00" },
    { id: 'lavado-espigao', name: "LAVADO E ESPIGÃO", duration: "DIA INTEIRO", time: "SAÍDA 9:00 / RETORNO 18:00" },
    { id: 'praia-trilha', name: "PRAIA (TRILHA DO PESCADOR)", duration: "3 HORAS", time: "MANHÃ 9:00 / TARDE 15:00" },
    { id: 'passeio-noturno', name: "PASSEIO NOTURNO", duration: "3 HORAS", time: "SAÍDA 20:00 / RETORNO 23:00" },
    { id: 'amanhecer', name: "AMANHECER SOLAR", duration: "3 HORAS", time: "SAÍDA 4:30 / RETORNO 7:30" },
    { id: 'trekking', name: "TREKKING", duration: "4 DIAS", time: "-" },
    { id: 'passeio-noturno-completo', name: "PASSEIO NOTURNO COMPLETO", duration: "3 HORAS", time: "SAÍDA 20:00 / RETORNO 23:00" }
];

const transfersData = [
    { id: 'transf-s-sao-luis', name: "TRANSFER SÃO LUÍS PARA SANTO AMARO", details: "Até 4 pessoas - PRIVATIVO", discount: " 20% OFF -> Ida e Volta" }, // Adicionado o desconto aqui!
    { id: 'transf-s-barreirinhas', name: "TRANSF SANTO AMARO/BARREIRINHAS", details: "Veículo 4x4." },
    { id: 'transf-s-sangue', name: "TRANSF SANTO AMARO/SANGUE", details: "Veículo 4x4." },
    { id: 'transf-betania-sangue', name: "TRANSF BETÂNIA/SANGUE", details: "Veículo 4x4." },
    { id: 'transf-betania-barreirinhas', name: "TRANSF BETÂNIA/BARREIRINHAS", details: "Veículo 4x4." },
    { id: 'transf-betania-s-amaro', name: "TRANSF BETÂNIA/SANTO AMARO", details: "Veículo 4x4." },
    { id: 'transf-andorinha-s-amaro', name: "TRANSF ANDORINHA/SANTO AMARO", details: "Veículo 4x4." },
    { id: 'transf-emendadas-s-amaro', name: "TRANSF EMENDADAS/SANTO AMARO", details: "Veículo 4x4." },
    { id: 'transf-s-jeri', name: "TRANSF S. AMARO/JERI", details: "Veículo 4x4." },
    { id: 'transf-corrego-murici', name: "TRANSF CORREGO DO MURICI / SANTO AMARO", details: "Veículo 4x4." }
];

// Objeto para organizar todos os itens por tipo
const allItems = {
    coletivos: atrativosData,
    privativos: atrativosData, // Usamos os mesmos dados de atrativos para ambos
    transfers: transfersData
};

// Objeto para armazenar os itens selecionados (usando o ID único como chave)
let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};

// Referências aos elementos do DOM
const coletivosGrid = document.getElementById('coletivos-grid');
const privativosGrid = document.getElementById('privativos-grid');
const transferGrid = document.getElementById('transfer-grid');
const selectedItemsList = document.getElementById('selected-items');
const summaryTotalPrice = document.getElementById('summary-total-price');
const floatingTotalPrice = document.getElementById('floating-total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');
const floatingCartSummary = document.getElementById('floating-cart-summary');
const alertMessage = document.getElementById('alert-message');

// --- FUNÇÕES DE FORMATAÇÃO DE DATA ---
function formatDateToBrazilian(dateString) {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
}

function formatDateToInput(dateString) {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('-');
    return `${year}-${month}-${day}`;
}
// --- FIM DAS FUNÇÕES DE FORMATAÇÃO DE DATA ---

// Função para renderizar os cards dos itens
function renderItems(items, container, typeCategory) {
    container.innerHTML = '';
    items.forEach(item => {
        const uniqueId = `${item.id}-${typeCategory}`; 
        const card = document.createElement('div');
        
        card.className = `card ${selectedItems[uniqueId] ? 'selected' : ''}`;
        
        if (uniqueId === 'transf-s-sao-luis-transfers') {
            card.classList.add('highlighted');
        }

        card.dataset.id = uniqueId;
        card.dataset.name = item.name;
        card.dataset.type = typeCategory;

        let detailsHtml = '';
        if (typeCategory === 'coletivos' || typeCategory === 'privativos') {
            detailsHtml = `
                <div class="details">
                    <span><i class="far fa-clock"></i> Duração: ${item.duration}</span>
                    <span><i class="far fa-calendar-alt"></i> Horário: ${item.time}</span>
                </div>
            `;
        } else if (typeCategory === 'transfers' && item.details) {
            detailsHtml = `
                <div class="details">
                    <span><i class="fas fa-info-circle"></i> ${item.details}</span>
                </div>
            `;
        }
        
        // Adiciona a exibição do desconto se existir
        let discountHtml = '';
        if (item.discount) {
            discountHtml = `<span class="discount">${item.discount}</span>`;
        }

        card.innerHTML = `
            <h3>${item.name} ${typeCategory === 'coletivos' ? '(Coletivo)' : typeCategory === 'privativos' ? '(Privativo)' : ''}</h3>
            <span class="price">Consulte Valor ${discountHtml}</span>
            ${detailsHtml}
        `;
        card.addEventListener('click', () => toggleSelection(uniqueId, item.name, typeCategory, item.discount)); // Passa o desconto
        container.appendChild(card);
    });
}

// Função para adicionar ou remover um item do carrinho
function toggleSelection(id, name, typeCategory, discount = '') { // Recebe o desconto
    const cardElement = document.querySelector(`.card[data-id="${id}"]`);
    if (selectedItems[id]) {
        delete selectedItems[id];
        if (cardElement) {
            cardElement.classList.remove('selected');
        }
        showAlert(`${name} removido do roteiro.`, 'orange');
    } else {
        selectedItems[id] = { id: id, name: name, type: typeCategory, date: '', discount: discount }; // Salva o desconto!
        if (cardElement) {
            cardElement.classList.add('selected');
        }
        showAlert(`${name} adicionado ao roteiro!`, 'green');
    }
    saveCart();
    updateSummary();
}

// Função para remover item do resumo (carrinho)
function removeItem(id) {
    const itemToRemove = selectedItems[id];
    if (itemToRemove) {
        delete selectedItems[id];
        const cardElement = document.querySelector(`.card[data-id="${id}"]`);
        if (cardElement) {
            cardElement.classList.remove('selected');
        }
        showAlert(`${itemToRemove.name} removido do roteiro.`, 'orange');
        saveCart();
        updateSummary();
    }
}

// Função para atualizar a data de um item no carrinho
function updateItemDate(id, dateValueFromInput) {
    if (selectedItems[id]) {
        selectedItems[id].date = formatDateToBrazilian(dateValueFromInput);
        saveCart();
    }
}

// Função para atualizar o resumo do carrinho e a barra flutuante
function updateSummary() {
    selectedItemsList.innerHTML = '';
    
    if (Object.keys(selectedItems).length === 0) {
        emptyCartMessage.style.display = 'block';
        floatingCartSummary.classList.remove('show');
    } else {
        emptyCartMessage.style.display = 'none';
        floatingCartSummary.classList.add('show');
    }

    for (const id in selectedItems) {
        const item = selectedItems[id];
        const listItem = document.createElement('li');

        let itemTypeDisplay = '';
        if (item.type === 'coletivos') {
            itemTypeDisplay = ' (Passeio Coletivo)';
        } else if (item.type === 'privativos') {
            itemTypeDisplay = ' (Passeio Privativo)';
        } else if (item.type === 'transfers') {
            itemTypeDisplay = ' (Transfer)';
        }

        const displayDateForInput = formatDateToInput(item.date);
        
        // Adiciona a exibição do desconto no resumo do carrinho
        let itemDiscountDisplay = '';
        if (item.discount) {
            itemDiscountDisplay = `<span class="discount-summary"> (${item.discount})</span>`;
        }

        listItem.innerHTML = `
            <div class="item-details">
                <span>${item.name}${itemTypeDisplay}${itemDiscountDisplay}</span>
                <span class="price">Consulte Valor</span>
            </div>
            <div class="item-actions">
                ${item.type !== 'transfers' ? `<label for="date-${item.id}" class="date-label">Data do Passeio:</label><input type="date" id="date-${item.id}" onchange="updateItemDate('${item.id}', this.value)" value="${displayDateForInput}">` : ''}
                <button onclick="removeItem('${item.id}')"><i class="fas fa-trash-alt"></i> Remover</button>
            </div>
        `;
        selectedItemsList.appendChild(listItem);
    }

    summaryTotalPrice.textContent = 'Aguardando Orçamento';
    floatingTotalPrice.textContent = 'Aguardando Orçamento';
}

// Função para salvar o carrinho no localStorage (sem alteração)
function saveCart() {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
}

// Função para exibir mensagens de alerta (sem alteração)
function showAlert(message, type) {
    alertMessage.textContent = message;
    alertMessage.className = '';
    alertMessage.classList.add(type);
    alertMessage.style.display = 'block';
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 3000);
}

// Função para enviar o orçamento via WhatsApp
function sendToWhatsApp() {
    const phoneNumber = '5598992254591';
    let message = 'Olá! Gostaria de um orçamento para o seguinte roteiro:\n\n';
    let hasItems = false;

    for (const id in selectedItems) {
        hasItems = true;
        const item = selectedItems[id];

        let itemTypeDisplay = '';
        if (item.type === 'coletivos') {
            itemTypeDisplay = ' (Passeio Coletivo)';
        } else if (item.type === 'privativos') {
            itemTypeDisplay = ' (Passeio Privativo)';
        } else if (item.type === 'transfers') {
            itemTypeDisplay = ' (Transfer)';
        }

        message += `- ${item.name}${itemTypeDisplay}`;
        if (item.date && item.type !== 'transfers') {
            message += ` (Data: ${item.date})`;
        }
        // Adiciona o desconto na mensagem do WhatsApp se existir
        if (item.discount) {
            message += ` ${item.discount}`;
        }
        message += '\n';
    }

    if (!hasItems) {
        showAlert('Seu carrinho está vazio. Adicione itens antes de enviar o orçamento!', 'orange');
        return;
    }

    message += '\nPor favor, confirme a disponibilidade e o valor final para este roteiro.';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderItems(allItems.coletivos, coletivosGrid, 'coletivos');
    renderItems(allItems.privativos, privativosGrid, 'privativos');
    renderItems(allItems.transfers, transferGrid, 'transfers');
    updateSummary();
});