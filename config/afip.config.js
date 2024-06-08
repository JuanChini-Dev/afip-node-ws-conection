const config = {
    wsaa: 'https://wsaa.afip.gov.ar/ws/services/LoginCms',
    wsfe: 'https://servicios1.afip.gov.ar/wsfev1/service.asmx?WSDL',
    cert: process.env.CERT,
    key: process.env.KEY,
    cuit: process.env.CUIT,
    service: 'wsfe',
  };
  
  module.exports = config;