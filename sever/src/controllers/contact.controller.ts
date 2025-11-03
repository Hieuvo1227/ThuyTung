import { handleGetContactById, handleGetContacts, handleSubmitContact, handleResolveContact, handleDeleteContact } from "../repositories/contact.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { sendMail, EmailTemplate } from "../utils/libs/mailer.js";
import { EMAIL_USER } from "../utils/configs/constants.js";

export const getAllContacts = RequestHandlerCustom(
  async (req, res) => {
    const contacts = await handleGetContacts();

    res.status(200).json({
      success: true,
      message: "Get all contacts successfully",
      contacts: contacts
    });
  }
);

export const getContact = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;

    const contact = await handleGetContactById({ id });

    res.status(200).json({
      success: true,
      message: "Get contact successfully",
      contact: contact
    });
  }
);

export interface ISubmitContactData {
  name: string,
  email: string,
  program: string,
  phone: string,
  message: string
};

export const submitContact = RequestHandlerCustom(
  async (req, res) => {
    const data: ISubmitContactData = parseRequestData(req);
    const contact = await handleSubmitContact(data);

    // Send confirmation email to user
    try {
      await sendMail(
        data.email,
        "Xác nhận yêu cầu tư vấn - ThuyTung",
        EmailTemplate.CONTACT_CONFIRMATION,
        [
          ["name", data.name],
          ["email", data.email],
          ["phone", data.phone],
          ["program", data.program],
          ["message", data.message]
        ]
      );
    } catch (error) {
      console.error("Failed to send confirmation email to user:", error);
    }

    // Send notification email to support team
    try {
      await sendMail(
        "support@thuytung.edu.vn",
        "New Contact Request - ThuyTung",
        EmailTemplate.CONTACT_CONFIRMATION,
        [
          ["name", data.name],
          ["email", data.email],
          ["phone", data.phone],
          ["program", data.program],
          ["message", data.message]
        ]
      );
    } catch (error) {
      console.error("Failed to send notification email to support team:", error);
    }

    res.status(201).json({
      success: true,
      message: "New contact created",
      contact: contact
    });
  }
);

export const resolveContact = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;
    const userId = req.params.userId;

    const contact = await handleResolveContact({ id, userId });

    res.status(200).json({
      success: true,
      message: "Contact resolved successfully",
      contact: contact
    });
  }
);

export const deleteContact = RequestHandlerCustom(
  async (req, res) => {
    const id = req.params.id;

    const contact = await handleDeleteContact({ id });

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      contact: contact
    });
  }
);