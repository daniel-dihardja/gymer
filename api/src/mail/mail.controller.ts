import { Controller, Post } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {

    constructor(private service: MailService) {}

    @Post('test')
    async sendTestMail(): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: '',
            port: 587,
            secure: false,
            auth: {
                user: '',
                pass: ''
            }
        });

        const message = {
            from: "",
            to: "",
            subject: "Message title",
            text: "Plaintext version of the message",
            html: "<p>HTML version of the message</p>"
        };

        try {
            const res = await transporter.sendMail(message)
            console.log(res);
        } catch (error) {
            console.error(error)
        }
    }

    @Post('testsrv')
    async sendTestMailWithService(): Promise<void> {
        const msg = {
            to: 'johngoyason@gmail.com',
            subject: 'test',
            text: 'test 123'
        }

        try {
            await this.service.sendMail(msg)
        } catch(error) {
            console.error(error);
        }
    }
}
