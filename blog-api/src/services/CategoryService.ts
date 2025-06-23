import prisma from "../prisma";
import { v4 as uuidv4 } from "uuid";

export class CategoryService {
  async getCategories() {
    return await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async getCategoryByID(id: string) {
    return await prisma.category.findUnique({
      where: { id },
      include: {
        articles: true,
      },
    });
  }

  async createCategory(name: string) {
    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });
    if (existingCategory) {
      throw new Error(`Category with ${name} already exists`);
    }

    return await prisma.category.create({
      data: {
        id: uuidv4(),
        name,
      },
    });
  }

  async updateCategory(id: string, name: string) {
    const existingCategoryWithName = await prisma.category.findUnique({
      where: { name },
    });
    if (existingCategoryWithName && existingCategoryWithName.id !== id) {
      throw new Error(`Category with name "${name}" already exists.`);
    }
    return await prisma.category.update({
        where : { id }, 
        data : {
            name
        },
    })
  }

  async deleteCategory(id: string){
    const categoryWithArticles = await prisma.category.findUnique({
        where : { id },
        include : {
            articles : true
        },
    });
    if (categoryWithArticles && categoryWithArticles.articles.length > 0){
        throw new Error('Cannot delete category with associated articles. Please delete articles first.')
    }
    return await prisma.category.delete({
        where : { id },
    });
  }
}

