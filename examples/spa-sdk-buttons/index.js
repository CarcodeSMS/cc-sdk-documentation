const VEHICLES = [
  {
    title: 'Audi A6',
    vin: '5YFBURHE0HP727111',
    stock: '27811',
    msrp: '$20,625'
  },{
    title: 'BMW X6',
    vin: '5YFBURHE0HP727222',
    stock: '27822',
    msrp: '$18,750'
  },{
    title: 'Mercedes-Benz GLE Coupe',
    vin: '5YFBURHE0HP727333',
    stock: '27833',
    msrp: '$23,254'
  }
];
const vehiclesList = document.getElementById('vehicles');

const createSDKButton = () => {
  const button = document.createElement('button');

  button.innerHTML = 'Contact Us';

  button.classList.add('sms-button');

  button.classList.add('btn');
  button.classList.add('btn-outline-primary');

  return button;
};

const createVehicleCard = (vehicle) => {
  const card = document.createElement('div');
  const sdkButton = createSDKButton();

  card.classList.add('card');
  card.classList.add('mb-2');

  card.innerHTML = `
    <div class="card-header">
      ${vehicle.title}
    </div>
    <div class="card-body d-flex flex-column flex-sm-row align-items-center justify-content-between p-2">
      <div class="d-flex flex-column flex-sm-row align-items-center">
        <img src="../images/car.jpg" alt="">
        <ul class="card-list ml-sm-0">
          <li>VIN #: <span>${vehicle.vin}</span></li>
          <li>Stock #: <span>${vehicle.stock}</span></li>
          <li>MSRP: <span>${vehicle.msrp}</span></li>
        </ul>
      </div>
      ${sdkButton.outerHTML}
    </div>
  `;

  return card;
};

const loadPage = () => {
  VEHICLES.forEach(
    (vehicle) => vehiclesList.appendChild(createVehicleCard(vehicle))
  );
};

document.getElementById('load').addEventListener('click', () => {
  loadPage();  
});

loadPage();