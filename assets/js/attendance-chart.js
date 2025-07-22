async function getStats() {
    const attendanceUrl = '/stats/attendance.json';
    const response = await fetch(attendanceUrl);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
}

async function getWinnerStats() {
    const winnersUrl = '/stats/winners.json';
    const response = await fetch(winnersUrl);
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
    // TODO move to separate page?
    if(!data.hasOwnProperty(year)) {
        console.log(`No data: ${year}`)
        return;
    }
    const yearData = [].concat(data[year]);
    console.log(yearData);
    const regex = /([^:]+ : )?(?<name>.*)/;
    const winners = yearData.reduce((acc, event) => {
        if(event.winner === '') return acc;
        for(let winner of event.winner.split(', ')){
            let { name } = regex.exec(winner).groups;
            // console.log(name);
            if (acc.hasOwnProperty(name)) {
                acc[name]++;
            } else {
                acc[name] = 1;
            }
        }
        return acc;
    }, {});
    console.log(winners);

    // update title
    const spanYear = document.getElementById('spanYear');
    spanYear.innerHTML  = year;

    // update table body
    const winnerTableBody = document.getElementById('winnerTableBody');
    winnerTableBody.innerHTML = '';
    const arrWinners = Object.entries(winners)
        .map(([name, wins], index) => { return { name, wins } })
        .sort(sortWinners);
    arrWinners.forEach((winner) => { addRow(winnerTableBody, winner); });
}

(async function() {
    const stats = await getStats();
    const winnersStats = await getWinnerStats();
    console.log(winnersStats);

    const years = Object.keys(stats).sort().reverse();
    const initialYear = years[0];
    // populate select input
    const yearSelect = document.getElementById('year-select');
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
            data: prepareData(stats, initialYear),
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
    updateWinnerTable(winnersStats, initialYear);

    yearSelect.onchange = function(evt) {
        const year = evt.target.value;
        const newData = prepareData(stats, year);
        if (newData == null) throw new Error('No data');
        updateWinnerTable(winnersStats, year);
        chart.data.labels = newData.labels;
        chart.data.datasets = newData.datasets;
        chart.update();
    }
})();
