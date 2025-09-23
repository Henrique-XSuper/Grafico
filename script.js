  function generateChart() {
            const chartTitle = document.getElementById('chartTitle').value || 'Gráfico de Lucro e Perda';
            const tableTitle = document.getElementById('tableTitle').value || 'Dados do Gráfico';
            
            const data1 = parseFloat(document.getElementById('data1').value) || 0;
            const data2 = parseFloat(document.getElementById('data2').value) || 0;
            const data3 = parseFloat(document.getElementById('data3').value) || 0;
            const data4 = parseFloat(document.getElementById('data4').value) || 0;
            
            const data = [data1, data2, data3, data4];
            const labels = ['1º Período', '2º Período', '3º Período', '4º Período'];
            
            // Encontrar valores máximo e mínimo para escala
            const maxValue = Math.max(...data, 0);
            const minValue = Math.min(...data, 0);
            const range = maxValue - minValue;
            const scale = range > 0 ? 300 / range : 1;
            
            // Gerar HTML do gráfico
            let chartHTML = `
                <div class="chart-title">${chartTitle}</div>
                <div class="chart-container">
                    <div class="y-axis"></div>
                    <div class="y-axis-labels">
                        <span>${maxValue.toFixed(0)}</span>
                        <span>0</span>
                        <span>${minValue.toFixed(0)}</span>
                    </div>
                    <div class="chart">
            `;
            
            data.forEach((value, index) => {
                const height = Math.abs(value) * scale;
                const isNegative = value < 0;
                const barClass = isNegative ? 'chart-bar negative' : 'chart-bar';
                
                chartHTML += `
                    <div class="${barClass}" style="height: ${height}px;">
                        <div class="chart-bar-value">${value > 0 ? '+' : ''}${value.toLocaleString('pt-BR')}</div>
                        <div class="chart-label">${labels[index]}</div>
                    </div>
                `;
            });
            
            chartHTML += `
                    </div>
                </div>
                <div class="data-table">
                    <div class="table-header">${tableTitle}</div>
            `;
            
            data.forEach((value, index) => {
                const status = value >= 0 ? '📈 Lucro' : '📉 Perda';
                chartHTML += `
                    <div class="table-row">
                        <span>${labels[index]}</span>
                        <span style="color: ${value >= 0 ? '#10b981' : '#ef4444'}; font-weight: 600;">
                            ${status}: ${value > 0 ? '+' : ''}${value.toLocaleString('pt-BR')}
                        </span>
                    </div>
                `;
            });
            
            chartHTML += '</div>';
            
            document.getElementById('chartDisplay').innerHTML = chartHTML;
        }
        
        // Permitir gerar gráfico com Enter
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateChart();
            }
        });
