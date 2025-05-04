"use client";

import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileIcon } from 'lucide-react';

interface MdxPreviewProps {
  content: string;
}

export default function MdxPreview({ content }: MdxPreviewProps) {
  if (!content) {
    return (
      <Card className="flex-1 border-dashed bg-muted/50">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center h-[400px] space-y-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <FileIcon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-muted-foreground">
              Your formatted MDX content will appear here
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Complete with frontmatter and proper markdown formatting
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex-1">
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] rounded-md">
          <pre className="font-mono text-sm p-4 leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}