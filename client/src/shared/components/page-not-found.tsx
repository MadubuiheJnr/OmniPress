import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon, Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/shared/components/ui/empty";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center gap-2">
          <Button>
            <Link to="/feed">Explore Feed</Link>
          </Button>
          <Button variant="outline">
            <Plus /> <span>New Article</span>
          </Button>
        </EmptyContent>
        <Button variant="link" className="text-muted-foreground" size="sm">
          Learn More <ArrowUpRightIcon />
        </Button>
      </Empty>
    </div>
  );
}

export default PageNotFound;
