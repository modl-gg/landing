import MarkdownPage from "@/components/MarkdownPage";
import dpaContent from "../content/modl_dpa.md?raw";

export default function DataProcessingAddendum() {
  return <MarkdownPage content={dpaContent} />;
}
