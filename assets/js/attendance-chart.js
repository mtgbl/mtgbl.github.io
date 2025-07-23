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

(async function() {
    const stats = await getStats();

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

    yearSelect.onchange = function(evt) {
        const year = evt.target.value;
        const newData = prepareData(stats, year);
        if (newData == null) throw new Error('No data');
        chart.data.labels = newData.labels;
        chart.data.datasets = newData.datasets;
        chart.update();
    }
})();
