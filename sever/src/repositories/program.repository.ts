import { ICreateProgramData, IUpdateProgramData } from "../controllers/program.controller.js";
import { Program } from "../models/program.model.js";
import { ErrorCustom, HandlerCustom } from "../utils/configs/custom.js";

/**
 * LẤY DANH SÁCH CHƯƠNG TRÌNH (ĐÃ SỬA LỖI)
 */
export const handleGetPrograms = HandlerCustom(
    // 1. SỬA: Thêm 'country' vào kiểu dữ liệu
    async (data: { featured?: boolean; country?: string }) => {

        // 2. SỬA: Thêm 'country' vào kiểu của filter
        const filter: { featured?: boolean; country?: string } = {};

        // 3. Giữ logic 'featured'
        if (data.featured === true) {
            filter.featured = true;
        }

        // 4. SỬA: Thêm logic 'country'
        if (data.country) {
            filter.country = data.country;
        }

        // 5. Lệnh find(filter) bây giờ sẽ hoạt động chính xác
        const programs = await Program
            .find(filter) // Sẽ tìm theo { country: "...", featured: true } (nếu có)
            .sort({ createdAt: -1 })
            .exec();

        return programs;
    }
);

/**
 * LẤY 1 CHƯƠNG TRÌNH THEO ID
 */
export const handleGetProgramById = HandlerCustom(async (data: { id: string }) => {
    // Sửa nhỏ: findById chỉ cần truyền ID trực tiếp
    const program = await Program
        .findById(data.id)
        .exec();

    return program;
});

/**
 * TẠO CHƯƠNG TRÌNH MỚI
 */
export const handleCreateProgram = HandlerCustom(async (data: ICreateProgramData) => {
    const program = await new Program({
        title: data.title,
        description: data.description,
        country: data.country,
        duration: data.duration,
        tuition: data.tuition,
        requirements: data.requirements,
        benefits: data.benefits,
        imageUrl: data.imageUrl || "/images/placeholder-program.jpg", // Sử dụng ảnh mặc định nếu không có
        featured: data.featured,
        about: data.about,
        opportunities: data.opportunities,
        status: data.status,
    }).save();

    return program;
});

/**
 * CẬP NHẬT CHƯƠNG TRÌNH
 */
export const handleUpdateProgram = HandlerCustom(async (data: { id: string } & Partial<IUpdateProgramData>) => {
    const program = await Program.findById(data.id);

    if (!program) {
        throw new ErrorCustom(404, "Program not found");
    }

    // Cập nhật các trường được cung cấp
    if (data.title !== undefined) program.title = data.title;
    if (data.description !== undefined) program.description = data.description;
    if (data.country !== undefined) program.country = data.country;
    if (data.duration !== undefined) program.duration = data.duration;
    if (data.tuition !== undefined) program.tuition = data.tuition;
    if (data.imageUrl !== undefined) program.imageUrl = data.imageUrl;
    if (data.requirements !== undefined) program.requirements = data.requirements;
    if (data.benefits !== undefined) program.benefits = data.benefits;
    if (data.featured !== undefined) program.featured = data.featured;
    if (data.status !== undefined) program.status = data.status;

    const updatedProgram = await program.save();
    return updatedProgram;
});

/**
 * XÓA CHƯƠNG TRÌNH THEO ID
 */
export const handleDeleteProgram = HandlerCustom(async (data: { id: string }) => {
    const deleted = await Program.findByIdAndDelete(data.id).exec();

    if (!deleted) {
        throw new ErrorCustom(404, "Program not found");
    }

    return deleted;
});