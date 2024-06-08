import soap from "soap";

class WSFEService {
  constructor() {
    this.url = "https://wswhomo.afip.gov.ar/wsfev1/service.asmx?WSDL";
  }

  async createClient() {
    return await soap.createClientAsync(this.url);
  }

  async FECompUltimoAutorizado(auth, ptoVenta, cbteTipo) {
    let args = { Auth: auth, PtoVta: ptoVenta, CbteTipo: cbteTipo };

    try {
      let client = await this.createClient();
      let result = await client.FECompUltimoAutorizadoAsync(args);
      return result[0].FECompUltimoAutorizadoResult.CbteNro;
    } catch (error) {
      return error;
    }
  }

  async FECAESolicitar(data) {
    const auth = data.Auth;

    const FECAEDetRequest = {
      Concepto: data.Concepto,
      DocTipo: data.DocTipo,
      DocNro: data.DocNro,
      CbteDesde: data.Cbte,
      CbteHasta: data.Cbte,
      CbteFch: data.CbteFech,
      ImpTotal: data.ImpTotal,
      ImpTotConc: 0.0,
      ImpNeto: data.ImpTotal,
      ImpOpEx: 0,
      ImpTrib: 0,
      ImpIVA: 0,
      MonId: "PES",
      MonCotiz: 1,
    };

    let args = {
      Auth: auth,
      FeCAEReq: {
        FeCabReq: {
          CantReg: 1,
          PtoVta: data.ptoVenta,
          CbteTipo: data.cbteTipo,
        },
        FeDetReq: { FECAEDetRequest: FECAEDetRequest },
      },
    };

    try {
      let client = await this.createClient();
      let result = await client.FECAESolicitarAsync(args);
      return result;
    } catch (error) {
      return error;
    }
  }

  async ListarComprobantes(auth) {
    try {
      let client = await this.createClient();
      let result = await client.FEParamGetTiposCbteAsync(auth);
      return result;
    } catch (error) {
      return error;
    }
  }

  async ListarTiposDoc(auth) {
    try {
      let client = await this.createClient();
      let result = await client.FEParamGetTiposDocAsync(auth);
      return result;
    } catch (error) {
      return error;
    }
  }

  async ListarDocs(auth) {
    try {
      let client = await this.createClient();
      let result = await client.FEParamGetTiposDocAsync(auth);
      return result;
    } catch (error) {
      return error;
    }
  }
}

export default WSFEService;
