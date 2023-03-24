import * as fs from "fs";

const cacheDir = `${__dirname}/../cache/`;

export const checkCacheDirectoryExistence = () => {
    if(fs.existsSync(cacheDir)){
       return;
    }
    fs.mkdirSync(cacheDir);
}

const getContentFromCache = (contentId: string) => {
        const contentPath = `${cacheDir}${contentId}.json`;
        if(!fs.existsSync(contentPath)){
            return;
        }
        const content = fs.readFileSync(contentPath, {
            encoding: "utf8"
        });
        return content;
}

const createFileContentCache = (contentId:string, data: string) => {
   fs.writeFileSync(`${cacheDir}${contentId}.json`, data, "utf8");
}

const removeFileContentCache = (contentId:string) => {
    const contentPath = `${cacheDir}${contentId}.json`;
    if(fs.existsSync(contentPath)){
        fs.unlinkSync(contentPath);
    }
}

export const CreateCacheDecorator = (target, name, descriptor) => {
    const original = descriptor.value;
    descriptor.value = async function(...args) {
      const postId = args[0];
      const content = getContentFromCache(postId);
      if(!content){
        const result = await original.apply(this, args);
        createFileContentCache(postId, JSON.stringify(result));
        return result;
      } else {
            return {...JSON.parse(content), cache:true};
      }
    };
};

export const RemoveCacheDecorator = (target, name, descriptor) => {
    const original = descriptor.value;
    descriptor.value = async function(...args) {
      const postId = args[0];
      removeFileContentCache(postId);
      const result = await original.apply(this, args);
      return result;
    };
};