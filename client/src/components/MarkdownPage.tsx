import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import ReactMarkdown from "react-markdown";
import { Button } from "modl-shared-web/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface MarkdownPageProps {
  filePath: string;
  title: string;
}

export default function MarkdownPage({ filePath, title }: MarkdownPageProps) {
  const [, navigate] = useLocation();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    const fetchMarkdown = async () => {
      try {
        const response = await fetch(filePath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${title}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, [filePath, title]);

  const backToHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <nav className="bg-background/90 backdrop-blur border-b border-gray-800 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <a href="#" onClick={(e) => { e.preventDefault(); backToHome(); }} className="flex items-center">
                <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
                <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
              </a>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground flex items-center" onClick={backToHome}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading {title}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        <nav className="bg-background/90 backdrop-blur border-b border-gray-800 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <a href="#" onClick={(e) => { e.preventDefault(); backToHome(); }} className="flex items-center">
                <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
                <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
              </a>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground flex items-center" onClick={backToHome}>
                <ArrowLeft className="mr-1 h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </div>
          </div>
        </nav>
        
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={backToHome}>Go Back Home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="bg-background/90 backdrop-blur border-b border-gray-800 p-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="#" onClick={(e) => { e.preventDefault(); backToHome(); }} className="flex items-center">
              <span className="text-2xl font-bold text-primary font-['Audiowide',cursive]">modl</span>
              <span className="ml-2 text-xs text-muted-foreground mt-1">BETA</span>
            </a>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground flex items-center" onClick={backToHome}>
              <ArrowLeft className="mr-1 h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </nav>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 text-foreground">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>,
              h4: ({ children }) => <h4 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h4>,
              p: ({ children }) => <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="mb-4 ml-6 space-y-2">{children}</ul>,
              ol: ({ children }) => <ol className="mb-4 ml-6 space-y-2 list-decimal">{children}</ol>,
              li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
              em: ({ children }) => <em className="italic text-foreground">{children}</em>,
              code: ({ children }) => <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-foreground">{children}</code>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                  {children}
                </blockquote>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
