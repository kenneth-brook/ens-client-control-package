const clientList = document.getElementById('clients');
const flexButton = document.getElementById('flexButton');
const formPull = document.getElementById('fullForm');
let singleGrab = "";

function pageLaunch() {
    fetch('https://client-control.911-ens-services.com:3000/clients') 
  .then(response => { 
    if (response.ok) { 
      return response.json(); // Parse the response data as JSON 
    } else { 
      throw new Error('API request failed'); 
    } 
  }) 
  .then(data => {
    data.forEach((client) => {
        let id = client.key;
        let name = client.name;
        let opItem = `<option value=${id}>${name}</option>`;
        clientList.innerHTML += opItem;
    });
  }) 
  .catch(error => { 
    // Handle any errors here 
    console.error(error); // Example: Logging the error to the console 
  });
}

function selectClient(data) {
    fetch(`https://client-control.911-ens-services.com:3000/clients/${data}`) 
  .then(response => { 
    if (response.ok) { 
      return response.json(); // Parse the response data as JSON 
    } else { 
      throw new Error('API request failed'); 
    } 
  }) 
  .then(data => {
    singleGrab = data;
    console.log(singleGrab)
    fillForm();
  }) 
  .catch(error => { 
    // Handle any errors here 
    console.error(error); // Example: Logging the error to the console 
  });

  flexButton.innerText = "Update";
  flexButton.type = "submit"
  flexButton.form = formPull;
  flexButton.onclick = function() {event.preventDefault(), updateClient(formPull)};
}

// Start new client form

function newClient() {
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const uuid = generateUUID();
  console.log(uuid);

  const fullFormWrap = document.getElementById('fullForm');

    const formLable = document.createElement('h3');
    fullFormWrap.appendChild(formLable);
    formLable.innerText = `New Client Form - New License Key = ${uuid}`;

    const block1Title = document.createElement('h5');
    fullFormWrap.appendChild(block1Title);
    block1Title.innerText = "Client Contact Information"

    const block1 = document.createElement('div');
    fullFormWrap.appendChild(block1);
    block1.className = "formRow";

    const uuidInput = document.createElement('input');
    block1.appendChild(uuidInput);
    uuidInput.name = "key";
    uuidInput.type = "hidden";
    uuidInput.value = `${uuid}`;

    const nameInputWrap = document.createElement('div');
    block1.appendChild(nameInputWrap);
    nameInputWrap.className = "inputWrap";

    const nameLabel = document.createElement('label');
    nameInputWrap.appendChild(nameLabel);
    nameLabel.for = "name";
    nameLabel.innerText = "Client Name:"

    const nameInput = document.createElement('input');
    nameInputWrap.appendChild(nameInput);
    nameInput.name = "name";
    nameInput.type = "text";
    nameInput.setAttribute('id','name');

    const addressInputWrap = document.createElement('div');
    block1.appendChild(addressInputWrap);
    addressInputWrap.className = "inputWrap";

    const addressLabel = document.createElement('label');
    addressInputWrap.appendChild(addressLabel);
    addressLabel.for = "address";
    addressLabel.innerText = "Client Address:"

    const addressInput = document.createElement('input');
    addressInputWrap.appendChild(addressInput);
    addressInput.name = "address";
    addressInput.type = "text";
    addressInput.setAttribute('id','address');

    const cityInputWrap = document.createElement('div');
    block1.appendChild(cityInputWrap);
    cityInputWrap.className = "inputWrap";

    const cityLabel = document.createElement('label');
    cityInputWrap.appendChild(cityLabel);
    cityLabel.for = "city";
    cityLabel.innerText = "City:"

    const cityInput = document.createElement('input');
    cityInputWrap.appendChild(cityInput);
    cityInput.name = "city";
    cityInput.type = "text";
    cityInput.setAttribute('id','city');

    const stateInputWrap = document.createElement('div');
    block1.appendChild(stateInputWrap);
    stateInputWrap.className = "inputWrap";

    const stateLabel = document.createElement('label');
    stateInputWrap.appendChild(stateLabel);
    stateLabel.for = "state";
    stateLabel.innerText = "State:"

    const stateInput = document.createElement('input');
    stateInputWrap.appendChild(stateInput);
    stateInput.name = "state";
    stateInput.type = "text";
    stateInput.setAttribute('id','state');

    const zipInputWrap = document.createElement('div');
    block1.appendChild(zipInputWrap);
    zipInputWrap.className = "inputWrap";

    const zipLabel = document.createElement('label');
    zipInputWrap.appendChild(zipLabel);
    zipLabel.for = "zip";
    zipLabel.innerText = "Zip Code:"

    const zipInput = document.createElement('input');
    zipInputWrap.appendChild(zipInput);
    zipInput.name = "zip";
    zipInput.type = "text";
    zipInput.setAttribute('id','zip');

    const phoneInputWrap = document.createElement('div');
    block1.appendChild(phoneInputWrap);
    phoneInputWrap.className = "inputWrap";

    const phoneLabel = document.createElement('label');
    phoneInputWrap.appendChild(phoneLabel);
    phoneLabel.for = "phone";
    phoneLabel.innerText = "Phone Number:"

    const phoneInput = document.createElement('input');
    phoneInputWrap.appendChild(phoneInput);
    phoneInput.name = "phone_number";
    phoneInput.type = "text";
    phoneInput.setAttribute('id','phone');

    const emailInputWrap = document.createElement('div');
    block1.appendChild(emailInputWrap);
    emailInputWrap.className = "inputWrap";

    const emailLabel = document.createElement('label');
    emailInputWrap.appendChild(emailLabel);
    emailLabel.for = "email";
    emailLabel.innerText = "Email:"

    const emailInput = document.createElement('input');
    emailInputWrap.appendChild(emailInput);
    emailInput.name = "email";
    emailInput.type = "text";
    emailInput.setAttribute('id','email');

    const websiteInputWrap = document.createElement('div');
    block1.appendChild(websiteInputWrap);
    websiteInputWrap.className = "inputWrap";

    const websiteLabel = document.createElement('label');
    websiteInputWrap.appendChild(websiteLabel);
    websiteLabel.for = "website";
    websiteLabel.innerText = "Website Address:"

    const websiteInput = document.createElement('input');
    websiteInputWrap.appendChild(websiteInput);
    websiteInput.name = "website";
    websiteInput.type = "text";
    websiteInput.setAttribute('id','website');

    /* END Client Contact Information */

    const block2Title = document.createElement('h5');
    fullFormWrap.appendChild(block2Title);
    block2Title.innerText = "Account Controls"

    const block2 = document.createElement('div');
    fullFormWrap.appendChild(block2);
    block2.className = "formRow";

    const activeInputWrap = document.createElement('div');
    block2.appendChild(activeInputWrap);
    activeInputWrap.className = "inputWrap";

    const activeLabel = document.createElement('label');
    activeInputWrap.appendChild(activeLabel);
    activeLabel.for = "active";
    activeLabel.innerText = "Subscription Active?:";

    const activeArray = ['<option value="active">Active</option>', '<option value="inactive">Inactive</option>']

    const activeInput = document.createElement('select');
    activeInputWrap.appendChild(activeInput);
    activeInput.name = "active";
    activeInput.setAttribute('id','active');
    activeArray.forEach ((data) =>{
      const opt = document.getElementById('active');
      opt.innerHTML += data;
    })

    /* */

    const planInputWrap = document.createElement('div');
    block2.appendChild(planInputWrap);
    planInputWrap.className = "inputWrap";

    const planLabel = document.createElement('label');
    planInputWrap.appendChild(planLabel);
    planLabel.for = "plan";
    planLabel.innerText = "Subscription Plan:";

    const optArray = ['<option value="bronze">Bronze</option>', '<option value="silver">Silver</option>', '<option value="gold">Gold</option>', '<option value="platinum">Platinum</option>']

    const planInput = document.createElement('select');
    planInputWrap.appendChild(planInput);
    planInput.name = "plan";
    planInput.setAttribute('id','plan');
    optArray.forEach ((data) =>{
      const opt = document.getElementById('plan');
      opt.innerHTML += data;
    })

    /* END Account Controls */

    const block3Title = document.createElement('h5');
    fullFormWrap.appendChild(block3Title);
    block3Title.innerText = "Database Controls"

    const block3 = document.createElement('div');
    fullFormWrap.appendChild(block3);
    block3.className = "formRow";

    const dbSyncInputWrap = document.createElement('div');
    block3.appendChild(dbSyncInputWrap);
    dbSyncInputWrap.className = "inputWrap";

    const dbSyncLabel = document.createElement('label');
    dbSyncInputWrap.appendChild(dbSyncLabel);
    dbSyncLabel.for = "dbsync";
    dbSyncLabel.innerText = "DBSync?:";

    const dbSyncArray = ['<option value="active">Active</option>', '<option value="inactive">Inactive</option>']

    const dbSyncInput = document.createElement('select');
    dbSyncInputWrap.appendChild(dbSyncInput);
    dbSyncInput.name = "dbsync";
    dbSyncInput.setAttribute('id','dbSync');
    dbSyncArray.forEach ((data) =>{
      const opt = document.getElementById('dbSync');
      opt.innerHTML += data;
    })

    /* */

    const rawDBAddressInputWrap = document.createElement('div');
    block3.appendChild(rawDBAddressInputWrap);
    rawDBAddressInputWrap.className = "inputWrap";

    const rawDBAddressLabel = document.createElement('label');
    rawDBAddressInputWrap.appendChild(rawDBAddressLabel);
    rawDBAddressLabel.for = "rawDBAddress";
    rawDBAddressLabel.innerText = "Raw Data Base Address:"

    const rawDBAddressInput = document.createElement('input');
    rawDBAddressInputWrap.appendChild(rawDBAddressInput);
    rawDBAddressInput.name = "raw_server";
    rawDBAddressInput.type = "text";
    rawDBAddressInput.setAttribute('id','rawDBAddress');

    /* */

    const rawDBUserInputWrap = document.createElement('div');
    block3.appendChild(rawDBUserInputWrap);
    rawDBUserInputWrap.className = "inputWrap";

    const rawDBUserLabel = document.createElement('label');
    rawDBUserInputWrap.appendChild(rawDBUserLabel);
    rawDBUserLabel.for = "rawDBUser";
    rawDBUserLabel.innerText = "Raw Data Base User:"

    const rawDBUserInput = document.createElement('input');
    rawDBUserInputWrap.appendChild(rawDBUserInput);
    rawDBUserInput.name = "raw_user";
    rawDBUserInput.type = "text";
    rawDBUserInput.setAttribute('id','rawDBUser');

    /* */

    const rawDBPassInputWrap = document.createElement('div');
    block3.appendChild(rawDBPassInputWrap);
    rawDBPassInputWrap.className = "inputWrap";

    const rawDBPassLabel = document.createElement('label');
    rawDBPassInputWrap.appendChild(rawDBPassLabel);
    rawDBPassLabel.for = "rawDBPass";
    rawDBPassLabel.innerText = "Raw Data Base Pass:"

    const rawDBPassInput = document.createElement('input');
    rawDBPassInputWrap.appendChild(rawDBPassInput);
    rawDBPassInput.name = "raw_pass";
    rawDBPassInput.type = "password";
    rawDBPassInput.setAttribute('id','rawDBPass');

    /* */

    const rawDBTableInputWrap = document.createElement('div');
    block3.appendChild(rawDBTableInputWrap);
    rawDBTableInputWrap.className = "inputWrap";

    const rawDBTableLabel = document.createElement('label');
    rawDBTableInputWrap.appendChild(rawDBTableLabel);
    rawDBTableLabel.for = "rawDBTable";
    rawDBTableLabel.innerText = "Raw Data Base Table:"

    const rawDBTableInput = document.createElement('input');
    rawDBTableInputWrap.appendChild(rawDBTableInput);
    rawDBTableInput.name = "raw_table";
    rawDBTableInput.type = "text";
    rawDBTableInput.setAttribute('id','rawDBTable');

    /* */

    const rawDBTypeInputWrap = document.createElement('div');
    block3.appendChild(rawDBTypeInputWrap);
    rawDBTypeInputWrap.className = "inputWrap";

    const rawDBTypeLabel = document.createElement('label');
    rawDBTypeInputWrap.appendChild(rawDBTypeLabel);
    rawDBTypeLabel.for = "rawDBType";
    rawDBTypeLabel.innerText = "Raw Data Base Type:"

    const rawDBTypeInput = document.createElement('input');
    rawDBTypeInputWrap.appendChild(rawDBTypeInput);
    rawDBTypeInput.name = "db_type";
    rawDBTypeInput.type = "text";
    rawDBTypeInput.setAttribute('id','rawDBType');

    /* */

    const transDBAddressInputWrap = document.createElement('div');
    block3.appendChild(transDBAddressInputWrap);
    transDBAddressInputWrap.className = "inputWrap";

    const transDBAddressLabel = document.createElement('label');
    transDBAddressInputWrap.appendChild(transDBAddressLabel);
    transDBAddressLabel.for = "transDBAddress";
    transDBAddressLabel.innerText = "Translation Data Base Address:"

    const transDBAddressInput = document.createElement('input');
    transDBAddressInputWrap.appendChild(transDBAddressInput);
    transDBAddressInput.name = "trans_db_loc";
    transDBAddressInput.type = "text";
    transDBAddressInput.setAttribute('id','transDBAddress');

    /* END Database Controls */

    const block4Title = document.createElement('h5');
    fullFormWrap.appendChild(block4Title);
    block4Title.innerText = "Database Translation Key"

    const block4 = document.createElement('div');
    fullFormWrap.appendChild(block4);
    block4.className = "formRow";

    /* */

    const agencyTypeInputWrap = document.createElement('div');
    block4.appendChild(agencyTypeInputWrap);
    agencyTypeInputWrap.className = "inputWrap";

    const agencyTypeLabel = document.createElement('label');
    agencyTypeInputWrap.appendChild(agencyTypeLabel);
    agencyTypeLabel.for = "agencyType";
    agencyTypeLabel.innerText = "Agency Type:"

    const agencyTypeInput = document.createElement('input');
    agencyTypeInputWrap.appendChild(agencyTypeInput);
    agencyTypeInput.name = "agency_type";
    agencyTypeInput.type = "text";
    agencyTypeInput.setAttribute('id','agencyType');

    /* */

    const battalionInputWrap = document.createElement('div');
    block4.appendChild(battalionInputWrap);
    battalionInputWrap.className = "inputWrap";

    const battalionLabel = document.createElement('label');
    battalionInputWrap.appendChild(battalionLabel);
    battalionLabel.for = "battalion";
    battalionLabel.innerText = "Battalion:"

    const battalionInput = document.createElement('input');
    battalionInputWrap.appendChild(battalionInput);
    battalionInput.name = "battalion";
    battalionInput.type = "text";
    battalionInput.setAttribute('id','battalion');

    /* */

    const dbCityInputWrap = document.createElement('div');
    block4.appendChild(dbCityInputWrap);
    dbCityInputWrap.className = "inputWrap";

    const dbCityLabel = document.createElement('label');
    dbCityInputWrap.appendChild(dbCityLabel);
    dbCityLabel.for = "dbCity";
    dbCityLabel.innerText = "City:"

    const dbCityInput = document.createElement('input');
    dbCityInputWrap.appendChild(dbCityInput);
    dbCityInput.name = "db_city";
    dbCityInput.type = "text";
    dbCityInput.setAttribute('id','dbCity');

    /* */

    const creationInputWrap = document.createElement('div');
    block4.appendChild(creationInputWrap);
    creationInputWrap.className = "inputWrap";

    const creationLabel = document.createElement('label');
    creationInputWrap.appendChild(creationLabel);
    creationLabel.for = "creation";
    creationLabel.innerText = "Creation:"

    const creationInput = document.createElement('input');
    creationInputWrap.appendChild(creationInput);
    creationInput.name = "creation";
    creationInput.type = "text";
    creationInput.setAttribute('id','creation');

    /* */

    const crossstreetsInputWrap = document.createElement('div');
    block4.appendChild(crossstreetsInputWrap);
    crossstreetsInputWrap.className = "inputWrap";

    const crossstreetsLabel = document.createElement('label');
    crossstreetsInputWrap.appendChild(crossstreetsLabel);
    crossstreetsLabel.for = "crossstreets";
    crossstreetsLabel.innerText = "Crossstreets:"

    const crossstreetsInput = document.createElement('input');
    crossstreetsInputWrap.appendChild(crossstreetsInput);
    crossstreetsInput.name = "crossstreets";
    crossstreetsInput.type = "text";
    crossstreetsInput.setAttribute('id','crossstreets');

    /* */

    const enteredQueueInputWrap = document.createElement('div');
    block4.appendChild(enteredQueueInputWrap);
    enteredQueueInputWrap.className = "inputWrap";

    const enteredQueueLabel = document.createElement('label');
    enteredQueueInputWrap.appendChild(enteredQueueLabel);
    enteredQueueLabel.for = "enteredQueue";
    enteredQueueLabel.innerText = "Entered Queue:"

    const enteredQueueInput = document.createElement('input');
    enteredQueueInputWrap.appendChild(enteredQueueInput);
    enteredQueueInput.name = "entered_queue";
    enteredQueueInput.type = "text";
    enteredQueueInput.setAttribute('id','enteredQueue');

    /* */

    const dbIdInputWrap = document.createElement('div');
    block4.appendChild(dbIdInputWrap);
    dbIdInputWrap.className = "inputWrap";

    const dbIdLabel = document.createElement('label');
    dbIdInputWrap.appendChild(dbIdLabel);
    dbIdLabel.for = "dbId";
    dbIdLabel.innerText = "Id:"

    const dbIdInput = document.createElement('input');
    dbIdInputWrap.appendChild(dbIdInput);
    dbIdInput.name = "db_id";
    dbIdInput.type = "text";
    dbIdInput.setAttribute('id','dbId');

    /* */

    const jurisdictionInputWrap = document.createElement('div');
    block4.appendChild(jurisdictionInputWrap);
    jurisdictionInputWrap.className = "inputWrap";

    const jurisdictionLabel = document.createElement('label');
    jurisdictionInputWrap.appendChild(jurisdictionLabel);
    jurisdictionLabel.for = "jurisdiction";
    jurisdictionLabel.innerText = "Jurisdiction:"

    const jurisdictionInput = document.createElement('input');
    jurisdictionInputWrap.appendChild(jurisdictionInput);
    jurisdictionInput.name = "jurisdiction";
    jurisdictionInput.type = "text";
    jurisdictionInput.setAttribute('id','jurisdiction');

    /* */

    const latitudeInputWrap = document.createElement('div');
    block4.appendChild(latitudeInputWrap);
    latitudeInputWrap.className = "inputWrap";

    const latitudeLabel = document.createElement('label');
    latitudeInputWrap.appendChild(latitudeLabel);
    latitudeLabel.for = "latitude";
    latitudeLabel.innerText = "Latitude:"

    const latitudeInput = document.createElement('input');
    latitudeInputWrap.appendChild(latitudeInput);
    latitudeInput.name = "latitude";
    latitudeInput.type = "text";
    latitudeInput.setAttribute('id','latitude');

    /* */

    const locationInputWrap = document.createElement('div');
    block4.appendChild(locationInputWrap);
    locationInputWrap.className = "inputWrap";

    const locationLabel = document.createElement('label');
    locationInputWrap.appendChild(locationLabel);
    locationLabel.for = "location";
    locationLabel.innerText = "Location:"

    const locationInput = document.createElement('input');
    locationInputWrap.appendChild(locationInput);
    locationInput.name = "location";
    locationInput.type = "text";
    locationInput.setAttribute('id','location');

    /* */

    const longitudeInputWrap = document.createElement('div');
    block4.appendChild(longitudeInputWrap);
    longitudeInputWrap.className = "inputWrap";

    const longitudeLabel = document.createElement('label');
    longitudeInputWrap.appendChild(longitudeLabel);
    longitudeLabel.for = "longitude";
    longitudeLabel.innerText = "Longitude:"

    const longitudeInput = document.createElement('input');
    longitudeInputWrap.appendChild(longitudeInput);
    longitudeInput.name = "longitude";
    longitudeInput.type = "text";
    longitudeInput.setAttribute('id','longitude');

    /* */

    const incidentIDInputWrap = document.createElement('div');
    block4.appendChild(incidentIDInputWrap);
    incidentIDInputWrap.className = "inputWrap";

    const incidentIDLabel = document.createElement('label');
    incidentIDInputWrap.appendChild(incidentIDLabel);
    incidentIDLabel.for = "incidentID";
    incidentIDLabel.innerText = "Incident ID:"

    const incidentIDInput = document.createElement('input');
    incidentIDInputWrap.appendChild(incidentIDInput);
    incidentIDInput.name = "master_incident_id";
    incidentIDInput.type = "text";
    incidentIDInput.setAttribute('id','incidentID');

    /* */

    const premiseInputWrap = document.createElement('div');
    block4.appendChild(premiseInputWrap);
    premiseInputWrap.className = "inputWrap";

    const premiseLabel = document.createElement('label');
    premiseInputWrap.appendChild(premiseLabel);
    premiseLabel.for = "premise";
    premiseLabel.innerText = "Premise:"

    const premiseInput = document.createElement('input');
    premiseInputWrap.appendChild(premiseInput);
    premiseInput.name = "premise";
    premiseInput.type = "text";
    premiseInput.setAttribute('id','premise');

    /* */

    const priorityInputWrap = document.createElement('div');
    block4.appendChild(priorityInputWrap);
    priorityInputWrap.className = "inputWrap";

    const priorityLabel = document.createElement('label');
    priorityInputWrap.appendChild(priorityLabel);
    priorityLabel.for = "priority";
    priorityLabel.innerText = "Priority:"

    const priorityInput = document.createElement('input');
    priorityInputWrap.appendChild(priorityInput);
    priorityInput.name = "priority";
    priorityInput.type = "text";
    priorityInput.setAttribute('id','priority');

    /* */

    const sequencenumberInputWrap = document.createElement('div');
    block4.appendChild(sequencenumberInputWrap);
    sequencenumberInputWrap.className = "inputWrap";

    const sequencenumberLabel = document.createElement('label');
    sequencenumberInputWrap.appendChild(sequencenumberLabel);
    sequencenumberLabel.for = "sequencenumber";
    sequencenumberLabel.innerText = "Sequencenumber:"

    const sequencenumberInput = document.createElement('input');
    sequencenumberInputWrap.appendChild(sequencenumberInput);
    sequencenumberInput.name = "sequencenumber";
    sequencenumberInput.type = "text";
    sequencenumberInput.setAttribute('id','sequencenumber');

    /* */

    const stackedInputWrap = document.createElement('div');
    block4.appendChild(stackedInputWrap);
    stackedInputWrap.className = "inputWrap";

    const stackedLabel = document.createElement('label');
    stackedInputWrap.appendChild(stackedLabel);
    stackedLabel.for = "stacked";
    stackedLabel.innerText = "Stacked:"

    const stackedInput = document.createElement('input');
    stackedInputWrap.appendChild(stackedInput);
    stackedInput.name = "stacked";
    stackedInput.type = "text";
    stackedInput.setAttribute('id','stacked');

    /* */

    const dbStateInputWrap = document.createElement('div');
    block4.appendChild(dbStateInputWrap);
    dbStateInputWrap.className = "inputWrap";

    const dbStateLabel = document.createElement('label');
    dbStateInputWrap.appendChild(dbStateLabel);
    dbStateLabel.for = "dbState";
    dbStateLabel.innerText = "State:"

    const dbStateInput = document.createElement('input');
    dbStateInputWrap.appendChild(dbStateInput);
    dbStateInput.name = "db_state";
    dbStateInput.type = "text";
    dbStateInput.setAttribute('id','dbState');

    /* */

    const statusInputWrap = document.createElement('div');
    block4.appendChild(statusInputWrap);
    statusInputWrap.className = "inputWrap";

    const statusLabel = document.createElement('label');
    statusInputWrap.appendChild(statusLabel);
    statusLabel.for = "status";
    statusLabel.innerText = "Status:"

    const statusInput = document.createElement('input');
    statusInputWrap.appendChild(statusInput);
    statusInput.name = "status";
    statusInput.type = "text";
    statusInput.setAttribute('id','status');

    /* */

    const statusdatetimeInputWrap = document.createElement('div');
    block4.appendChild(statusdatetimeInputWrap);
    statusdatetimeInputWrap.className = "inputWrap";

    const statusdatetimeLabel = document.createElement('label');
    statusdatetimeInputWrap.appendChild(statusdatetimeLabel);
    statusdatetimeLabel.for = "statusdatetime";
    statusdatetimeLabel.innerText = "Status Date Time:"

    const statusdatetimeInput = document.createElement('input');
    statusdatetimeInputWrap.appendChild(statusdatetimeInput);
    statusdatetimeInput.name = "statusdatetime";
    statusdatetimeInput.type = "text";
    statusdatetimeInput.setAttribute('id','statusdatetime');

    /* */

    const typeInputWrap = document.createElement('div');
    block4.appendChild(typeInputWrap);
    typeInputWrap.className = "inputWrap";

    const typeLabel = document.createElement('label');
    typeInputWrap.appendChild(typeLabel);
    typeLabel.for = "type";
    typeLabel.innerText = "Type:"

    const typeInput = document.createElement('input');
    typeInputWrap.appendChild(typeInput);
    typeInput.name = "type";
    typeInput.type = "text";
    typeInput.setAttribute('id','type');

    /* */

    const typeDescriptionInputWrap = document.createElement('div');
    block4.appendChild(typeDescriptionInputWrap);
    typeDescriptionInputWrap.className = "inputWrap";

    const typeDescriptionLabel = document.createElement('label');
    typeDescriptionInputWrap.appendChild(typeDescriptionLabel);
    typeDescriptionLabel.for = "typeDescription";
    typeDescriptionLabel.innerText = "Type Description:"

    const typeDescriptionInput = document.createElement('input');
    typeDescriptionInputWrap.appendChild(typeDescriptionInput);
    typeDescriptionInput.name = "type_description";
    typeDescriptionInput.typeDescription = "text";
    typeDescriptionInput.setAttribute('id','typeDescription');

    /* */

    const zoneInputWrap = document.createElement('div');
    block4.appendChild(zoneInputWrap);
    zoneInputWrap.className = "inputWrap";

    const zoneLabel = document.createElement('label');
    zoneInputWrap.appendChild(zoneLabel);
    zoneLabel.for = "zone";
    zoneLabel.innerText = "Zone:"

    const zoneInput = document.createElement('input');
    zoneInputWrap.appendChild(zoneInput);
    zoneInput.name = "zone";
    zoneInput.zone = "text";
    zoneInput.setAttribute('id','zone');

    // button control

    flexButton.innerText = "Save";
    flexButton.type = "submit"
    flexButton.form = formPull;
    flexButton.onclick = function() {event.preventDefault(), enterClient(formPull)};
}

function enterClient(formPull) {
  let formData = new FormData(formPull);
  let object = {};
  formData.forEach(function(value, key){
    if (value == "") {
      value = "XX";
    }
    object[key] = value;
  });
  let json = JSON.stringify(object); 

  console.log(json)

   // Send JSON object to the server
   fetch("https://client-control.911-ens-services.com:3000/clients", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/JSON',
    },
    body: JSON.stringify(object),
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    // Handle success, update UI, etc.
})
.catch(error => {
    console.error('Error:', error);
    // Handle error, show error message, etc.
});
}

function updateClient(form) {
  let formData = new FormData(form);
  let object = {};
  formData.forEach(function(value, key){
    object[key] = value;
  });
  let json = JSON.stringify(object);
  const lKey = singleGrab.key

  console.log(lKey)

   // Send JSON object to the server
   fetch(`https://client-control.911-ens-services.com:3000/clients/${lKey}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: json,
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
    // Handle success, update UI, etc.
})
.catch(error => {
    console.error('Error:', error);
    // Handle error, show error message, etc.
});
}

function fillForm() {
    const fullFormWrap = document.getElementById('fullForm');

    const formLable = document.createElement('h3');
    fullFormWrap.appendChild(formLable);
    formLable.innerText = `Data for: ${singleGrab.name} --- License Key: ${singleGrab.key}`;

    const block1Title = document.createElement('h5');
    fullFormWrap.appendChild(block1Title);
    block1Title.innerText = "Client Contact Information"

    const block1 = document.createElement('div');
    fullFormWrap.appendChild(block1);
    block1.className = "formRow";

    /*const idInput = document.createElement('input');
    block1.appendChild(idInput);
    idInput.name = "id";
    idInput.type = "hidden";
    idInput.setAttribute('id','id');
    idInput.value = `${singleGrab.id}`;*/

    const nameInputWrap = document.createElement('div');
    block1.appendChild(nameInputWrap);
    nameInputWrap.className = "inputWrap";

    const nameLabel = document.createElement('label');
    nameInputWrap.appendChild(nameLabel);
    nameLabel.for = "name";
    nameLabel.innerText = "Client Name:"

    const nameInput = document.createElement('input');
    nameInputWrap.appendChild(nameInput);
    nameInput.name = "name";
    nameInput.type = "text";
    nameInput.setAttribute('id','name');
    nameInput.value = `${singleGrab.name}`;

    const addressInputWrap = document.createElement('div');
    block1.appendChild(addressInputWrap);
    addressInputWrap.className = "inputWrap";

    const addressLabel = document.createElement('label');
    addressInputWrap.appendChild(addressLabel);
    addressLabel.for = "address";
    addressLabel.innerText = "Client Address:"

    const addressInput = document.createElement('input');
    addressInputWrap.appendChild(addressInput);
    addressInput.name = "address";
    addressInput.type = "text";
    addressInput.setAttribute('id','address');
    addressInput.value = `${singleGrab.address}`;

    const cityInputWrap = document.createElement('div');
    block1.appendChild(cityInputWrap);
    cityInputWrap.className = "inputWrap";

    const cityLabel = document.createElement('label');
    cityInputWrap.appendChild(cityLabel);
    cityLabel.for = "city";
    cityLabel.innerText = "City:"

    const cityInput = document.createElement('input');
    cityInputWrap.appendChild(cityInput);
    cityInput.name = "city";
    cityInput.type = "text";
    cityInput.setAttribute('id','city');
    cityInput.value = `${singleGrab.city}`;

    const stateInputWrap = document.createElement('div');
    block1.appendChild(stateInputWrap);
    stateInputWrap.className = "inputWrap";

    const stateLabel = document.createElement('label');
    stateInputWrap.appendChild(stateLabel);
    stateLabel.for = "state";
    stateLabel.innerText = "State:"

    const stateInput = document.createElement('input');
    stateInputWrap.appendChild(stateInput);
    stateInput.name = "state";
    stateInput.type = "text";
    stateInput.setAttribute('id','state');
    stateInput.value = `${singleGrab.state}`;

    const zipInputWrap = document.createElement('div');
    block1.appendChild(zipInputWrap);
    zipInputWrap.className = "inputWrap";

    const zipLabel = document.createElement('label');
    zipInputWrap.appendChild(zipLabel);
    zipLabel.for = "zip";
    zipLabel.innerText = "Zip Code:"

    const zipInput = document.createElement('input');
    zipInputWrap.appendChild(zipInput);
    zipInput.name = "zip";
    zipInput.type = "text";
    zipInput.setAttribute('id','zip');
    zipInput.value = `${singleGrab.zip}`;

    const phoneInputWrap = document.createElement('div');
    block1.appendChild(phoneInputWrap);
    phoneInputWrap.className = "inputWrap";

    const phoneLabel = document.createElement('label');
    phoneInputWrap.appendChild(phoneLabel);
    phoneLabel.for = "phone";
    phoneLabel.innerText = "Phone Number:"

    const phoneInput = document.createElement('input');
    phoneInputWrap.appendChild(phoneInput);
    phoneInput.name = "phone_number";
    phoneInput.type = "text";
    phoneInput.setAttribute('id','phone');
    phoneInput.value = `${singleGrab.phone_number}`;

    const emailInputWrap = document.createElement('div');
    block1.appendChild(emailInputWrap);
    emailInputWrap.className = "inputWrap";

    const emailLabel = document.createElement('label');
    emailInputWrap.appendChild(emailLabel);
    emailLabel.for = "email";
    emailLabel.innerText = "Email:"

    const emailInput = document.createElement('input');
    emailInputWrap.appendChild(emailInput);
    emailInput.name = "email";
    emailInput.type = "text";
    emailInput.setAttribute('id','email');
    emailInput.value = `${singleGrab.email}`;

    const websiteInputWrap = document.createElement('div');
    block1.appendChild(websiteInputWrap);
    websiteInputWrap.className = "inputWrap";

    const websiteLabel = document.createElement('label');
    websiteInputWrap.appendChild(websiteLabel);
    websiteLabel.for = "website";
    websiteLabel.innerText = "Website Address:"

    const websiteInput = document.createElement('input');
    websiteInputWrap.appendChild(websiteInput);
    websiteInput.name = "website";
    websiteInput.type = "text";
    websiteInput.setAttribute('id','website');
    websiteInput.value = `${singleGrab.website}`;

    /* END Client Contact Information */

    const block2Title = document.createElement('h5');
    fullFormWrap.appendChild(block2Title);
    block2Title.innerText = "Account Controls"

    const block2 = document.createElement('div');
    fullFormWrap.appendChild(block2);
    block2.className = "formRow";

    const activeInputWrap = document.createElement('div');
    block2.appendChild(activeInputWrap);
    activeInputWrap.className = "inputWrap";

    const activeLabel = document.createElement('label');
    activeInputWrap.appendChild(activeLabel);
    activeLabel.for = "active";
    activeLabel.innerText = "Subscription Active?:";

    const activeArray = ['<option value="active">Active</option>', '<option value="inactive">Inactive</option>']

    const activeInput = document.createElement('select');
    activeInputWrap.appendChild(activeInput);
    activeInput.name = "active";
    activeInput.setAttribute('id','active');
    activeArray.forEach ((data) =>{
      const opt = document.getElementById('active');
      opt.innerHTML += data;
    })
    activeInput.value = `${singleGrab.active}`;

    /* */

    const planInputWrap = document.createElement('div');
    block2.appendChild(planInputWrap);
    planInputWrap.className = "inputWrap";

    const planLabel = document.createElement('label');
    planInputWrap.appendChild(planLabel);
    planLabel.for = "plan";
    planLabel.innerText = "Subscription Plan:";

    const optArray = ['<option value="bronze">Bronze</option>', '<option value="silver">Silver</option>', '<option value="gold">Gold</option>', '<option value="platinum">Platinum</option>']

    const planInput = document.createElement('select');
    planInputWrap.appendChild(planInput);
    planInput.name = "plan";
    planInput.setAttribute('id','plan');
    optArray.forEach ((data) =>{
      const opt = document.getElementById('plan');
      opt.innerHTML += data;
    })
    planInput.value = `${singleGrab.plan}`;

    /* END Account Controls */

    const block3Title = document.createElement('h5');
    fullFormWrap.appendChild(block3Title);
    block3Title.innerText = "Database Controls"

    const block3 = document.createElement('div');
    fullFormWrap.appendChild(block3);
    block3.className = "formRow";

    const dbSyncInputWrap = document.createElement('div');
    block3.appendChild(dbSyncInputWrap);
    dbSyncInputWrap.className = "inputWrap";

    const dbSyncLabel = document.createElement('label');
    dbSyncInputWrap.appendChild(dbSyncLabel);
    dbSyncLabel.for = "dbsync";
    dbSyncLabel.innerText = "DBSync?:";

    const dbSyncArray = ['<option value="active">Active</option>', '<option value="inactive">Inactive</option>']

    const dbsyncInput = document.createElement('select');
    dbSyncInputWrap.appendChild(dbsyncInput);
    dbsyncInput.name = "dbsync";
    dbsyncInput.setAttribute('id','dbsync');
    dbSyncArray.forEach ((data) =>{
      const opt = document.getElementById('dbsync');
      opt.innerHTML += data;
    })
    dbsyncInput.value = `${singleGrab.dbsync}`;

    /* */

    const rawDBAddressInputWrap = document.createElement('div');
    block3.appendChild(rawDBAddressInputWrap);
    rawDBAddressInputWrap.className = "inputWrap";

    const rawDBAddressLabel = document.createElement('label');
    rawDBAddressInputWrap.appendChild(rawDBAddressLabel);
    rawDBAddressLabel.for = "rawDBAddress";
    rawDBAddressLabel.innerText = "Raw Data Base Address:"

    const rawDBAddressInput = document.createElement('input');
    rawDBAddressInputWrap.appendChild(rawDBAddressInput);
    rawDBAddressInput.name = "raw_server";
    rawDBAddressInput.type = "text";
    rawDBAddressInput.setAttribute('id','rawDBAddress');
    rawDBAddressInput.value = `${singleGrab.raw_server}`;

    /* */

    const rawDBUserInputWrap = document.createElement('div');
    block3.appendChild(rawDBUserInputWrap);
    rawDBUserInputWrap.className = "inputWrap";

    const rawDBUserLabel = document.createElement('label');
    rawDBUserInputWrap.appendChild(rawDBUserLabel);
    rawDBUserLabel.for = "rawDBUser";
    rawDBUserLabel.innerText = "Raw Data Base User:"

    const rawDBUserInput = document.createElement('input');
    rawDBUserInputWrap.appendChild(rawDBUserInput);
    rawDBUserInput.name = "raw_user";
    rawDBUserInput.type = "text";
    rawDBUserInput.setAttribute('id','rawDBUser');
    rawDBUserInput.value = `${singleGrab.raw_user}`;

    /* */

    const rawDBPassInputWrap = document.createElement('div');
    block3.appendChild(rawDBPassInputWrap);
    rawDBPassInputWrap.className = "inputWrap";

    const rawDBPassLabel = document.createElement('label');
    rawDBPassInputWrap.appendChild(rawDBPassLabel);
    rawDBPassLabel.for = "rawDBPass";
    rawDBPassLabel.innerText = "Raw Data Base Pass:"

    const rawDBPassInput = document.createElement('input');
    rawDBPassInputWrap.appendChild(rawDBPassInput);
    rawDBPassInput.name = "raw_pass";
    rawDBPassInput.type = "password";
    rawDBPassInput.setAttribute('id','rawDBPass');
    rawDBPassInput.value = `${singleGrab.raw_pass}`;

    /* */

    const rawDBTableInputWrap = document.createElement('div');
    block3.appendChild(rawDBTableInputWrap);
    rawDBTableInputWrap.className = "inputWrap";

    const rawDBTableLabel = document.createElement('label');
    rawDBTableInputWrap.appendChild(rawDBTableLabel);
    rawDBTableLabel.for = "rawDBTable";
    rawDBTableLabel.innerText = "Raw Data Base:"

    const rawDBTableInput = document.createElement('input');
    rawDBTableInputWrap.appendChild(rawDBTableInput);
    rawDBTableInput.name = "raw_table";
    rawDBTableInput.type = "text";
    rawDBTableInput.setAttribute('id','rawDBTable');
    rawDBTableInput.value = `${singleGrab.raw_table}`;

    /* */

    const rawDBTableNameInputWrap = document.createElement('div');
    block3.appendChild(rawDBTableNameInputWrap);
    rawDBTableNameInputWrap.className = "inputWrap";

    const rawDBTableNameLabel = document.createElement('label');
    rawDBTableNameInputWrap.appendChild(rawDBTableNameLabel);
    rawDBTableNameLabel.for = "rawDBTableName";
    rawDBTableNameLabel.innerText = "Raw Table Name:"

    const rawDBTableNameInput = document.createElement('input');
    rawDBTableNameInputWrap.appendChild(rawDBTableNameInput);
    rawDBTableNameInput.name = "raw_table_name";
    rawDBTableNameInput.type = "text";
    rawDBTableNameInput.setAttribute('id','rawDBTableName');
    rawDBTableNameInput.value = `${singleGrab.raw_table_name}`;

    /* */

    const rawDBTypeInputWrap = document.createElement('div');
    block3.appendChild(rawDBTypeInputWrap);
    rawDBTypeInputWrap.className = "inputWrap";

    const rawDBTypeLabel = document.createElement('label');
    rawDBTypeInputWrap.appendChild(rawDBTypeLabel);
    rawDBTypeLabel.for = "rawDBType";
    rawDBTypeLabel.innerText = "Raw Data Base Type:"

    const rawDBTypeInput = document.createElement('input');
    rawDBTypeInputWrap.appendChild(rawDBTypeInput);
    rawDBTypeInput.name = "db_type";
    rawDBTypeInput.type = "text";
    rawDBTypeInput.setAttribute('id','rawDBType');
    rawDBTypeInput.value = `${singleGrab.db_type}`;

    /* */

    const transDBAddressInputWrap = document.createElement('div');
    block3.appendChild(transDBAddressInputWrap);
    transDBAddressInputWrap.className = "inputWrap";

    const transDBAddressLabel = document.createElement('label');
    transDBAddressInputWrap.appendChild(transDBAddressLabel);
    transDBAddressLabel.for = "transDBAddress";
    transDBAddressLabel.innerText = "Translation Data Base Address:"

    const transDBAddressInput = document.createElement('input');
    transDBAddressInputWrap.appendChild(transDBAddressInput);
    transDBAddressInput.name = "trans_db_loc";
    transDBAddressInput.type = "text";
    transDBAddressInput.setAttribute('id','transDBAddress');
    transDBAddressInput.value = `${singleGrab.trans_db_loc}`;

    /* END Database Controls */

    const block4Title = document.createElement('h5');
    fullFormWrap.appendChild(block4Title);
    block4Title.innerText = "Database Translation Key"

    const block4 = document.createElement('div');
    fullFormWrap.appendChild(block4);
    block4.className = "formRow";

    /* */

    const agencyTypeInputWrap = document.createElement('div');
    block4.appendChild(agencyTypeInputWrap);
    agencyTypeInputWrap.className = "inputWrap";

    const agencyTypeLabel = document.createElement('label');
    agencyTypeInputWrap.appendChild(agencyTypeLabel);
    agencyTypeLabel.for = "agencyType";
    agencyTypeLabel.innerText = "Agency Type:"

    const agencyTypeInput = document.createElement('input');
    agencyTypeInputWrap.appendChild(agencyTypeInput);
    agencyTypeInput.name = "agency_type";
    agencyTypeInput.type = "text";
    agencyTypeInput.setAttribute('id','agencyType');
    agencyTypeInput.value = `${singleGrab.agency_type}`;

    /* */

    const battalionInputWrap = document.createElement('div');
    block4.appendChild(battalionInputWrap);
    battalionInputWrap.className = "inputWrap";

    const battalionLabel = document.createElement('label');
    battalionInputWrap.appendChild(battalionLabel);
    battalionLabel.for = "battalion";
    battalionLabel.innerText = "Battalion:"

    const battalionInput = document.createElement('input');
    battalionInputWrap.appendChild(battalionInput);
    battalionInput.name = "battalion";
    battalionInput.type = "text";
    battalionInput.setAttribute('id','battalion');
    battalionInput.value = `${singleGrab.battalion}`;

    /* */

    const dbCityInputWrap = document.createElement('div');
    block4.appendChild(dbCityInputWrap);
    dbCityInputWrap.className = "inputWrap";

    const dbCityLabel = document.createElement('label');
    dbCityInputWrap.appendChild(dbCityLabel);
    dbCityLabel.for = "dbCity";
    dbCityLabel.innerText = "City:"

    const dbCityInput = document.createElement('input');
    dbCityInputWrap.appendChild(dbCityInput);
    dbCityInput.name = "db_city";
    dbCityInput.type = "text";
    dbCityInput.setAttribute('id','dbCity');
    dbCityInput.value = `${singleGrab.db_city}`;

    /* */

    const creationInputWrap = document.createElement('div');
    block4.appendChild(creationInputWrap);
    creationInputWrap.className = "inputWrap";

    const creationLabel = document.createElement('label');
    creationInputWrap.appendChild(creationLabel);
    creationLabel.for = "creation";
    creationLabel.innerText = "Creation:"

    const creationInput = document.createElement('input');
    creationInputWrap.appendChild(creationInput);
    creationInput.name = "creation";
    creationInput.type = "text";
    creationInput.setAttribute('id','creation');
    creationInput.value = `${singleGrab.creation}`;

    /* */

    const crossstreetsInputWrap = document.createElement('div');
    block4.appendChild(crossstreetsInputWrap);
    crossstreetsInputWrap.className = "inputWrap";

    const crossstreetsLabel = document.createElement('label');
    crossstreetsInputWrap.appendChild(crossstreetsLabel);
    crossstreetsLabel.for = "crossstreets";
    crossstreetsLabel.innerText = "Crossstreets:"

    const crossstreetsInput = document.createElement('input');
    crossstreetsInputWrap.appendChild(crossstreetsInput);
    crossstreetsInput.name = "crossstreets";
    crossstreetsInput.type = "text";
    crossstreetsInput.setAttribute('id','crossstreets');
    crossstreetsInput.value = `${singleGrab.crossstreets}`;

    /* */

    const enteredQueueInputWrap = document.createElement('div');
    block4.appendChild(enteredQueueInputWrap);
    enteredQueueInputWrap.className = "inputWrap";

    const enteredQueueLabel = document.createElement('label');
    enteredQueueInputWrap.appendChild(enteredQueueLabel);
    enteredQueueLabel.for = "enteredQueue";
    enteredQueueLabel.innerText = "Entered Queue:"

    const enteredQueueInput = document.createElement('input');
    enteredQueueInputWrap.appendChild(enteredQueueInput);
    enteredQueueInput.name = "entered_queue";
    enteredQueueInput.type = "text";
    enteredQueueInput.setAttribute('id','enteredQueue');
    enteredQueueInput.value = `${singleGrab.entered_queue}`;

    /* */

    const dbIdInputWrap = document.createElement('div');
    block4.appendChild(dbIdInputWrap);
    dbIdInputWrap.className = "inputWrap";

    const dbIdLabel = document.createElement('label');
    dbIdInputWrap.appendChild(dbIdLabel);
    dbIdLabel.for = "dbId";
    dbIdLabel.innerText = "Id:"

    const dbIdInput = document.createElement('input');
    dbIdInputWrap.appendChild(dbIdInput);
    dbIdInput.name = "db_id";
    dbIdInput.type = "text";
    dbIdInput.setAttribute('id','dbId');
    dbIdInput.value = `${singleGrab.db_id}`;

    /* */

    const jurisdictionInputWrap = document.createElement('div');
    block4.appendChild(jurisdictionInputWrap);
    jurisdictionInputWrap.className = "inputWrap";

    const jurisdictionLabel = document.createElement('label');
    jurisdictionInputWrap.appendChild(jurisdictionLabel);
    jurisdictionLabel.for = "jurisdiction";
    jurisdictionLabel.innerText = "Jurisdiction:"

    const jurisdictionInput = document.createElement('input');
    jurisdictionInputWrap.appendChild(jurisdictionInput);
    jurisdictionInput.name = "jurisdiction";
    jurisdictionInput.type = "text";
    jurisdictionInput.setAttribute('id','jurisdiction');
    jurisdictionInput.value = `${singleGrab.jurisdiction}`;

    /* */

    const latitudeInputWrap = document.createElement('div');
    block4.appendChild(latitudeInputWrap);
    latitudeInputWrap.className = "inputWrap";

    const latitudeLabel = document.createElement('label');
    latitudeInputWrap.appendChild(latitudeLabel);
    latitudeLabel.for = "latitude";
    latitudeLabel.innerText = "Latitude:"

    const latitudeInput = document.createElement('input');
    latitudeInputWrap.appendChild(latitudeInput);
    latitudeInput.name = "latitude";
    latitudeInput.type = "text";
    latitudeInput.setAttribute('id','latitude');
    latitudeInput.value = `${singleGrab.latitude}`;

    /* */

    const locationInputWrap = document.createElement('div');
    block4.appendChild(locationInputWrap);
    locationInputWrap.className = "inputWrap";

    const locationLabel = document.createElement('label');
    locationInputWrap.appendChild(locationLabel);
    locationLabel.for = "location";
    locationLabel.innerText = "Location:"

    const locationInput = document.createElement('input');
    locationInputWrap.appendChild(locationInput);
    locationInput.name = "location";
    locationInput.type = "text";
    locationInput.setAttribute('id','location');
    locationInput.value = `${singleGrab.location}`;

    /* */

    const longitudeInputWrap = document.createElement('div');
    block4.appendChild(longitudeInputWrap);
    longitudeInputWrap.className = "inputWrap";

    const longitudeLabel = document.createElement('label');
    longitudeInputWrap.appendChild(longitudeLabel);
    longitudeLabel.for = "longitude";
    longitudeLabel.innerText = "Longitude:"

    const longitudeInput = document.createElement('input');
    longitudeInputWrap.appendChild(longitudeInput);
    longitudeInput.name = "longitude";
    longitudeInput.type = "text";
    longitudeInput.setAttribute('id','longitude');
    longitudeInput.value = `${singleGrab.longitude}`;

    /* */

    const incidentIDInputWrap = document.createElement('div');
    block4.appendChild(incidentIDInputWrap);
    incidentIDInputWrap.className = "inputWrap";

    const incidentIDLabel = document.createElement('label');
    incidentIDInputWrap.appendChild(incidentIDLabel);
    incidentIDLabel.for = "incidentID";
    incidentIDLabel.innerText = "Incident ID:"

    const incidentIDInput = document.createElement('input');
    incidentIDInputWrap.appendChild(incidentIDInput);
    incidentIDInput.name = "master_incident_id";
    incidentIDInput.type = "text";
    incidentIDInput.setAttribute('id','incidentID');
    incidentIDInput.value = `${singleGrab.master_incident_id}`;

    /* */

    const premiseInputWrap = document.createElement('div');
    block4.appendChild(premiseInputWrap);
    premiseInputWrap.className = "inputWrap";

    const premiseLabel = document.createElement('label');
    premiseInputWrap.appendChild(premiseLabel);
    premiseLabel.for = "premise";
    premiseLabel.innerText = "Premise:"

    const premiseInput = document.createElement('input');
    premiseInputWrap.appendChild(premiseInput);
    premiseInput.name = "premise";
    premiseInput.type = "text";
    premiseInput.setAttribute('id','premise');
    premiseInput.value = `${singleGrab.premise}`;

    /* */

    const priorityInputWrap = document.createElement('div');
    block4.appendChild(priorityInputWrap);
    priorityInputWrap.className = "inputWrap";

    const priorityLabel = document.createElement('label');
    priorityInputWrap.appendChild(priorityLabel);
    priorityLabel.for = "priority";
    priorityLabel.innerText = "Priority:"

    const priorityInput = document.createElement('input');
    priorityInputWrap.appendChild(priorityInput);
    priorityInput.name = "priority";
    priorityInput.type = "text";
    priorityInput.setAttribute('id','priority');
    priorityInput.value = `${singleGrab.priority}`;

    /* */

    const sequencenumberInputWrap = document.createElement('div');
    block4.appendChild(sequencenumberInputWrap);
    sequencenumberInputWrap.className = "inputWrap";

    const sequencenumberLabel = document.createElement('label');
    sequencenumberInputWrap.appendChild(sequencenumberLabel);
    sequencenumberLabel.for = "sequencenumber";
    sequencenumberLabel.innerText = "Sequencenumber:"

    const sequencenumberInput = document.createElement('input');
    sequencenumberInputWrap.appendChild(sequencenumberInput);
    sequencenumberInput.name = "sequencenumber";
    sequencenumberInput.type = "text";
    sequencenumberInput.setAttribute('id','sequencenumber');
    sequencenumberInput.value = `${singleGrab.sequencenumber}`;

    /* */

    const stackedInputWrap = document.createElement('div');
    block4.appendChild(stackedInputWrap);
    stackedInputWrap.className = "inputWrap";

    const stackedLabel = document.createElement('label');
    stackedInputWrap.appendChild(stackedLabel);
    stackedLabel.for = "stacked";
    stackedLabel.innerText = "Stacked:"

    const stackedInput = document.createElement('input');
    stackedInputWrap.appendChild(stackedInput);
    stackedInput.name = "stacked";
    stackedInput.type = "text";
    stackedInput.setAttribute('id','stacked');
    stackedInput.value = `${singleGrab.stacked}`;

    /* */

    const dbStateInputWrap = document.createElement('div');
    block4.appendChild(dbStateInputWrap);
    dbStateInputWrap.className = "inputWrap";

    const dbStateLabel = document.createElement('label');
    dbStateInputWrap.appendChild(dbStateLabel);
    dbStateLabel.for = "dbState";
    dbStateLabel.innerText = "State:"

    const dbStateInput = document.createElement('input');
    dbStateInputWrap.appendChild(dbStateInput);
    dbStateInput.name = "db_state";
    dbStateInput.type = "text";
    dbStateInput.setAttribute('id','dbState');
    dbStateInput.value = `${singleGrab.db_state}`;

    /* */

    const statusInputWrap = document.createElement('div');
    block4.appendChild(statusInputWrap);
    statusInputWrap.className = "inputWrap";

    const statusLabel = document.createElement('label');
    statusInputWrap.appendChild(statusLabel);
    statusLabel.for = "status";
    statusLabel.innerText = "Status:"

    const statusInput = document.createElement('input');
    statusInputWrap.appendChild(statusInput);
    statusInput.name = "status";
    statusInput.type = "text";
    statusInput.setAttribute('id','status');
    statusInput.value = `${singleGrab.status}`;

    /* */

    const statusdatetimeInputWrap = document.createElement('div');
    block4.appendChild(statusdatetimeInputWrap);
    statusdatetimeInputWrap.className = "inputWrap";

    const statusdatetimeLabel = document.createElement('label');
    statusdatetimeInputWrap.appendChild(statusdatetimeLabel);
    statusdatetimeLabel.for = "statusdatetime";
    statusdatetimeLabel.innerText = "Status Date Time:"

    const statusdatetimeInput = document.createElement('input');
    statusdatetimeInputWrap.appendChild(statusdatetimeInput);
    statusdatetimeInput.name = "statusdatetime";
    statusdatetimeInput.type = "text";
    statusdatetimeInput.setAttribute('id','statusdatetime');
    statusdatetimeInput.value = `${singleGrab.statusdatetime}`;

    /* */

    const typeInputWrap = document.createElement('div');
    block4.appendChild(typeInputWrap);
    typeInputWrap.className = "inputWrap";

    const typeLabel = document.createElement('label');
    typeInputWrap.appendChild(typeLabel);
    typeLabel.for = "type";
    typeLabel.innerText = "Type:"

    const typeInput = document.createElement('input');
    typeInputWrap.appendChild(typeInput);
    typeInput.name = "type";
    typeInput.type = "text";
    typeInput.setAttribute('id','type');
    typeInput.value = `${singleGrab.type}`;

    /* */

    const typeDescriptionInputWrap = document.createElement('div');
    block4.appendChild(typeDescriptionInputWrap);
    typeDescriptionInputWrap.className = "inputWrap";

    const typeDescriptionLabel = document.createElement('label');
    typeDescriptionInputWrap.appendChild(typeDescriptionLabel);
    typeDescriptionLabel.for = "typeDescription";
    typeDescriptionLabel.innerText = "Type Description:"

    const typeDescriptionInput = document.createElement('input');
    typeDescriptionInputWrap.appendChild(typeDescriptionInput);
    typeDescriptionInput.name = "type_description";
    typeDescriptionInput.typeDescription = "text";
    typeDescriptionInput.setAttribute('id','typeDescription');
    typeDescriptionInput.value = `${singleGrab.type_description}`;

    /* */

    const zoneInputWrap = document.createElement('div');
    block4.appendChild(zoneInputWrap);
    zoneInputWrap.className = "inputWrap";

    const zoneLabel = document.createElement('label');
    zoneInputWrap.appendChild(zoneLabel);
    zoneLabel.for = "zone";
    zoneLabel.innerText = "Zone:"

    const zoneInput = document.createElement('input');
    zoneInputWrap.appendChild(zoneInput);
    zoneInput.name = "zone";
    zoneInput.zone = "text";
    zoneInput.setAttribute('id','zone');
    zoneInput.value = `${singleGrab.zone}`;

    /* END Database Translation Key */
}