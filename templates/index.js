const districtData = {
    ArunachalPradesh: ["Anjaw","Capital Complex Itanagar","Changlang","Dibang Valley","East Kameng","East Siang","Kamle","Kra Daadi","Kurung Kumey","Lepa Rada","Lohit","Longding","Lower Siang","Lower Subansiri","Namsai","Pakke Kessang","Papum Pare","SHI YOMI","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"],
    Assam: ["Baksa","Barpeta","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Dima Hasao","Goalpara","Golaghat","Hailakandi","Jorhat","Kamrup Metropolitan","Kamrup","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","South Salmara-Mankachar","Tinsukia","Udalguri","West Karbi Anglong"],
    Manipur: ["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"],
    Mizoram: ["Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Saitual","Serchhip"],
    Meghalaya: ["East Garo Hills","North Garo Hills","South Garo Hills","West Garo Hills","South West Garo Hills","East Khasi Hills","West Jaintia Hills","East Jaintia Hills","South West Khasi Hills","West Khasi Hills","Eastern West Khasi Hills","Ri Bhoi"],
    Nagaland: ["Chümoukedima","Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Niuland","Noklak","Peren","Phek","Shamator","Tuensang","Tseminyü","Wokha","Zünheboto"],
    Sikkim: ["Gangtok","Mangan","Pakyong","Soreng","Namchi","Gyalshing"],
    Tripura: ["West Tripura","North Tripura","South Tripura","Dhalai","Unakoti","Khowai","Sepahijala","Gomati"],
};

const stateCheckboxes = document.querySelectorAll('input[name="stateCheckbox"]');
const districtCheckboxesContainer = document.getElementById('districtCheckboxes');
const selectedDistricts = [];

stateCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        districtCheckboxesContainer.innerHTML = ''; // Clear previous checkboxes
        selectedDistricts.length = 0; // Clear selected districts array

        stateCheckboxes.forEach(stateCheckbox => {
            if (stateCheckbox.checked) {
                selectedDistricts.push(...districtData[stateCheckbox.value]);
            }
        });

        selectedDistricts.forEach(district => {
            const districtCheckbox = document.createElement('input');
            districtCheckbox.type = 'checkbox';
            districtCheckbox.name = 'districtCheckbox';
            districtCheckbox.value = district;
            districtCheckbox.textContent = district;

            const label = document.createElement('label');
            label.textContent = district;

            districtCheckboxesContainer.appendChild(districtCheckbox);
            districtCheckboxesContainer.appendChild(label);
            // districtCheckboxesContainer.appendChild(document.createElement('br'));
        });
    });
});

const courseData = {
    Diploma: ["Polytechnic"],
    Engineering: ["B.Tech + B.E","M.Tech + M.E"],
    ComputerScience: ["BCA","MCA"],
    Postgraduate: ["MSC"]
};

const clgCheckboxes = document.querySelectorAll('input[name="clgCheckbox"]');
const courseCheckboxesContainer = document.getElementById('courseCheckboxes');
const selectedCourses = [];

clgCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        courseCheckboxesContainer.innerHTML = ''; // Clear previous checkboxes
        selectedCourses.length = 0; // Clear selected courses array

        clgCheckboxes.forEach(clgCheckbox => {
            if (clgCheckbox.checked) {
                selectedCourses.push(...courseData[clgCheckbox.value]);
            }
        });

        selectedCourses.forEach(course => {
            const courseCheckbox = document.createElement('input');
            courseCheckbox.type = 'checkbox';
            courseCheckbox.name = 'courseCheckbox';
            courseCheckbox.value = course;
            courseCheckbox.textContent = course;

            const label = document.createElement('label');
            label.textContent = course;

            courseCheckboxesContainer.appendChild(courseCheckbox);
            courseCheckboxesContainer.appendChild(label);
            // courseCheckboxesContainer.appendChild(document.createElement('br'));
        });
    });
});

//......................

function updateSearchResults() {
    const stateSelect = document.getElementById("state");
    const districtSelect = document.getElementById("district");
    const collegeSelect = document.getElementById("typesofClg");
    const courseSelect = document.getElementById("course");

    const selectedStates = Array.from(stateSelect.selectedOptions, option => option.value);
    const selectedDistricts = Array.from(districtSelect.selectedOptions, option => option.value);
    const selectedColleges = Array.from(collegeSelect.selectedOptions, option => option.value);
    const selectedCourses = Array.from(courseSelect.selectedOptions, option => option.value);

    const collegeTable = document.getElementById("collegeTable").getElementsByTagName('tbody')[0];
    collegeTable.innerHTML = ''; // Clear previous search results

    // Loop through your data and add rows that match the search criteria
    for (const row of collegeData) {
        if ((selectedStates.length === 0 || selectedStates.includes(row.state)) &&
            (selectedDistricts.length === 0 || selectedDistricts.includes(row.district)) &&
            (selectedColleges.length === 0 || selectedColleges.includes(row.collegeType)) &&
            (selectedCourses.length === 0 || selectedCourses.includes(row.course))) {

            const newRow = collegeTable.insertRow();
            newRow.innerHTML = `
                <td>${row.serialNo}</td>
                <td>${row.collegeName}</td>
                <td>${row.state}</td>
                <td>${row.district}</td>
                <td>${row.collegeType}</td>
                <td>${row.course}</td>
            `;
        }
    }
}


// Attach the updateSearchResults function to the Search button's click event
document.getElementById("find").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent form submission
    updateSearchResults();
});

// var sum = parseInt(document.getElementById("sum").innerText); 
// result.innerHTML = sum;

// Sample data for the table (you can replace this with your actual data)
const collegeData = [
    { serialNo: 1, collegeName: "ABCD", state: "Assam", district: "Cachar", collegeType: "Engineering", course: "B.Tech + B.E" },
    { serialNo: 2, collegeName: "PQRS", state: "Sikkim", district: "Gangtok", collegeType: "Diploma", course: "Polytechnic" },
    { serialNo: 3, collegeName: "KGDH", state: "Sikkim", district: "Gangtok", collegeType: "Diploma", course: "Polytechnic" },
    { serialNo: 1&2&3, collegeName: "KGDH", state: "Sikkim", district: "Gangtok", collegeType: "Diploma", course: "Polytechnic" },
    { serialNo: 4, collegeName: "ijkl", state: "Assam", district: "Cachar", collegeType: "Engineering", course: "M.Tech + M.E" },
    // Add more data rows here
];


