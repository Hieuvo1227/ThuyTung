import { handleCreateBlog, handleGetBlogById, handleGetBlogs, handleGetBlogsBySlug } from "../repositories/blog.repository.js";
import { RequestHandlerCustom } from "../utils/configs/custom.js";
import { parseRequestData } from "../utils/configs/helper.js";

export const getAllBlogs = RequestHandlerCustom(
  async (req, res) => {
    const blogs = await handleGetBlogs({});

    res.status(200).json({
      message: "Get all blogs successfully",
      blogs: blogs
    });
  }
);

export const getBlogsBySlug = RequestHandlerCustom(
  async (req, res) => {
    const slug = (req.params.slug || req.query.slug) as string;

    const blog = await handleGetBlogsBySlug({ slug });

    res.status(200).json({
      message: "Get blog by slug successfully",
      blog: blog
    });
  }
);

export const getBlogsRecent = RequestHandlerCustom(
  async (req, res) => {
    const limit = req.query.limit;

    const blogs = await handleGetBlogs({ limit: Number(limit) });

    res.status(200).json({
      message: "Get blogs recent successfully",
      blogs: blogs
    });
  }
);

export const getBlog = RequestHandlerCustom(
  async (req, res) => {
    const id = (req.params.id || req.query.id) as string;

    const blog = await handleGetBlogById({ id });

    res.status(200).json({
      message: "Get blog successfully",
      blog: blog
    });
  }
);

export interface ICreateBlogData {
  title: string,
  excerpt: string,
  content: string,
  author: string,
  publishedAt: string,
  imageUrl: string,
  category: string,
  slug: string,
};

export const createBlog = RequestHandlerCustom(
  async (req, res) => {
    const data: ICreateBlogData = parseRequestData(req);

    const blog = await handleCreateBlog(data);

    res.status(201).json({
      message: "New blog created",
      blog: blog
    });
  }
);