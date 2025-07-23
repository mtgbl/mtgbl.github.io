async function getWinnerStats() {
    const winnersUrl = '/stats/winners.json';
    const response = await fetch(winnersUrl);
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
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
    if(!data.hasOwnProperty(year)) {
        console.log(`No data: ${year}`)
        return;
    }
    const yearData = [].concat(data[year]);
    const regex = /([^:]+: )?(?<name>.*)/;
    const winners = yearData.reduce((acc, event) => {
        if(event.winner === '') return acc;
        for(let winner of event.winner.split(', ')){
            let { name } = regex.exec(winner).groups;
            if (acc.hasOwnProperty(name)) {
                acc[name]++;
            } else {
                acc[name] = 1;
            }
        }
        return acc;
    }, {});

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
    const winnersStats = await getWinnerStats();

    const years = Object.keys(winnersStats).sort().reverse();
    const initialYear = years[0];
    // populate select input
    const yearSelect = document.getElementById('year-select');
    years.forEach(key => {
        let optionElement = document.createElement('option');
        optionElement.value = key;
        optionElement.innerHTML = key;
        yearSelect.appendChild(optionElement);
    });
    updateWinnerTable(winnersStats, initialYear);

    yearSelect.onchange = function(evt) {
        const year = evt.target.value;
        updateWinnerTable(winnersStats, year);
    }
})();
