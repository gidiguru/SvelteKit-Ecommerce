import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

(async function () {
  const { data, error } = await resend.emails.send({
    from: 'Jogun <joguno@petraton.com>',
    to: ['tomijoguno@gmail.com'],
    subject: 'Hello World',
    html: '<strong>hello my name is Tomi!</strong>',
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
})();
