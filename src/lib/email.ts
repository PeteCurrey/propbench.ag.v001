/**
 * Plain, branded Resend email delivery helper (no marketing padding).
 */

export interface SendReceiptEmailParams {
  toEmail: string;
  downloadUrl: string;
  purchaseId: string;
}

export interface SendResendLinkEmailParams {
  toEmail: string;
  downloadUrl: string;
}

export async function sendPurchaseReceiptEmail({
  toEmail,
  downloadUrl,
  purchaseId,
}: SendReceiptEmailParams): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  const emailBody = `
PropBench — Prop Trading Survival Kit (PDF)

Thank you for your purchase.

Purchase Reference: ${purchaseId}
Download Link (Valid for 15 minutes): ${downloadUrl}

Note: Your download link allows up to 5 downloads. If your link expires or you reach the download cap, you can request a new download link at any time from https://propbench.com/purchase/resend.

Risk Warning:
PropBench provides calculation tools and educational reference materials strictly for informational purposes. Trading leveraged financial instruments in prop firm evaluations involves substantial risk of capital loss.
`;

  if (!resendApiKey) {
    console.log(`[EMAIL DISPATCH MOCK] Sent Purchase Receipt to ${toEmail}:`);
    console.log(emailBody);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PropBench <downloads@propbench.com>",
        to: [toEmail],
        subject: "Your Prop Trading Survival Kit PDF Download",
        text: emailBody,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to send Resend receipt email:", err);
    return false;
  }
}

export async function sendLinkResendEmail({
  toEmail,
  downloadUrl,
}: SendResendLinkEmailParams): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY;

  const emailBody = `
PropBench — Fresh PDF Download Link

A new download link has been generated for your purchase of the Prop Trading Survival Kit.

Fresh Download Link (Valid for 15 minutes): ${downloadUrl}

If you did not request this link, please disregard this email.
`;

  if (!resendApiKey) {
    console.log(`[EMAIL DISPATCH MOCK] Sent Link Resend to ${toEmail}:`);
    console.log(emailBody);
    return true;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PropBench <downloads@propbench.com>",
        to: [toEmail],
        subject: "Fresh PDF Download Link — PropBench",
        text: emailBody,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to send Resend link-resend email:", err);
    return false;
  }
}
