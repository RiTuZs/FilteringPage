// This JavaScript code responds to the "DOMContentLoaded" event by executing two functions: `districtFilter()` and `collegeFilter()`. `districtFilter()` dynamically generates district checkboxes based on selected state checkboxes, while `collegeFilter()` generates course checkboxes based on selected college checkboxes, enhancing the user interface for filtering educational institutions.



// This JavaScript code listens for the "DOMContentLoaded" event, which triggers when the HTML document is fully loaded.
document.addEventListener("DOMContentLoaded", function () {
  // When the page is loaded, these two functions are called.
  districtFilter(); // Calls the districtFilter() function.
  collegeFilter(); // Calls the collegeFilter() function.
});

//districtFilter(): This function is responsible for dynamically populating checkboxes for districts based on the selected state checkboxes. Means when we click assam checkbox on html only "Baksa","Barpeta"....... are showing. and when we click assam,manipur checkbox it will show "Baksa","Barpeta",.........,"Bishnupur","Chandel",.......... 

function districtFilter() {
  // Data containing districts for different states.
  const districtData = {
      ArunachalPradesh: [
      "Anjaw","Capital Complex Itanagar","Changlang","Dibang Valley","East Kameng","East Siang","Kamle","Kra Daadi","Kurung Kumey","Lepa Rada","Lohit","Longding","Lower Siang","Lower Subansiri","Namsai","Pakke Kessang","Papum Pare","SHI YOMI","Siang","Tawang","Tirap","Upper Siang","Upper Subansiri","West Kameng","West Siang"],
      Assam: [
      "Baksa","Barpeta","Bongaigaon","Cachar","Charaideo","Chirang","Darrang","Dhemaji","Dhubri","Dibrugarh","Dima Hasao","Goalpara","Golaghat","Hailakandi","Jorhat","Kamrup Metropolitan","Kamrup","Karbi Anglong","Karimganj","Kokrajhar","Lakhimpur","Majuli","Morigaon","Nagaon","Nalbari","Sivasagar","Sonitpur","South Salmara-Mankachar","Tinsukia","Udalguri","West Karbi Anglong"
      ],
      Manipur: ["Bishnupur","Chandel","Churachandpur","Imphal East","Imphal West","Jiribam","Kakching","Kamjong","Kangpokpi","Noney","Pherzawl","Senapati","Tamenglong","Tengnoupal","Thoubal","Ukhrul"],
      Mizoram: ["Aizawl","Champhai","Hnahthial","Khawzawl","Kolasib","Lawngtlai","Lunglei","Mamit","Saiha","Saitual","Serchhip"],
      Meghalaya: ["East Garo Hills","North Garo Hills","South Garo Hills","West Garo Hills","South West Garo Hills","East Khasi Hills","West Jaintia Hills","East Jaintia Hills","South West Khasi Hills","West Khasi Hills","Eastern West Khasi Hills","Ri Bhoi"],
      Nagaland: ["Chümoukedima","Dimapur","Kiphire","Kohima","Longleng","Mokokchung","Mon","Niuland","Noklak","Peren","Phek","Shamator","Tuensang","Tseminyü","Wokha","Zünheboto"],
      Sikkim: ["Gangtok","Mangan","Pakyong","Soreng","Namchi","Gyalshing"],
      Tripura: ["West Tripura","North Tripura","South Tripura","Dhalai","Unakoti","Khowai","Sepahijala","Gomati"],
  };

  // Get all state checkboxes.
  const stateCheckboxes = document.querySelectorAll('input[name="stateCheckbox"]');
  // Get the container where district checkboxes will be added.
  const districtCheckboxesContainer = document.getElementById("districtCheckboxes");
  // An array to store selected districts.
  const selectedDistricts = [];

  stateCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      districtCheckboxesContainer.innerHTML = ""; // Clear previous checkboxes
      selectedDistricts.length = 0; // Clear selected districts array

      // Loop through each state checkbox
      stateCheckboxes.forEach((stateCheckbox) => {
        // Check if the state checkbox is checked
        if (stateCheckbox.checked) {
          // Get the value (state name) of the checked state checkbox
          const stateName = stateCheckbox.value;
          // Retrieve the list of districts for the selected state from districtData
          const subTypes = districtData[stateName];

          // Check if there are districts for the selected state and the list is not empty
          if (subTypes && subTypes.length > 0) {
            // Create a subheading (h4 element) to label the list of districts
            const subHeading = document.createElement("h4");
            subHeading.textContent = "Districts of " + stateName + ":";
            // Append the subheading to the districtCheckboxesContainer
            districtCheckboxesContainer.appendChild(subHeading);

            // Loop through each district in the list
            subTypes.forEach((district) => {
              // Create a new checkbox element for the district
              const districtCheckbox = document.createElement("input");
              districtCheckbox.type = "checkbox";
              districtCheckbox.name = "districtCheckbox";
              districtCheckbox.value = district;

              // Create a label element for the district checkbox
              const label = document.createElement("label");
              label.textContent = district;

              // Append the district checkbox and label to the districtCheckboxesContainer
              districtCheckboxesContainer.appendChild(districtCheckbox);
              districtCheckboxesContainer.appendChild(label);
            });
          }
        }
      });
    });
  });
}


//collegeFilter(): This function is responsible for dynamically populating checkboxes for courses based on the selected college checkboxes. Means when we click Diploma checkbox on html only 'Polytechnic' is showing. and when we click diploma,Engineering from  checkbox it will show 'Polytechnic',"B.Tech + B.E", "M.Tech + M.E". 

function collegeFilter() {
  // Data containing courses for different types of colleges.
  const courseData = {
    DiplomaCollege: ["Polytechnic"],
    EngineeringCollege: ["BTech_BE", "MTech_ME"],
    ComputerScienceCollege: ["BCA", "MCA"],
    PostgraduateCollege: ["MSC"],
    EmploymentExchangeCollege: ["EmploymentExchange"],
    DgreeCollege: ["NotEngineeringCourses"],
    School: ["HighSchool", "KendriyaVidyalaya"]
  };

  // Get all college checkboxes.
  const clgCheckboxes = document.querySelectorAll('input[name="clgCheckbox"]');
  // Get the container where course checkboxes will be added.
  const courseCheckboxesContainer = document.getElementById("courseCheckboxes");
  // An array to store selected courses.
  const selectedCourses = [];

  clgCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      courseCheckboxesContainer.innerHTML = ""; // Clear previous checkboxes
      selectedCourses.length = 0; // Clear selected courses array

      // Loop through each college checkbox
      clgCheckboxes.forEach((clgCheckbox) => {
        // Check if the college checkbox is checked
        if (clgCheckbox.checked) {
          // Get the value (college name) of the checked college checkbox
          const clgName = clgCheckbox.value;
          // Retrieve the list of courses for the selected college from courseData
          const subCourse = courseData[clgName];

          // Check if there are courses for the selected college and the list is not empty
          if (subCourse && subCourse.length > 0) {
            // Create a subheading (h4 element) to label the list of courses
            const subHeading2 = document.createElement("h4");
            subHeading2.textContent = "Different " + clgName + ":";
            // Append the subheading to the courseCheckboxesContainer
            courseCheckboxesContainer.appendChild(subHeading2);

            // Loop through each course in the list
            subCourse.forEach((course) => {
              // Create a new checkbox element for the course
              const courseCheckbox = document.createElement("input");
              courseCheckbox.type = "checkbox";
              courseCheckbox.name = "courseCheckbox";
              courseCheckbox.value = course;

              // Create a label element for the course checkbox
              const label = document.createElement("label");
              label.textContent = course;

              // Append the course checkbox and label to the courseCheckboxesContainer
              courseCheckboxesContainer.appendChild(courseCheckbox);
              courseCheckboxesContainer.appendChild(label);
            });
          }
        }
      });
    });
  });
}