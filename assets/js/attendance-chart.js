async function getStats() {
    const attendanceUrl = '/stats/attendance.json';
    const response = await fetch(attendanceUrl);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
}

function parseDate(textDate) {
    return textDate.split('.').reverse().join('-')
}

function prepareData(data, year) {
    if(!data.hasOwnProperty(year)) return null;
    const yearData = [].concat(data[year]).reverse();
    return {
        labels: yearData.map(row => parseDate(row.date)),
        datasets: [
            {
                label: 'Draft',
                data: yearData.map(row => row.players.draft),
            },
            {
                label: 'Commander',
                data: yearData.map(row => row.players.commander),
            },
        ]
    };
}

function sortWinners(a, b) {
    if(a.wins !== b.wins)
        return b.wins - a.wins;
    return a.name.localeCompare(b.name);
}

function addRow(tableBody, winner) {
    const row = document.createElement('tr');
    const nameCol = document.createElement('td');
    nameCol.innerText = winner.name;
    row.appendChild(nameCol);
    const winCol = document.createElement('td');
    winCol.innerText = winner.wins;
    row.appendChild(winCol);
    tableBody.appendChild(row);
}

function updateWinnerTable(data, year) {
    if(!data.hasOwnProperty(year)) return null;
    const yearData = [].concat(data[year]);
    const winners = yearData.reduce((acc, event) => {
        if(event.winner === '') return acc;
        for(let winner of event.winner.split(', ')){
            if (acc.hasOwnProperty(winner)) {
                acc[winner]++;
            } else {
                acc[winner] = 1;
            }
        }
        return acc;
    }, {});

    const spanYear = document.getElementById('spanYear');
    spanYear.innerHTML  = year;

    const winnerTableBody = document.getElementById('winnerTableBody');
    winnerTableBody.innerHTML = '';
    const arrWinners = Object.entries(winners)
        .map(([name, wins], index) => { return { name, wins } })
        .sort(sortWinners);
    arrWinners.forEach((winner) => { addRow(winnerTableBody, winner); });
}

(async function() {
    const stats = await getStats();

    const yearSelect = document.getElementById('year-select');
    const years = Object.keys(stats).sort().reverse();
    years.forEach(key => {
        let optionElement = document.createElement('option');
        optionElement.value = key;
        optionElement.innerHTML = key;
        yearSelect.appendChild(optionElement);
    });

    const chart = new Chart(
        document.getElementById('attendanceChart'),
        {
            type: 'bar',
            data: prepareData(stats, years[0]),
            options: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        }
    );
    updateWinnerTable(stats, years[0]);

    yearSelect.onchange = function(evt) {
        const year = evt.target.value;
        const newData = prepareData(stats, year);
        if (newData == null) throw new Error('No data');
        updateWinnerTable(stats, year);
        chart.data.labels = newData.labels;
        chart.data.datasets = newData.datasets;
        chart.update();
    }
})();