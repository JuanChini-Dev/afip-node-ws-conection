// Description: Service to connect with AFIP WSAA.
import soap from "soap";
import xml2js from "xml2js";
import { key, pem } from "./../utils/files.js";
import { addTimeExp, getDateAfip } from "./../utils/dates.js";
import { config } from "dotenv";
import { createCms } from "./TRA.js";

config();

class WSAAService {
  constructor(service) {
    this.service = service;
    this.url = process.env.URL_WSAA;
    this.key = key;
    this.pem = pem;
  }

  async getDateAfip(date) {
    return await getDateAfip(date);
  }

  async addTimeExp(date) {
    return await addTimeExp(date);
  }

  async createTRA() {
    const now = new Date();
    const isoDate = await this.getDateAfip(now);

    let expTime = new Date();
    expTime = await this.addTimeExp(expTime);

    const TRA =
      '<?xml version="1.0" encoding="UTF-8"?>' +
      "<loginTicketRequest>" +
      "<header>" +
      "<uniqueId>89779000</uniqueId>" +
      "<generationTime>" +
      isoDate +
      "</generationTime>" +
      "<expirationTime>" +
      expTime +
      "</expirationTime>" +
      "</header>" +
      "<service>wsfe</service>" +
      "</loginTicketRequest>";

    return TRA;
  }

  async createCMS(TRA) {
    return await createCms(this.pem, this.key, TRA);
  }

  async login() {
    const TRA = await this.createTRA();
    const cms = await this.createCMS(TRA);
    const args = { in0: cms.replaceAll("\r\n", "") };

    try {
      const client = await new Promise((resolve, reject) => {
        soap.createClient(this.url, (err, client) => {
          if (err) {
            console.error("Error creating SOAP client:", err);
            return reject(err);
          }
          resolve(client);
        });
      });

      const result = await new Promise((resolve, reject) => {
        client.loginCms(args, (err, result) => {
          if (err) {
            console.error("Error in loginCms:", err);
            return reject(err);
          }
          resolve(result);
        });
      });

      console.log("SOAP Response:", result);

      if (!result || !result.loginCmsReturn) {
        throw new Error("Invalid response structure");
      }

      const resultObj = await new Promise((resolve, reject) =>
        xml2js.Parser().parseString(result.loginCmsReturn, (error, res) => {
          if (error) {
            console.error("Error parsing XML:", error);
            return reject(error);
          }
          const token = res.loginTicketResponse.credentials[0].token[0];
          const sign = res.loginTicketResponse.credentials[0].sign[0];
          const expiration =
            res.loginTicketResponse.header[0].expirationTime[0];
          resolve({ Token: token, Sign: sign, Expiration: expiration });
        })
      );

      console.log("ResultObj:", resultObj);

      return {
        token: resultObj.Token,
        sign: resultObj.Sign,
        expiration: resultObj.Expiration,
        cuit: process.env.CUIT,
      };
    } catch (error) {
      console.error("Error in login process:", error);
      return { error };
    }
  }
}


export default WSAAService;
