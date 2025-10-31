import { ICreateBlogData } from "../controllers/blog.controller.js";
import { Blog } from "../models/blog.model.js";
import { HandlerCustom } from "../utils/configs/custom.js";

export const handleGetBlogs = HandlerCustom(async (data: { limit?: number }) => {
    const query = Blog.find();

    if (data.limit) {
        query.sort({ createdAt: -1 }).limit(data.limit);
    }

    const blogs = await query.exec();

    return blogs;
});

export const handleGetBlogsBySlug = HandlerCustom(async (data: { slug: string }) => {
    const blog = await Blog
        .findOne({ slug: data.slug })
        .exec();

    return blog;
});

export const handleGetBlogById = HandlerCustom(async (data: { id: string }) => {
    const blog = await Blog
        .findById({ _id: data.id })
        .exec();

    return blog;
});

export const handleCreateBlog = HandlerCustom(async (data: ICreateBlogData) => {
    const blog = await new Blog({
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        author: data.author,
        publishedAt: data.publishedAt,
        imageUrl: data.imageUrl,
        category: data.category,
        slug: data.slug,
    }).save();

    return blog;
});
