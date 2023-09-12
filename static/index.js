document.addEventListener("DOMContentLoaded", function () {
    districtFilter();
    collegeFilter();
  });
  
//districtFilter() functions as when we click assam checkbox on html only "Baksa","Barpeta"....... are showing. and when we click assam,manipur checkbox it will show "Baksa","Barpeta",.........,"Bishnupur","Chandel",.......... 

  function districtFilter() {
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
  
    const stateCheckboxes = document.querySelectorAll('input[name="stateCheckbox"]');
    const districtCheckboxesContainer = document.getElementById("districtCheckboxes");
    const selectedDistricts = [];
  
    stateCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        districtCheckboxesContainer.innerHTML = ""; // Clear previous checkboxes
        selectedDistricts.length = 0; // Clear selected districts array
  
        stateCheckboxes.forEach((stateCheckbox) => {
          if (stateCheckbox.checked) {
            selectedDistricts.push(...districtData[stateCheckbox.value]);
          }
        });
  
        selectedDistricts.forEach((district) => {
          const districtCheckbox = document.createElement("input");
          districtCheckbox.type = "checkbox";
          districtCheckbox.name = "districtCheckbox";
          districtCheckbox.value = district;
  
          const label = document.createElement("label");
          label.textContent = district;
  
          districtCheckboxesContainer.appendChild(districtCheckbox);
          districtCheckboxesContainer.appendChild(label);
        //   districtCheckboxesContainer.appendChild(document.createElement('br'));
        });
      });
    });
  }
  
//collegeFilter() functions as when we click Diploma checkbox on html only 'Polytechnic' is showing. and when we click diploma,Engineering from  checkbox it will show 'Polytechnic',"B.Tech + B.E", "M.Tech + M.E". 

  function collegeFilter() {
    const courseData = {
      DiplomaCollege: ["Polytechnic"],
      EngineeringCollege: ["BTech_BE", "MTech_ME"],
      ComputerScienceCollege: ["BCA", "MCA"],
      PostgraduateCollege: ["MSC"],
      EmploymentExchangeCollege: ["EmploymentExchange"],
      DgreeCollege: ["NotEngineeringCourses"],
      School: ["HighSchool", "KendriyaVidyalaya"]
    };
  
    const clgCheckboxes = document.querySelectorAll('input[name="clgCheckbox"]');
    const courseCheckboxesContainer = document.getElementById("courseCheckboxes");
    const selectedCourses = [];
  
    clgCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        courseCheckboxesContainer.innerHTML = ""; // Clear previous checkboxes
        selectedCourses.length = 0; // Clear selected courses array
  
        clgCheckboxes.forEach((clgCheckbox) => {
          if (clgCheckbox.checked) {
            selectedCourses.push(...courseData[clgCheckbox.value]);
          }
        });
  
        selectedCourses.forEach((course) => {
          const courseCheckbox = document.createElement("input");
          courseCheckbox.type = "checkbox";
          courseCheckbox.name = "courseCheckbox";
          courseCheckbox.value = course;
  
          const label = document.createElement("label");
          label.textContent = course;
  
          courseCheckboxesContainer.appendChild(courseCheckbox);
          courseCheckboxesContainer.appendChild(label);
        //   courseCheckboxesContainer.appendChild(document.createElement('br'));
        });
      });
    });
  }