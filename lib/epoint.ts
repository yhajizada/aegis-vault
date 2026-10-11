import crypto from "crypto";

export interface EpointPaymentRequest {
  orderId: string;
  amount: number;
  currency?: "USD" | "AZN" | "EUR";
  description: string;
  successUrl: string;
  errorUrl: string;
  callbackUrl?: string;
  language?: "az" | "en" | "ru";
}

export interface EpointResponse {
  status: "success" | "error";
  redirect_url?: string;
  transaction?: string;
  message?: string;
}

const EPOINT_API_URL = "https://epoint.az/api/1/request";

/**
 * ePoint.az Integration Helper
 * Follows the standard ePoint specification:
 * 1. Payload is JSON encoded and Base64 encoded: data = base64(json)
 * 2. Signature is SHA1 generated: base64(sha1(private_key + data + private_key, binary=true))
 */
export function generateEpointSignature(dataBase64: string, privateKey: string): string {
  const sha1Buffer = crypto
    .createHash("sha1")
    .update(privateKey + dataBase64 + privateKey)
    .digest();
  return sha1Buffer.toString("base64");
}

export function verifyEpointCallback(
  dataBase64: string,
  signature: string,
  privateKey: string
): boolean {
  const expectedSignature = generateEpointSignature(dataBase64, privateKey);
  return expectedSignature === signature;
}

export async function createEpointPayment(
  params: EpointPaymentRequest
): Promise<EpointResponse> {
  const publicKey = process.env.EPOINT_PUBLIC_KEY;
  const privateKey = process.env.EPOINT_PRIVATE_KEY;

  // Sandbox / Demo Simulation Mode if keys are not configured yet
  if (!publicKey || !privateKey || publicKey === "your_epoint_public_key") {
    console.log("ℹ️ [ePoint] Running in Sandbox Simulation Mode (No live credentials in .env)");
    return {
      status: "success",
      redirect_url: `/dashboard/billing?status=success&orderId=${params.orderId}&simulated=true`,
      transaction: `sim_epoint_${Date.now()}`,
      message: "Simulation payment created successfully",
    };
  }

  const payload = {
    public_key: publicKey,
    amount: params.amount.toFixed(2),
    currency: params.currency || "USD",
    language: params.language || "az",
    order_id: params.orderId,
    description: params.description,
    success_redirect_url: params.successUrl,
    error_redirect_url: params.errorUrl,
    callback_url: params.callbackUrl,
  };

  const jsonString = JSON.stringify(payload);
  const dataBase64 = Buffer.from(jsonString).toString("base64");
  const signature = generateEpointSignature(dataBase64, privateKey);

  try {
    const response = await fetch(EPOINT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        data: dataBase64,
        signature: signature,
      }),
    });

    const result = await response.json();
    return result as EpointResponse;
  } catch (error: any) {
    console.error("❌ [ePoint] API request error:", error);
    return {
      status: "error",
      message: error.message || "Failed to communicate with ePoint payment gateway",
    };
  }
}
