"use client";

import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface RawContentInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RawContentInput({ value, onChange }: RawContentInputProps) {
  return (
    <Card className="flex-1 relative group">
      <CardContent className="p-0">
        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Supported Content</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Markdown syntax</p>
                  <p>• Code blocks with language</p>
                  <p>• Tables and lists</p>
                  <p>• Mixed language content</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <Textarea
          placeholder="Start writing your tech blog post here... Use markdown syntax for formatting."
          className="min-h-[400px] border-0 resize-none rounded-md p-4 font-mono text-sm leading-relaxed h-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}