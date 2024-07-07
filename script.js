const token = "431abef01fb4ce0b774bfef12944333f05e27837"


async function ensureCustomField(fieldName, fieldType) {
    const urlGet = `https://api.pipedrive.com/v1/dealFields?api_token=${token}`;
    let fieldId = null;

    try {
        const response = await fetch(urlGet);
        const data = await response.json();
        const field = data.data.find(f => f.name === fieldName);
        if (field) {
            fieldId = field.key;
            console.log(`Field '${fieldName}' already exists with ID: ${fieldId}`);
            return fieldId;
        }
    } catch (error) {
        console.error('Error fetching fields:', error);
    }

    const urlPost = `https://api.pipedrive.com/v1/dealFields?api_token=${token}`;
    const postData = {
        name: fieldName,
        field_type: fieldType,
        add_visible_flag: true
    };

    try {
        const response = await fetch(urlPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        if (data.success) {
            fieldId = data.data.key;
            console.log(`Created new field '${fieldName}' with ID: ${fieldId}`);
            return fieldId;
        }
    } catch (error) {
        console.error('Error creating field:', error);
    }

    return fieldId;
}

document.getElementById('dealForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const jobName = document.getElementById('dealName').value
    const jobValue = document.getElementById('value').value
    const fieldData = [
        {
            name: "first name",
            field_type: "text",
            value: document.getElementById('firstName').value,
        },
        {
            name: "last name",
            field_type: "text",
            value: document.getElementById('lastName').value,
        },
        {
            name: "phone",
            field_type: "phtextone",
            value: document.getElementById('phone').value,
        },
        {
            name: "email",
            field_type: "text",
            value: document.getElementById('email').value,

        },
        {
            name: "job typy",
            field_type: "text",
            value: document.getElementById('jobType').value,

        },
        {
            name: "job source",
            field_type: "text",
            value: document.getElementById('jobSource').value,

        },
        {
            name: "job comment",
            field_type: "address",
            value: document.getElementById('jobComment').value,

        },
        {
            name: "address",
            field_type: "address",
            value: document.getElementById('address').value,

        },
        {
            name: "city",
            field_type: "address",
            value: document.getElementById('city').value,

        },
        {
            name: "state",
            field_type: "text",
            value: document.getElementById('state').value,

        },
        {
            name: "zip code",
            field_type: "double",
            value: document.getElementById('zipCode').value,

        },
        {
            name: "date",
            field_type: "date",
            value: document.getElementById('date').value,

        },
        {
            name: "start time",
            field_type: "time",
            value: document.getElementById('startTime').value,

        },
        {
            name: "end time",
            field_type: "time",
            value: document.getElementById('endTime').value,

        },
        {
            name: "technician",
            field_type: "text",
            value: document.getElementById('technician').value

        },
    ]
    const mainFieldData = {
        title: jobName,
        value: jobValue,
    };

    for (const field of fieldData) {
        const fieldId = await ensureCustomField(field.name, field.field_type);
        mainFieldData[fieldId] = field.value;
    }

    try {
        const response = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mainFieldData)
        });

        const result = await response.json();
        console.log("result", result)

        if (response.ok) {
            document.getElementById('statusMessage').textContent = 'Bitim muvaffaqiyatli saqlandi!';
        } else {
            throw new Error(`Bitimni saqlashda xato: ${result.error || 'Noma’lum xato'}`);
        }
    } catch (error) {
        document.getElementById('statusMessage').textContent = error.message;
    }
});
