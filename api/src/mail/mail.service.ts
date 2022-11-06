import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface IMessage {
    to: string;
    subject: string;
    text: string;
    html?: string
}

@Injectable()
export class MailService {
    async sendMail(msg: IMessage): Promise<void> {
        const transporter = this.getTransporter();
        const message = {... msg, from: ""}
        return transporter.sendMail(message);
    }

    private getTransporter(): any {
        const transporter = nodemailer.createTransport({
            host: '',
            port: 587,
            secure: false,
            auth: {
                user: '',
                pass: ''
            }
        });
        return transporter;
    }
}
