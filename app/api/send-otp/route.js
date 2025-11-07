import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { email, otp } = await request.json();

        if (!email || !otp) {
            return NextResponse.json(
                { success: false, error: 'Email and OTP are required' },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Assemblies of God Church <onboarding@resend.dev>', // Change to info@agchurch.com in production
            to: email,
            subject: 'Your Assemblies of God Church Verification Code',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: white;">
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%); padding: 40px 20px; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Assemblies of God Church</h1>
                            <p style="color: #ede9fe; margin: 10px 0 0 0; font-size: 14px;">Building Faith Together</p>
                        </div>
                        
                        <!-- Content -->
                        <div style="padding: 40px 30px; background-color: #ffffff;">
                            <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Verify Your Email</h2>
                            
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                Welcome! Please use the verification code below to complete your registration:
                            </p>
                            
                            <!-- OTP Box -->
                            <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0;">
                                <p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0; font-weight: 600;">Your Verification Code</p>
                                <div style="font-size: 36px; font-weight: 700; letter-spacing: 12px; color: #7c3aed; font-family: 'Courier New', monospace;">
                                    ${otp}
                                </div>
                            </div>
                            
                            <!-- Warning -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px; margin: 30px 0;">
                                <p style="color: #92400e; font-size: 14px; margin: 0; line-height: 1.5;">
                                    ⏱️ <strong>Important:</strong> This code will expire in 15 minutes for security reasons.
                                </p>
                            </div>
                            
                            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                                If you didn't request this code, please ignore this email or contact our support team if you have concerns.
                            </p>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background-color: #1f2937; padding: 30px 20px; text-align: center;">
                            <p style="color: #9ca3af; font-size: 12px; margin: 0 0 10px 0;">
                                This is an automated message, please do not reply to this email.
                            </p>
                            <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                © ${new Date().getFullYear()} Assemblies of God Church. All rights reserved.
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Resend Error:', error);
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 500 }
            );
        }

        console.log('Email sent successfully:', data);
        return NextResponse.json({
            success: true,
            messageId: data.id,
            message: 'OTP sent successfully'
        });

    } catch (error) {
        console.error('Unexpected error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send email' },
            { status: 500 }
        );
    }
}