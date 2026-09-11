// Email delivery. apps/web had no email provider (messages were only logged), and the same
// holds here until one is added (ROOTS direction, 11 Sep 2026: log only for now).

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

async function sendEmail({ to, subject, text }: EmailOptions): Promise<{ success: boolean }> {
  console.info('📧 Email not sent (no email service configured):', { to, subject, text });
  return { success: false };
}

export const emailService = {
  sendAssessmentCompleteEmail(email: string, reportUrl: string) {
    return sendEmail({
      to: email,
      subject: 'Your ROOTS-AI Assessment Report is Ready',
      text: `Thank you for completing your ROOTS-AI assessment. Your report: ${reportUrl}`,
    });
  },
};
