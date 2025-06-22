import { AppDataSource } from "../config/database";
import { Article } from "../models/Article";

export class ArticleService {
  private articleRepository = AppDataSource.getRepository(Article);

  async getAllArticles(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    articles: Article[];
    total: number;
    totalPages: number;
    currentPage: number;
  }> {
    const skip = (page - 1) * limit;

    const [articles, total] = await this.articleRepository.findAndCount({
      relations: ["category"],
      order: { createdAt: "DESC" },
      skip,
      take: limit,
    });

    return {
      articles,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }

  async getArticleByID(id:number):Promise<Article | null>{
    return await this.articleRepository.findOne({
        where : {id},
        relations : ['category']
    });
  }

  async getArticleBySlug(slug:string):Promise<Article | null> {
    return await this.articleRepository.findOne({
        where : {slug},
        relations : ['category']
    });
  }
}
