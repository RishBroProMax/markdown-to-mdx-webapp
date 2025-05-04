import { FileText, Newspaper } from 'lucide-react';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <Newspaper className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Tech Blog Generator</h1>
            <p className="text-xs text-muted-foreground">AI-Powered MDX Generation</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <Badge variant="outline" className="font-normal">
              Tech News
            </Badge>
            <Badge variant="outline" className="font-normal">
              Reviews
            </Badge>
            <Badge variant="outline" className="font-normal">
              Opinions
            </Badge>
          </div>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}