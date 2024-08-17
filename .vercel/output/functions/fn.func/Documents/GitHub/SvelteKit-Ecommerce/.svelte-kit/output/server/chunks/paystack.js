import axios from "axios";
class PaystackClient {
  constructor(secretKey) {
    this.client = axios.create({
      baseURL: "https://api.paystack.co",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json"
      }
    });
  }
  async verifyTransaction(reference) {
    const response = await this.client.get(`/transaction/verify/${reference}`);
    return response.data;
  }
  async listTransactions(params) {
    const response = await this.client.get("/transaction", { params });
    return response.data;
  }
  async getCustomer(email_or_code) {
    const response = await this.client.get(`/customer/${email_or_code}`);
    return response.data;
  }
  // Method to expose general request functionality
  async request(config) {
    const response = await this.client.request(config);
    return response.data;
  }
}
const paystack = new PaystackClient(process.env.PAYSTACK_SECRET_KEY);
const Paystack = {
  transaction: {
    verify: (reference) => paystack.verifyTransaction(reference)
  }
  // Add other methods as needed for backwards compatibility
};
export {
  Paystack as P,
  paystack as p
};
