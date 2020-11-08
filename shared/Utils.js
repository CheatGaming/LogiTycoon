export const Utils = {
  Refresh: Refresh,
  GoTo: GoTo(),
  Open: Open(),
  Init: Init,
  Status: status
}


const warehouseUrl = 'https://www.logitycoon.com/eu1/index.php?a=warehouse';
const fuelStationUrl = 'https://www.logitycoon.com/eu1/index.php?a=fuelstation';
const tripsUrl = 'https://www.logitycoon.com/eu1/index.php?a=trips';
const freightUrl_ = 'https://www.logitycoon.com/eu1/index.php?a=freight&n=';

const status = {
  windows: [],
  initiated: false
};

function Open() {
  return {
    warehouse: () => OpenWindow(warehouseUrl),
    fuelStation: () => OpenWindow(fuelStationUrl),
    trips: (params) => OpenWindow(tripsUrl, params),
    freight: (id) => OpenWindow(freightUrl_ + id)
  } 
}
  
function Refresh( t ) {
  if(!!t && t > 0){
    setTimeout(location.reload(true), t);
  }
  location.reload(true);
}

function GoTo() {
  return {
    warehouse: () => GoToUrl(warehouseUrl),
    fuelStation: () => GoToUrl(fuelStationUrl),
    trips: (params) => GoToUrl(tripsUrl, params),
    freight: (id) => GoToUrl(freightUrl_ + id)
  }
}

function OpenWindow(url, params) {
  let fullUrl = GetParametrizedUrl(url, params);
  let _window = window.open(fullUrl, '_blank');
  status.windows.push(_window);
  
  return _window;
}

function Init() {
  if(!status.initiated) {
    window.onbeforeunload = function(event) {
      status.windows.forEach(w => w.close());
    }
    status.initiated = true;
  }
}

function GoToUrl(url) {
  window.location.href = url;
}

function GetParametrizedUrl(url, params) {
  let p = '';
  
  if(!!params) {
    p = SerializeParams(params);
  
    if(url.includes('?')){
      url += '&' + p;
    } else {
      url += '&' + p;
    }
  }
  
  return url;
}

function SerializeParams(params) {
  let p = '';
  let properties = Object.getOwnPropertyNames(params);
  properties.forEach(prop => {
    p += prop + '=' params[prop] + '&';
  });
  
  return p;
}

