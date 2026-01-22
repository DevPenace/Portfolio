/* ============================================
   Lógica da Calculadora de CO₂
   ============================================ */

// Fatores de emissão de CO₂ (kg CO₂ por km)
const emissionFactors = {
    carro_gasolina: 0.21,
    carro_diesel: 0.19,
    carro_eletrico: 0.05,
    moto: 0.08,
    onibus: 0.09,
    trem: 0.04,
    bicicleta: 0.00,
    a_pe: 0.00
};

// Nomes amigáveis para tipos de transporte
const transportNames = {
    carro_gasolina: '🚗 Carro a Gasolina',
    carro_diesel: '🚗 Carro a Diesel',
    carro_eletrico: '⚡ Carro Elétrico',
    moto: '🏍️ Motocicleta',
    onibus: '🚌 Ônibus',
    trem: '🚂 Trem',
    bicicleta: '🚴 Bicicleta',
    a_pe: '🚶 A Pé'
};

// Array para armazenar as viagens
let trips = [];

// Função para carregar viagens do localStorage
function loadTripsFromStorage() {
    const stored = localStorage.getItem('co2Trips');
    if (stored) {
        trips = JSON.parse(stored);
        updateUI();
    }
}

// Função para salvar viagens no localStorage
function saveTripsToStorage() {
    localStorage.setItem('co2Trips', JSON.stringify(trips));
}

// Função para calcular emissão de CO₂
function calculateEmissions(distance, transportType) {
    const factor = emissionFactors[transportType] || 0;
    return distance * factor;
}

// Função para adicionar uma nova viagem
function addTrip() {
    const distanceInput = document.getElementById('distance');
    const transportInput = document.getElementById('transport');
    const descriptionInput = document.getElementById('description');

    const distance = parseFloat(distanceInput.value);
    const transport = transportInput.value;
    const description = descriptionInput.value.trim();

    // Validações
    if (!distance || distance <= 0) {
        alert('Por favor, informe uma distância válida (maior que 0).');
        distanceInput.focus();
        return;
    }

    if (!transport) {
        alert('Por favor, selecione um tipo de transporte.');
        transportInput.focus();
        return;
    }

    // Criar objeto de viagem
    const trip = {
        id: Date.now(),
        distance: distance,
        transport: transport,
        description: description || 'Sem descrição',
        emissions: calculateEmissions(distance, transport),
        date: new Date().toISOString()
    };

    // Adicionar à lista
    trips.push(trip);

    // Salvar no localStorage
    saveTripsToStorage();

    // Limpar formulário
    distanceInput.value = '';
    transportInput.value = '';
    descriptionInput.value = '';
    distanceInput.focus();

    // Atualizar UI
    updateUI();

    // Mostrar mensagem de sucesso
    showSuccessMessage('Viagem adicionada com sucesso!');
}

// Função para remover uma viagem
function removeTrip(tripId) {
    if (confirm('Tem certeza que deseja remover esta viagem?')) {
        trips = trips.filter(trip => trip.id !== tripId);
        saveTripsToStorage();
        updateUI();
        showSuccessMessage('Viagem removida com sucesso!');
    }
}

// Função para limpar todo o histórico
function clearAllTrips() {
    if (trips.length === 0) {
        alert('Nenhuma viagem para limpar.');
        return;
    }

    if (confirm('Tem certeza que deseja limpar TODO o histórico de viagens? Esta ação não pode ser desfeita.')) {
        trips = [];
        saveTripsToStorage();
        updateUI();
        showSuccessMessage('Histórico limpo com sucesso!');
    }
}

// Função para calcular totais
function calculateTotals() {
    const totalDistance = trips.reduce((sum, trip) => sum + trip.distance, 0);
    const totalEmissions = trips.reduce((sum, trip) => sum + trip.emissions, 0);
    const avgEmissions = trips.length > 0 ? totalEmissions / trips.length : 0;

    return {
        count: trips.length,
        distance: totalDistance,
        emissions: totalEmissions,
        average: avgEmissions
    };
}

// Função para atualizar a UI
function updateUI() {
    updateStats();
    updateTripsList();
}

// Função para atualizar as estatísticas
function updateStats() {
    const totals = calculateTotals();

    document.getElementById('totalTrips').textContent = totals.count;
    document.getElementById('totalDistance').textContent = `${totals.distance.toFixed(1)} km`;
    document.getElementById('totalEmissions').textContent = `${totals.emissions.toFixed(2)} kg`;
    document.getElementById('avgEmissions').textContent = `${totals.average.toFixed(2)} kg`;
    // Atualizar versões compactas (sidebar), se existirem
    const smallTrips = document.getElementById('totalTripsSmall');
    if (smallTrips) smallTrips.textContent = totals.count;
    const smallEm = document.getElementById('totalEmissionsSmall');
    if (smallEm) smallEm.textContent = `${totals.emissions.toFixed(2)}`;
}

// Função para atualizar a lista de viagens
function updateTripsList() {
    const tripsList = document.getElementById('tripsList');

    if (trips.length === 0) {
        tripsList.innerHTML = '<p class="empty-message">Nenhuma viagem registrada ainda. Adicione sua primeira viagem!</p>';
        return;
    }

    // Ordenar viagens por data (mais recentes primeiro)
    const sortedTrips = [...trips].sort((a, b) => new Date(b.date) - new Date(a.date));

    tripsList.innerHTML = sortedTrips.map(trip => `
        <div class="trip-card" data-id="${trip.id}">
            <div class="trip-info">
                <h3>${trip.description}</h3>
                <div class="trip-details">
                    <div class="trip-detail">
                        <strong>Transporte:</strong> ${transportNames[trip.transport]}
                    </div>
                    <div class="trip-detail">
                        <strong>Distância:</strong> ${trip.distance.toFixed(1)} km
                    </div>
                    <div class="trip-detail">
                        <strong>Data:</strong> ${new Date(trip.date).toLocaleString('pt-BR')}
                    </div>
                </div>
            </div>
            <div class="trip-emission">
                <div class="trip-emission-value">${trip.emissions.toFixed(2)}</div>
                <div class="trip-emission-label">kg CO₂</div>
                <button class="btn-delete" data-id="${trip.id}" aria-label="Remover viagem">Remover</button>
            </div>
        </div>
    `).join('');
}

// Delegação de evento para remover viagem (mais acessível/seguro que onclick inline)
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.classList && target.classList.contains('btn-delete')) {
        const id = Number(target.getAttribute('data-id'));
        if (!Number.isNaN(id)) removeTrip(id);
    }
});

// Cria CSV reutilizável
function createCsv() {
    const totals = calculateTotals();
    let csvContent = 'Relatório de Emissões de CO₂\n';
    csvContent += `Gerado em: ${new Date().toLocaleString('pt-BR')}\n\n`;
    csvContent += 'RESUMO GERAL\n';
    csvContent += `Total de viagens: ${totals.count}\n`;
    csvContent += `Distância total: ${totals.distance.toFixed(1)} km\n`;
    csvContent += `CO₂ Total emitido: ${totals.emissions.toFixed(2)} kg\n`;
    csvContent += `Média por viagem: ${totals.average.toFixed(2)} kg\n\n`;
    csvContent += 'DETALHES DAS VIAGENS\n';
    csvContent += 'Data,Transporte,Distância (km),Emissão (kg CO₂),Descrição\n';

    const sorted = [...trips].sort((a, b) => new Date(b.date) - new Date(a.date));
    sorted.forEach(trip => {
        csvContent += `"${new Date(trip.date).toLocaleString('pt-BR')}","${transportNames[trip.transport]}",${trip.distance.toFixed(1)},${trip.emissions.toFixed(2)},"${trip.description}"\n`;
    });

    return csvContent;
}

// Copiar CSV para clipboard
function copyData() {
    if (trips.length === 0) {
        alert('Nenhuma viagem para copiar.');
        return;
    }
    const csv = createCsv();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(csv).then(() => {
            showSuccessMessage('CSV copiado para a área de transferência!');
        }).catch(() => {
            alert('Falha ao copiar para a área de transferência.');
        });
    } else {
        // Fallback: criar textarea temporário
        const ta = document.createElement('textarea');
        ta.value = csv;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showSuccessMessage('CSV copiado para a área de transferência!');
        } catch (err) {
            alert('Falha ao copiar para a área de transferência.');
        }
        document.body.removeChild(ta);
    }
}

// Compartilhar via Web Share API (se disponível)
function shareData() {
    if (trips.length === 0) {
        alert('Nenhuma viagem para compartilhar.');
        return;
    }
    const csv = createCsv();
    if (navigator.share) {
        navigator.share({
            title: 'Relatório de Emissões de CO₂',
            text: csv
        }).then(() => {
            showSuccessMessage('Compartilhado com sucesso!');
        }).catch(() => {
            // usuário cancelou ou erro
        });
    } else {
        // Fallback: copiar para clipboard
        copyData();
    }
}

// Alternar tema e persistir em localStorage
function toggleTheme(enabled) {
    if (enabled) {
        document.body.classList.add('dark');
        localStorage.setItem('co2Theme', 'dark');
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('co2Theme', 'light');
    }
}

// Função para exportar dados
function exportData() {
    if (trips.length === 0) {
        alert('Nenhuma viagem para exportar.');
        return;
    }
    const csvContent = createCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `relatorio-co2-${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccessMessage('Dados exportados com sucesso!');
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(message) {
    // Criar elemento de mensagem
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    messageEl.textContent = message;

    // Adicionar animação CSS (apenas uma vez)
    if (!document.getElementById('co2-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'co2-toast-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(400px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(messageEl);

    // Remover após 3 segundos
    setTimeout(() => {
        messageEl.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageEl);
        }, 300);
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Carregar viagens ao iniciar
    loadTripsFromStorage();

    // Restaurar tema salvo
    const savedTheme = localStorage.getItem('co2Theme');
    const themeToggle = document.getElementById('themeToggle');
    if (savedTheme === 'dark') {
        toggleTheme(true);
        if (themeToggle) themeToggle.checked = true;
    }

    // Botão de adicionar viagem
    const addBtn = document.getElementById('addBtn');
    if (addBtn) addBtn.addEventListener('click', addTrip);

    // Enter para adicionar viagem
    document.getElementById('distance').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTrip();
    });

    document.getElementById('transport').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTrip();
    });

    document.getElementById('description').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTrip();
    });

    // Botão de limpar
    const clearBtn = document.getElementById('clearBtn');
    if (clearBtn) clearBtn.addEventListener('click', clearAllTrips);

    // Botões de exportar / copiar (main e sidebar)
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) exportBtn.addEventListener('click', exportData);
    const exportBtnSmall = document.getElementById('exportBtnSmall');
    if (exportBtnSmall) exportBtnSmall.addEventListener('click', exportData);

    const copyBtn = document.getElementById('copyBtn');
    if (copyBtn) copyBtn.addEventListener('click', copyData);
    const copyBtnSmall = document.getElementById('copyBtnSmall');
    if (copyBtnSmall) copyBtnSmall.addEventListener('click', copyData);

    // Botão de compartilhar
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.addEventListener('click', shareData);

    // Tema
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => toggleTheme(e.target.checked));
    }
});
