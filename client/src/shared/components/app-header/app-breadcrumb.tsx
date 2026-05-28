import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

export const AppBreadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split("/");
  let url = "/";

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {segments.map((segment, index) => {
            url += `${segment}`;

            return (
              <>
                <BreadcrumbItem key={url}>
                  <BreadcrumbLink
                    asChild
                    className="hover:text-muted-foreground/50"
                  >
                    <Link to={url}>{segment === "" ? "Feed" : segment}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < segments.length - 1 && <BreadcrumbSeparator />}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
