import {
  AbstractPaymentProcessor,
  PaymentProcessorError,
  PaymentSessionStatus,
  PaymentProcessorContext,
  PaymentProcessorSessionResponse,
} from "@medusajs/medusa";
import { humanizeAmount } from "medusa-core-utils";
import axios from "axios";

class CoinBasePaymentService extends AbstractPaymentProcessor {
  static identifier: string = "CoinBase";
  protected readonly options_: any;

  constructor(container, options) {
    super(container);
    this.options_ = options;
  }

  async capturePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    throw new Error("Captured payment is not implemented in free version");
  }

  async authorizePayment(
    paymentSessionData: Record<string, unknown>,
    context: Record<string, unknown>
  ): Promise<
    | PaymentProcessorError
    | {
        status: PaymentSessionStatus;
        data: Record<string, unknown>;
      }
  > {
    throw new Error("Authorized payment is not implemented in free version");
  }

  async cancelPayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    throw new Error("Cancel Payment is not implemented in free version");
  }

  async initiatePayment(
    context: PaymentProcessorContext
  ): Promise<PaymentProcessorError | PaymentProcessorSessionResponse> {
    const sessionData = {
      local_price: {
        amount: humanizeAmount(context.amount, context.currency_code),
        currency: context.currency_code,
      },
      pricing_type: "fixed_price",
      redirect_url: this.options_.redirect_url,
      buyer_locale: "en",
      cancel_url: this.options_.cancel_url,
      checkout_id: context.resource_id,
      metadata: {
        cart_id: context.resource_id,
      },
    };

    let config = {
      Method: "post",
      maxBodyLength: Infinity,
      url: "https://api.commerce.coinbase.com/charges",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CC-Api-Key": this.options_.api_key,
      },
      data: sessionData,
    };

    try {
      const response = await axios.request(config);

      return response.data;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async deletePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    throw new Error("Delete Payment is not implemented in free version");
  }

  async getPaymentStatus(
    paymentSessionData: Record<string, unknown>
  ): Promise<PaymentSessionStatus> {
    throw new Error("Get payment status is not implemented in free version");
  }

  async refundPayment(
    paymentSessionData: Record<string, unknown>,
    refundAmount: number
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    throw new Error("Refund payment is not implemented in free version");
  }

  async retrievePayment(
    paymentSessionData: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    throw new Error("Retrieve Payment is not implemented in free version");
  }

  async updatePayment(
    context: PaymentProcessorContext
  ): Promise<void | PaymentProcessorError | PaymentProcessorSessionResponse> {
    await this.initiatePayment(context);
  }

  async updatePaymentData(
    sessionId: string,
    data: Record<string, unknown>
  ): Promise<Record<string, unknown> | PaymentProcessorError> {
    //optional implementation
    return data;
  }
}

export default CoinBasePaymentService;
