import prisma from "../prisma";
import { v4 as uuidv4 } from "uuid";

export class ArticleService {


  async getAllArticles(page: number = 1, limit: number = 8) {
    const skip = (page - 1) * limit;

    const [articles, total] = await prisma.$transaction([
      prisma.article.findMany({
        skip: skip,
        take: limit,
        orderBy: {
          createdAt: "desc", // Order by creation date, newest first
        },
        include: {
          category: true, // Include the related category details
        },
      }),
      prisma.article.count(), // Get total count of articles
    ]);

    return {
      articles,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getArticleByID(id:string){
    return await prisma.article.findUnique({
        where : { id },
        include : {
            category: true
        },
    });
  }

  async createArticle( articleData : {
    title: string;
    meta_description : string;
    body : string;
    image?: string;
    categoryId : string;
  }){
    const categoryExist = await prisma.category.findUnique({
        where : { id : articleData.categoryId },
    })
    if (!categoryExist) {
        throw new Error("category not found")
    }
    return await prisma.article.create({
        data : {
            id : uuidv4(),
            title : articleData.title,
            meta_description : articleData.meta_description,
            body : articleData.body,
            image : articleData.image,
            categoryId : articleData.categoryId,
        }
    });
  }

  async updateArticle( id:string, articleData : {
    title?: string;
    meta_description?: string;
    body?: string;
    image?: string;
    categoryId?: string;
  }){
    if (articleData.categoryId) {
      const categoryExists = await prisma.category.findUnique({
        where: { id: articleData.categoryId },
      });
      if (!categoryExists) {
        throw new Error(`Category with ID "${articleData.categoryId}" not found.`);
      }
    }

    return await prisma.article.update({
      where: { id },
      data: articleData,
    });
  }

  async deleteArticle(id:string){
    return await prisma.article.delete({
        where : { id },
    });
  }
}
