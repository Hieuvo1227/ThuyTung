import { handleCreateProgram, handleGetProgramById, handleGetPrograms, handleUpdateProgram, handleDeleteProgram } from "../repositories/program.repository.js";
import { ErrorCustom, RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";
import { uploadFiles } from "../utils/libs/cloudinary.js";

export const getPrograms = RequestHandlerCustom(
    async (req, res) => {
        // Lấy cả 'featured' và 'country' từ query string
        const { featured, country } = req.query;

        // Tạo một object filter động
        const filter: { featured?: boolean; country?: string } = {};

        // Thêm 'featured' vào filter nếu nó là 'true'
        if (featured === 'true') {
            filter.featured = true;
        }

        // Thêm 'country' vào filter nếu nó tồn tại
        if (country && typeof country === 'string') {
            filter.country = country;
        }

        // Gửi object filter hoàn chỉnh đến repository
        const programs = await handleGetPrograms(filter);

        res.status(200).json({
            success: true,
            message: "Get programs successfully",
            programs: programs
        });
    }
);

export const getProgram = RequestHandlerCustom(
    async (req, res) => {
        const id = req.params.id;

        const program = await handleGetProgramById({ id });

        res.status(200).json({
            success: true,
            message: "Get program successfully",
            program: program
        });
    }
);

export interface ICreateProgramData {
    title: string;
    description: string;
    country: string;
    duration: string;
    tuition: string;
    imageUrl?: string;
    image?: Express.Multer.File;
    about: string,
    opportunities: string,
    requirements: string;
    benefits: string;
    featured: boolean;
    status?: string;
}

export interface IUpdateProgramData {
    title?: string;
    description?: string;
    country?: string;
    duration?: string;
    tuition?: string;
    imageUrl?: string;
    image?: Express.Multer.File;
    requirements?: string;
    benefits?: string;
    featured?: boolean;
    status?: string;
}

export const createProgram = RequestHandlerCustom(
    async (req, res) => {
        const data: ICreateProgramData & { files?: any[] } = parseRequestData(req);

        // Handle file upload from parsed files array
        if (data.files && Array.isArray(data.files) && data.files.length > 0) {
            const imageFile = data.files.find(file => file.fieldname === 'image');

            if (imageFile) {
                const uploadResult = await uploadFiles(imageFile, 'programs');

                if (typeof uploadResult === 'object' && 'url' in uploadResult) {
                    data.imageUrl = uploadResult.url;
                }
            }
        }
        
        // Remove files from data before saving
        const { files, ...programData } = data;

        const program = await handleCreateProgram(programData as ICreateProgramData);

        res.status(201).json({
            success: true,
            message: "New program created",
            program: program
        });
    }
);

export const updateProgram = RequestHandlerCustom(
    async (req, res, next) => {
        const id = req.params.id;

        if (!id) {
            return next(new ErrorCustom(400, "Program ID is required"));
        }

        const data: IUpdateProgramData & { files?: any[] } = parseRequestData(req);

        if (Object.keys(data).length === 0) {
            return next(new ErrorCustom(400, "No data provided for update"));
        }

        if (data.files && Array.isArray(data.files) && data.files.length > 0) {
            const imageFile = data.files.find(file => file.fieldname === 'image');

            if (imageFile) {
                const uploadResult = await uploadFiles(imageFile, 'programs');

                if (typeof uploadResult === 'object' && 'url' in uploadResult) {
                    data.imageUrl = uploadResult.url;
                }
            }
        }
        
        const { files, ...programData } = data;

        const updatedProgram = await handleUpdateProgram({ id, ...programData });

        res.status(200).json({
            success: true,
            message: "Program updated successfully",
            program: updatedProgram
        });
    }
);

export const deleteProgram = RequestHandlerCustom(
    async (req, res, next) => {
        const id = req.params.id;

        if (!id) {
            return next(new ErrorCustom(400, "Program ID is required"));
        }

        await handleDeleteProgram({ id });

        res.status(200).json({
            success: true,
            message: "Program deleted successfully",
        });
    }
);