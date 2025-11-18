// src/controllers/faq.controller.ts
import { Request, Response, NextFunction } from "express";
import {
    handleCreateFAQ,
    handleUpdateFAQ,
    handleGetFAQs,
    handleGetFAQById
} from "../repositories/faq.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { uploadFiles } from "../utils/libs/cloudinary.js";

// Interfaces
export interface ICreateFAQData {
    question: string;
    answer: string;
    category: string;
    status: string;
    imageUrl?: string;
}

export interface IUpdateFAQData {
    question?: string;
    answer?: string;
    category?: string;
    status?: string;
    imageUrl?: string;
}

// GET /faqs
export const getFAQs = RequestHandlerCustom(
    async (req: Request, res: Response) => {
        const category = req.query.category as string | undefined;
        const faqs = await handleGetFAQs({ category });

        res.status(200).json({
            success: true,
            message: "Get FAQs successfully",
            FAQs: faqs,
        });
    }
);

// GET /faqs/:id
export const getFAQById = RequestHandlerCustom(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if (!id) return next(new ErrorCustom(400, "FAQ ID is required"));

        const faq = await handleGetFAQById({ id });

        res.status(200).json({
            success: true,
            message: "FAQ retrieved successfully",
            FAQ: faq,
        });
    }
);

// POST /faqs
export const createFAQ = RequestHandlerCustom(
    async (req: Request, res: Response) => {
        const data = parseRequestData(req) as ICreateFAQData & { files?: any[] };

        // handle file upload from parsed files array
        if (data.files && Array.isArray(data.files) && data.files.length > 0) {
            const imageFile = data.files.find(f => f.fieldname === "image");
            if (imageFile) {
                const uploadResult = await uploadFiles(imageFile, "faqs");
                if (typeof uploadResult === "object" && "url" in uploadResult) {
                    data.imageUrl = uploadResult.url;
                }
            }
        }
        
        // Remove files from data before saving
        const { files, ...faqData } = data;

        const faq = await handleCreateFAQ(faqData as ICreateFAQData);
        res.status(201).json({ success: true, message: "FAQ created", faq });
    }
);

// PATCH /faqs/:id
export const updateFAQ = RequestHandlerCustom(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        if (!id) return next(new ErrorCustom(400, "FAQ ID required"));

        console.log('\n=== [FAQ UPDATE] START ===');
        console.log('[FAQ UPDATE] FAQ ID:', id);
        console.log('[FAQ UPDATE] Content-Type:', req.headers['content-type']);
        console.log('[FAQ UPDATE] req.files (before parse):', req.files);
        console.log('[FAQ UPDATE] req.body (before parse):', req.body);

        const data = parseRequestData(req) as Partial<IUpdateFAQData> & { files?: any[] };
        
        console.log('[FAQ UPDATE] Parsed data keys:', Object.keys(data));
        console.log('[FAQ UPDATE] data.files:', data.files);
        console.log('[FAQ UPDATE] data.files length:', data.files?.length);

        // handle file upload from parsed files array
        if (data.files && Array.isArray(data.files) && data.files.length > 0) {
            console.log('[FAQ UPDATE] Files found in data.files');
            data.files.forEach((file, index) => {
                console.log(`[FAQ UPDATE] File ${index}:`, {
                    fieldname: file.fieldname,
                    originalname: file.originalname,
                    size: file.size,
                    mimetype: file.mimetype
                });
            });
            
            const imageFile = data.files.find(f => f.fieldname === "image");
            console.log('[FAQ UPDATE] Image file found:', imageFile ? imageFile.originalname : 'NO');
            
            if (imageFile) {
                console.log('[FAQ UPDATE] Starting Cloudinary upload...');
                const uploadResult = await uploadFiles(imageFile, "faqs");
                console.log('[FAQ UPDATE] Upload result:', uploadResult);
                
                if (typeof uploadResult === "object" && "url" in uploadResult) {
                    data.imageUrl = uploadResult.url;
                    console.log('[FAQ UPDATE] New imageUrl set:', data.imageUrl);
                }
            }
        } else {
            console.log('[FAQ UPDATE] NO files in data.files');
        }
        
        // Remove files from data before saving
        const { files, ...faqData } = data;
        console.log('[FAQ UPDATE] Final faqData (without files):', faqData);

        const updated = await handleUpdateFAQ({ id, ...faqData });
        console.log('[FAQ UPDATE] Updated FAQ from DB:', updated);
        console.log('=== [FAQ UPDATE] END ===\n');
        
        res.status(200).json({ success: true, message: "FAQ updated", faq: updated });
    }
);
