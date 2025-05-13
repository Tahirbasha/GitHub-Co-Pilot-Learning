window.onload =  function () {
    // input element with id "username" on input event
    const usernameInput = document.getElementById('username');
    usernameInput.addEventListener('input', function () {
        const username = usernameInput.value;
        // regex to check if username contains atleast one capital letter, one number and one special character
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (regex.test(username)) {
            usernameInput.style.borderColor = 'green';
            usernameInput.style.backgroundColor = 'lightgreen';
        } else {
            usernameInput.style.borderColor = 'red';
            usernameInput.style.backgroundColor = 'lightcoral';
        }
        // Display the username in the div with id "username-display"
        const usernameDisplay = document.getElementById('username-display');
        usernameDisplay.textContent = username;
        usernameDisplay.style.display = username ? 'block' : 'none';
    }); 

        document.getElementById('downloadBtn').addEventListener('click', function () {
        const canvas = document.getElementById('barChart');
        const image = canvas.toDataURL('image/png'); // Convert canvas to PNG image
        const link = document.createElement('a');
        link.href = image;
        link.download = 'chart.png'; // Set the file name for download
        link.click(); // Trigger the download
    });
    const ctx = document.getElementById('barChart').getContext('2d');

    function getInputValues() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const incomeValues = months.map(month => {
            const input = document.getElementById(`${month.toLowerCase()}-income`);
            return input ? parseFloat(input.value) || 0 : 0;
        });
        const expenseValues = months.map(month => {
            const input = document.getElementById(`${month.toLowerCase()}-expenses`);
            return input ? parseFloat(input.value) || 0 : 0;
        });
        return { incomeValues, expenseValues };
    }

    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Income',
                data: [], // Initially empty
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [], // Initially empty
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expenses'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0, // Set the minimum value of the y-axis
                    max: 100, // Set the maximum value of the y-axis
                    ticks: {
                        stepSize: 10 // Optional: Set the step size for the y-axis
                    }
                    
                }
            }
        }
    });
    // Update chart data when the "Chart" tab is clicked
    document.getElementById('chart-tab').addEventListener('click', () => {
        const { incomeValues, expenseValues } = getInputValues();
        barChart.data.datasets[0].data = incomeValues;
        barChart.data.datasets[1].data = expenseValues;
        barChart.update();
    });
}