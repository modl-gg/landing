import MarkdownPage from "@/components/MarkdownPage";
import termsOfServiceContent from "../content/modl_terms_of_service.md?raw";

export default function TermsOfService() {
  return <MarkdownPage content={termsOfServiceContent} />;
}
