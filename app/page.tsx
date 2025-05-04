import { Metadata } from 'next';
import MdxGenerator from '@/components/mdx-generator/MdxGenerator';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'MDX Blog File Generator',
  description: 'Generate perfectly formatted MDX blog files from your raw content',
};

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <main className="min-h-screen bg-background">
        <MdxGenerator />
      </main>
    </ThemeProvider>
  );
}