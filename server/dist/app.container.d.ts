import type { Router } from "express";
export interface AppContainer {
    authRouter: Router;
    uploadRouter: Router;
    swaggerDocsRouter: Router;
    articleRouter: Router;
    articleCategoryRouter: Router;
}
export declare function bootstrapContainer(): AppContainer;
//# sourceMappingURL=app.container.d.ts.map