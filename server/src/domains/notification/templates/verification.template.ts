interface VerificationTemplateData {
  firstName: string;
  verificationUrl: string;
  expiryHours: number;
}

export const verificationTemplate = (
  data: VerificationTemplateData,
): string => `
  <div>
  <h1>Hi ${data.firstName}, Verify Your Email Address</h1>
  <p>You're so close to starting your OmniPress journey. To finish registration, just click the button below to confirm your email address. This link will be valid for ${data.expiryHours} hours.</p>

    <button><a href="${data.verificationUrl}">Verify Email</a></button>
  </div>
`;
