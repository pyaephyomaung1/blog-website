import { AppDataSource } from "../config/database";
import { Category } from "../models/Category";

export class CategoryService {
    private categoryRepository = AppDataSource.getRepository(Category);

    async getAllCategories():Promise<Category[]> {
        return await this.categoryRepository.find({
            order : { name : 'ASC' }
        })
    }

    async getCategoryByID(id :number): Promise<Category | null> {
        return await this.categoryRepository.findOne({
            where : {id} ,
            relations : ['articles']
        });
    }

    async createCategory(name:string):Promise<Category> {
        const category = this.categoryRepository.create({
            name
        });
        return await this.categoryRepository.save(category);
    }

    async updateCategoryByID(id:number, name:string):Promise<Category | null> {
        const category = await this.categoryRepository.findOne({
            where : { id }
        });

        if(!category){
            return null;
        }

        category.name = name;
        return await this.categoryRepository.save(category);
    }

    async deleteCategory(id:number):Promise<boolean> {
        const result = await this.categoryRepository.delete(id);
        return result.affected! > 1;
    }

    async categoryExist(name:string):Promise<boolean> {
        const category = await this.categoryRepository.findOne({
            where : {name},
        })
        return !!category;
    }
}