import { p as private_env } from "./shared-server.js";
import { Resend } from "resend";
import { Html, Head, Preview, Body, Container, Section, Img, Text, Link, Hr } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";
const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173";
const SedimentListThankYou = ({ unsubKey, email }) => {
  return /* @__PURE__ */ React.createElement(Html, null, /* @__PURE__ */ React.createElement(Head, null), /* @__PURE__ */ React.createElement(Preview, null, "Welcome to Sediment Art!"), /* @__PURE__ */ React.createElement(Tailwind, null, /* @__PURE__ */ React.createElement(Body, { className: "bg-white my-auto mx-auto font-sans px-2" }, /* @__PURE__ */ React.createElement(Container, { className: "border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]" }, /* @__PURE__ */ React.createElement(Section, { className: "mt-[32px]" }, /* @__PURE__ */ React.createElement(
    Img,
    {
      src: "https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex",
      alt: "Sediment Art",
      width: "300",
      height: "102",
      className: "my-0 mx-auto"
    }
  )), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "Welcome to Sediment Art! "), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "Dive into a world of captivating natural art, of rocks expertly photographed that are millions of years old, encased in glass."), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "We'll keep you updated for when new drops come and new images are made available!"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "For inquiries, reach us at", " ", /* @__PURE__ */ React.createElement(Link, { href: "mailto:bmd.yt.channel@gmail.com" }, "bmd.yt.channel@gmail.com")), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[12px] leading-[4px] pt-4" }, "Best,"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[12px] leading-[4px] ml-1" }, "Ben Davis"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[12px] leading-[4px] ml-1 italic" }, "Sediment Art Team"), /* @__PURE__ */ React.createElement(Hr, { className: "border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" }), /* @__PURE__ */ React.createElement(
    Link,
    {
      className: "text-[#666666] text-[12px] leading-[24px]",
      href: `${baseUrl}/auth/list/remove?key=${unsubKey}&email=${email}`
    },
    "unsubscribe"
  )))));
};
const SedimentPurchaseThankYou = () => {
  return /* @__PURE__ */ React.createElement(Html, null, /* @__PURE__ */ React.createElement(Head, null), /* @__PURE__ */ React.createElement(Preview, null, "Sediment Art: Thank you for your order!"), /* @__PURE__ */ React.createElement(Tailwind, null, /* @__PURE__ */ React.createElement(Body, { className: "bg-white my-auto mx-auto font-sans px-2" }, /* @__PURE__ */ React.createElement(Container, { className: "border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]" }, /* @__PURE__ */ React.createElement(Section, { className: "mt-[32px]" }, /* @__PURE__ */ React.createElement(
    Img,
    {
      src: "https://res.cloudinary.com/insiderviz/image/upload/f_auto,q_auto/ly9xqkjkn8rat1l3lxex",
      alt: "Sediment Art",
      width: "300",
      height: "102",
      className: "my-0 mx-auto"
    }
  )), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "Thank you for ordering!"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "You are one of the very first (among the first 10) to order from us, and we could not be more grateful. We have included for free an exclusive piece from a currently unreleased collection that will be sent with your order."), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "We're thrilled to be getting one of our pieces in your hands. We'll keep you updated as we get your order fulfilled."), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "Remember that our pieces are made to order, so expect at least a week before your's arrives."), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "We use Fracture for our fulfillment, so your package will arrive in Fracture packaging, as they have the best systems in place for keeping your glass pristine!"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[14px] leading-[24px]" }, "For inquiries, reach us at", " ", /* @__PURE__ */ React.createElement(Link, { href: "mailto:bmd.yt.channel@gmail.com" }, "bmd.yt.channel@gmail.com")), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[12px] leading-[4px] pt-4" }, "Best,"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[12px] leading-[4px] ml-1" }, "Ben Davis"), /* @__PURE__ */ React.createElement(Text, { className: "text-black text-[12px] leading-[4px] ml-1 italic" }, "Sediment Art Team")))));
};
const resend = new Resend(private_env.RESEND_API_KEY);
const sendThankYouListEmail = async (email, key) => {
  try {
    await resend.emails.send({
      from: "no-reply@sedimentart.com",
      to: email,
      subject: "Welcome to Sediment Art",
      react: /* @__PURE__ */ React.createElement(SedimentListThankYou, { email, unsubKey: key })
    });
    console.log("sent");
  } catch (e) {
    console.log("error sending:", e);
  }
};
const sendThankYouPurchaseEmail = async (email) => {
  try {
    await resend.emails.send({
      from: "no-reply@sedimentart.com",
      to: email,
      subject: "Sediment Art: Thank you for your order!",
      react: /* @__PURE__ */ React.createElement(SedimentPurchaseThankYou, null)
    });
    console.log("sent");
  } catch (e) {
    console.log("error sending:", e);
  }
};
export {
  sendThankYouPurchaseEmail as a,
  sendThankYouListEmail as s
};
