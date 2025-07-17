import { Card, CardContent } from "modl-shared-web/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-auto max-w-md mx-4 bg-white/10">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-white">404 Page Not Found</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
