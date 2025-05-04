"use client";

import { useState } from 'react';
import { generateMdxContent } from '@/lib/mdx-utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RawContentInput from './RawContentInput';
import MdxPreview from './MdxPreview';
import Header from './Header';
import { Check, Copy, Wand2, Sparkles, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/toaster';

export default function MdxGenerator() {
  const [rawContent, setRawContent] = useState('');
  const [mdxContent, setMdxContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('input');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMdx = async () => {
    if (!rawContent.trim()) return;
    
    setIsGenerating(true);
    try {
      const generatedMdx = generateMdxContent(rawContent);
      setMdxContent(generatedMdx);
      setActiveTab('preview');
      toast.success('MDX content generated successfully!', {
        description: 'Your tech blog post is ready to use.',
      });
    } catch (error) {
      toast.error('Failed to generate MDX content', {
        description: 'Please try again with valid content.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyToClipboard = async () => {
    if (!mdxContent) return;
    
    try {
      await navigator.clipboard.writeText(mdxContent);
      setCopied(true);
      toast.success('Copied to clipboard!', {
        description: 'Your MDX content is ready to paste.',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy content');
      console.error('Failed to copy: ', err);
    }
  };

  const getCategory = () => {
    const match = mdxContent.match(/category: "([^"]+)"/);
    return match ? match[1] : null;
  };

  const getReadingTime = () => {
    const match = mdxContent.match(/readingTime: "([^"]+)"/);
    return match ? match[1] : null;
  };

  const getTags = () => {
    const match = mdxContent.match(/tags: (\[[^\]]+\])/);
    return match ? JSON.parse(match[1]) : [];
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 flex-1 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Content</h2>
                <p className="text-sm text-muted-foreground">Write or paste your tech blog content</p>
              </div>
              <Button 
                onClick={handleGenerateMdx} 
                className="gap-2" 
                disabled={!rawContent.trim() || isGenerating}
              >
                {isGenerating ? (
                  <Sparkles className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Generate MDX
              </Button>
            </div>
            <RawContentInput value={rawContent} onChange={setRawContent} />
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Preview</h2>
                <p className="text-sm text-muted-foreground">Generated MDX output</p>
              </div>
              <Button 
                onClick={handleCopyToClipboard} 
                variant={copied ? "outline" : "default"}
                className="gap-2"
                disabled={!mdxContent}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy MDX
                  </>
                )}
              </Button>
            </div>
            {mdxContent && (
              <div className="flex flex-wrap gap-2 mb-2">
                {getCategory() && (
                  <Badge variant="outline" className="text-primary gap-1">
                    <Tag className="h-3 w-3" />
                    {getCategory()}
                  </Badge>
                )}
                {getReadingTime() && (
                  <Badge variant="secondary" className="gap-1">
                    {getReadingTime()}
                  </Badge>
                )}
                {getTags().map((tag: string) => (
                  <Badge key={tag} variant="default" className="bg-accent text-accent-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <MdxPreview content={mdxContent} />
          </div>
        </div>

        <div className="lg:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="input">Content</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="input" className="pt-4">
              <RawContentInput value={rawContent} onChange={setRawContent} />
              <Button 
                onClick={handleGenerateMdx} 
                className="mt-4 w-full gap-2" 
                disabled={!rawContent.trim() || isGenerating}
              >
                {isGenerating ? (
                  <Sparkles className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                Generate MDX
              </Button>
            </TabsContent>
            <TabsContent value="preview" className="pt-4">
              {mdxContent && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {getCategory() && (
                    <Badge variant="outline" className="text-primary gap-1">
                      <Tag className="h-3 w-3" />
                      {getCategory()}
                    </Badge>
                  )}
                  {getReadingTime() && (
                    <Badge variant="secondary" className="gap-1">
                      {getReadingTime()}
                    </Badge>
                  )}
                  {getTags().map((tag: string) => (
                    <Badge key={tag} variant="default" className="bg-accent text-accent-foreground">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <MdxPreview content={mdxContent} />
              <Button 
                onClick={handleCopyToClipboard} 
                variant={copied ? "outline" : "default"}
                className="mt-4 w-full gap-2"
                disabled={!mdxContent}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy MDX
                  </>
                )}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Toaster />
    </div>
  );
}