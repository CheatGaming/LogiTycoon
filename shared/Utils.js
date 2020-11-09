(function(scope){
  const warehouseUrl = 'https://www.logitycoon.com/eu1/index.php?a=warehouse';
  const fuelStationUrl = 'https://www.logitycoon.com/eu1/index.php?a=fuelstation';
  const tripsUrl = 'https://www.logitycoon.com/eu1/index.php?a=trips';
  const freightUrl_ = 'https://www.logitycoon.com/eu1/index.php?a=freight&n=';
  const truckUrl_ = 'https://www.logitycoon.com/eu1/index.php?a=garage_truck&t=';
  const trailerUrl_ = 'https://www.logitycoon.com/eu1/index.php?a=garage_trailer&t=';

  const status = {
    windows: [],
    initiated: false
  };

  function Open() {
    return {
      warehouse: () => OpenWindow(warehouseUrl),
      fuelStation: () => OpenWindow(fuelStationUrl),
      trips: (params) => OpenWindow(tripsUrl, params),
      freight: (id) => OpenWindow(freightUrl_ + id),
      truck: (id) => OpenWindow(truckUrl_ + id),
      trailer: (id) => OpenWindow(trailerUrl_ + id)
    } 
  };

  function Refresh( t ) {
    if(!!t && t > 0){
      setTimeout(location.reload(true), t);
    } else {
      location.reload(true);
    }
  };

  function GoTo() {
    return {
      warehouse: () => GoToUrl(warehouseUrl),
      fuelStation: () => GoToUrl(fuelStationUrl),
      trips: (params) => GoToUrl(tripsUrl, params),
      freight: (id) => GoToUrl(freightUrl_ + id),
      truck: (id) => GoToUrl(truckUrl_ + id),
      trailer: (id) => GoToUrl(trailerUrl_ + id)
    }
  };

  function OpenWindow(url, params) {
    let fullUrl = GetParametrizedUrl(url, params);
    let _window = window.open(fullUrl, '_blank');
    
    status.windows.push(_window);

    return _window;
  };

  function Init() {
    if(!status.initiated) {
      window.onbeforeunload = function(event) {
        status.windows.forEach(w => w.close());
      }
      status.initiated = true;
    }
  };

  function GoToUrl(url) {
    window.location.href = url;
  };

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
  };

  function SerializeParams(params) {
    let p = '';
    let properties = Object.getOwnPropertyNames(params);
    
    properties.forEach(prop => {
      p += prop + '=' + params[prop] + '&';
    });

    return p;
  };

  Init();

  scope.Utils = {
    Refresh: Refresh,
    GoTo: GoTo(),
    Open: Open(),
    Status: status
  };
})(window);
