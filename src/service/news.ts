import { http } from "@/utils/http";

export const getNewsList = () => {
  return http<NewsVO[]>({
    method: "GET",
    url: "/iot/api/news/list"
  });
};
