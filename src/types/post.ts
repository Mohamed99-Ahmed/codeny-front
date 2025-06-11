import { userType } from "./auth";

type postType = {
          psotType: string,
                postCategory: string,
                createdAt: string,
                updatedAt?:string,
                imageCover?: string,
                    _id: string,
                title: string,
                content: string,
                link: string,
                author : userType
}
export type { postType };