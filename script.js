// document.getElementById('dealForm').addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const dealData = {
//         firstName: document.getElementById('firstName').value,
//         lastName: document.getElementById('lastName').value,
//         phone: document.getElementById('phone').value,
//         email: document.getElementById('email').value,
//         jobType: document.getElementById('jobType').value,
//         jobSource: document.getElementById('jobSource').value,
//         jobCommit: document.getElementById('jobCommit').value,
//         address: document.getElementById('address').value,
//         city: document.getElementById('city').value,
//         state: document.getElementById('state').value,
//         zipCode: document.getElementById('zipCode').value,
//         date: document.getElementById('date').value,
//         startTime: document.getElementById('startTime').value,
//         endTime: document.getElementById('endTime').value,
//         technician: document.getElementById('technician').value
//     };

//     try {
//         const response = await fetch('http://localhost:3000/api/create-deal', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(dealData)
//         });

//         const result = await response.json();
//         console.log(result)
//         document.getElementById('statusMessage').textContent = 'Deal successfully created!';
//     } catch (error) {
//         document.getElementById('statusMessage').textContent = 'Error creating deal.';
//         console.error('Error:', error);
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dealForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const dealData = {
            title: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            value: 1000,
            currency: 'USD',
            // Add other fields as needed
        };

        try {
            const response = await fetch('https://api.pipedrive.com/v1/deals?api_token=431abef01fb4ce0b774bfef12944333f05e27837', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dealData)
            });
            const data = await response.json();
            document.getElementById('statusMessage').textContent = 'Deal saved successfully!';
        } catch (error) {
            document.getElementById('statusMessage').textContent = 'Error saving deal!';
        }
    });
});

